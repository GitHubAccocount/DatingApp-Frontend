import { render, screen } from '@testing-library/vue';
import TheFormPersonalInfo from '@/components/form/TheFormPersonalInfo.vue';
import { useQuestionsStore } from '@/stores/questions';
import { createTestingPinia } from '@pinia/testing';

vi.mock('vue-router');

describe('TheFormPersonalInfo', () => {
  const renderTheFormPersonalInfo = () => {
    render(TheFormPersonalInfo, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };
  it('renders the form already made when answers is empty object or personalInfo.length > 0', () => {
    renderTheFormPersonalInfo();
    const questionsStore = useQuestionsStore();
    //@ts-ignore
    const answers = (questionsStore.answers = {});
    const personalInfo = (questionsStore.personalInfo = [{ gender: 'F' }]);

    const h1Text = screen.queryByText("You can't access this page.");
    expect(h1Text).toBeInTheDocument();
  });

  it('renders the form personal test', async () => {
    renderTheFormPersonalInfo();
    const questionsStore = useQuestionsStore();
    const answers = (questionsStore.answers = [{ id: 1, selectedAnswer: '4' }]);

    const h1Text = await screen.findByText('Additional Information');
    expect(h1Text).toBeInTheDocument();
  });
});
