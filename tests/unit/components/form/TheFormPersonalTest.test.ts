import { fireEvent, render, screen } from '@testing-library/vue';
import TheFormPersonalTest from '@/components/form/TheFormPersonalTest.vue';
import type { Mock } from 'vitest';
import { useRouter } from 'vue-router';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('vue-router');
const useRouterMock = useRouter as Mock;

vi.mock('axios');
const mockAxiosPost = axios.post as Mock;

describe('TheFormPersonalTest', () => {
  beforeEach(() => {
    mockAxiosPost.mockResolvedValue([]);
  });
  const renderTheFormPersonalTest = () => {
    const push = vi.fn();
    useRouterMock.mockReturnValue({ push });
    render(TheFormPersonalTest, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });

    return { push };
  };

  it('displays h1 text', () => {
    renderTheFormPersonalTest();
    const h1Text = screen.queryByText('Additional Information');
    expect(h1Text).toBeInTheDocument();
  });

  it('displays gener input', () => {
    renderTheFormPersonalTest();
    const inputTitle = screen.queryByText('Choose your gender:');
    expect(inputTitle).toBeInTheDocument();
  });

  it('triggers empathy level input', () => {
    renderTheFormPersonalTest();
    const inputTitle = screen.queryByRole('radio', {
      name: 'High level of empathy'
    }) as HTMLLabelElement;
    fireEvent.click(inputTitle);
    expect(inputTitle).toBeChecked();
  });

  it('submits the form and redirect user to /find page', async () => {
    global.alert = vi.fn();
    const { push } = renderTheFormPersonalTest();

    const inputTitle1 = screen.queryByTestId('firstMale') as HTMLLabelElement;
    await fireEvent.click(inputTitle1);

    const inputTitle2 = screen.queryByTestId('secondFemale') as HTMLLabelElement;
    await fireEvent.click(inputTitle2);

    const inputTitle3 = screen.queryByRole('radio', {
      name: 'High level of empathy'
    }) as HTMLLabelElement;
    await fireEvent.click(inputTitle3);

    const inputTitle4 = screen.queryByTestId('textarea') as HTMLTextAreaElement;
    await userEvent.type(inputTitle4, 'A');

    const button = screen.queryByRole('button', { name: /submit/i }) as HTMLButtonElement;
    await fireEvent.click(button);
    expect(axios.post).toHaveBeenCalledWith('http://myfakeapi.com/personalInfo', [
      { gender: 'male' },
      { empathyLevel: 'high' },
      { lookingFor: 'female' },
      { description: 'A' }
    ]);
    expect(push).toHaveBeenCalledWith({ path: '/find' });
  });
});
