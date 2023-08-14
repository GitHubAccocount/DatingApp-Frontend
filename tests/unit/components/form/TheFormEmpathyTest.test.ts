import { fireEvent, queryByRole, render, screen } from '@testing-library/vue';
import TheFormEmpathyTest from '@/components/form/TheFormEmpathyTest.vue';
import { createTestingPinia } from '@pinia/testing';
import { expect, type Mock } from 'vitest';
import { useQuestionsStore } from '@/stores/questions';
import userEvent from '@testing-library/user-event';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import { useRouter } from 'vue-router';

vi.mock('axios');
const axiosPostMock = axios.post as Mock;

vi.mock('vue-router');
const useRouterMock = useRouter as Mock;

describe('TheFormEmpathyTest', () => {
  beforeEach(() => {
    axiosPostMock.mockResolvedValue([]);
  });
  const renderTheFormEmpathyTest = () => {
    const push = vi.fn();
    useRouterMock.mockReturnValue({ push });
    render(TheFormEmpathyTest, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    return { push };
  };

  it('renders questions', async () => {
    renderTheFormEmpathyTest();
    const questionStore = useQuestionsStore();
    questionStore.questions = [{ id: 1, text: 'Sample question' }];
    const liQuestion = await screen.findAllByRole('labelname');
    const liQuestionText = liQuestion.map((item) => item.textContent);
    expect(liQuestionText).toEqual(['1. Sample question']);
  });

  it('renders options to select from', async () => {
    renderTheFormEmpathyTest();
    const questionStore = useQuestionsStore();
    questionStore.questions = [{ id: 1, text: 'Sample question' }];
    const liQuestion = await screen.findAllByRole('combobox');
    const liQuestionText = liQuestion.map((item) => item.textContent);
    expect(liQuestionText).toEqual(['select answer-4-3-2-101234']);
  });

  it('renders submit button', () => {
    renderTheFormEmpathyTest();
    const button = screen.queryByRole('button', { name: /submit/i }) as HTMLButtonElement;
    expect(button).toBeInTheDocument();
  });

  // doesnt work becouse of 'TypeError: Cannot read properties of null (reading 'value')'
  // it('invokes formData', async () => {
  //   // renderTheFormEmpathyTest();
  //   const wrapper = shallowMount(TheFormEmpathyTest, {
  //     global: {
  //       plugins: [
  //         createTestingPinia({
  //           createSpy: vi.fn,
  //           initialState: {
  //             questions: {
  //               questions: [{ id: 1, text: 'Sample question' }]
  //             }
  //           }
  //         })
  //       ]
  //     }
  //   });
  //   const store = useQuestionsStore();
  //   wrapper.vm.$nextTick();
  //   await wrapper.find('select').trigger('change');

  //   expect(wrapper.vm.formData).toHaveBeenCalled();
  // });

  // it('renders options to select from', async () => {
  //   const { emitted } = render(TheFormEmpathyTest, {
  //     global: {
  //       plugins: [createTestingPinia()]
  //     }
  //   });
  //   const questionStore = useQuestionsStore();
  //   questionStore.questions = [{ id: 1, text: 'Sample question' }];
  //   const liQuestion = await screen.findAllByRole('combobox');
  //   // fireEvent.change(liQuestion[0], { target: { value: 4 } });
  //   console.log(emitted());
  //   // expect(emitted().formData).toHaveBeenCalled();
  //   expect(emitted()).toHaveProperty('Submit');
  // });

  // it('submits form', async () => {
  //   renderTheFormEmpathyTest();
  //   const questionStore = useQuestionsStore();
  //   questionStore.questions = [{ id: 1, text: 'Sample question' }];
  //   const button = screen.queryByRole('button', {name: /submit/i}) as HTMLButtonElement;
  //   userEvent.click(button);

  // });

  it('submits the form', async () => {
    global.alert = vi.fn();
    const { push } = renderTheFormEmpathyTest();
    const button = screen.queryByRole('button', { name: /submit/i }) as HTMLButtonElement;
    await userEvent.click(button);
    expect(axios.post).toHaveBeenCalledWith('http://myfakeapi.com/answers', []);
    expect(push).toHaveBeenCalledWith({ path: 'form/2' });
  });
});
