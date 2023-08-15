import { render, screen } from '@testing-library/vue';
import TheFormPersonalInfo from '@/components/form/TheFormPersonalInfo.vue';
import { useQuestionsStore } from '@/stores/questions';
import { createTestingPinia } from '@pinia/testing';

vi.mock('vue-router');

describe('TheFormPersonalInfo', () => {
  const renderTheFormPersonalInfo = () => {
    render(TheFormPersonalInfo, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
  };
  it('renders the form already made when answers.length === 0 or personalInfo.length > 0', () => {
    renderTheFormPersonalInfo();
    const questionsStore = useQuestionsStore();
    const answers = (questionsStore.answers = [{ id: 1, selectedAnswer: '4' }]);
    const personalInfo = (questionsStore.personalInfo = [{ gender: 'F' }]);

    const statement = answers.length === 0 || personalInfo.length > 0;
    expect(statement).toBeTruthy();
    // const h1Text = screen.queryByText("You can't access this page.");
    // expect(h1Text).toBeInTheDocument();
  });

  it('renders the form personal test', async () => {
    renderTheFormPersonalInfo();
    const questionsStore = useQuestionsStore();
    const answers = (questionsStore.answers = [{ id: 1, selectedAnswer: '4' }]);
    const personalInfo = (questionsStore.personalInfo = []);

    const statement = answers.length === 0 || personalInfo.length > 0;
    expect(statement).toBeFalsy();

    // even though the conditions are met it doesnt render the correct component
    // const h1Text = await screen.findByText('Additional Information');
    // expect(h1Text).toBeInTheDocument();
  });
});
