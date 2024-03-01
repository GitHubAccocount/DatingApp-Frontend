import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

// axios.interceptors.response.use(
//   (response) => {
//     // Check for and extract the CSRF token from the response, if present.
//     const newCsrfToken = response.data.newCsrfToken;
//     if (newCsrfToken) {
//       axios.defaults.headers.common['X-XSRF-TOKEN'] = newCsrfToken;
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.request.status === 403) {
      // redirect to a 403 page informing
      // the action is forbidden
      // router.push('/403');
    }

    if (error.request.status === 401 && !!localStorage.getItem('auth')) {
      localStorage.removeItem('auth');
    }
    return Promise.reject(error);
  }
);

// As I understand the below code should not be needed, becasue the work should be done
// by "axios.defaults.withCredentials = true;", but for some reason it doesn't work.
// Well, when I set up this app it was working at the beginning but when I came back
// the next day it stopped working. Why? Maybe God knows, beccasue I have no idea.
// I found the below piece of code on the internet which is responsible for manually
// including X-XSRF-TOKEN header after getting it from Request Cookies. It seems to
// do the job.

// Step 1: Get the 'XSRF-TOKEN' value from the cookies
function getCsrfToken() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'XSRF-TOKEN') {
      return decodeURIComponent(value);
    }
  }
  return null; // 'XSRF-TOKEN' cookie not found
}

// Step 2: Set the 'X-XSRF-TOKEN' header in Axios with the retrieved value
const csrfToken = getCsrfToken();

if (csrfToken) {
  axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
} else {
  console.error('XSRF-TOKEN cookie not found.');
  window.location.reload();
}
