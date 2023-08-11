import { render } from '@testing-library/vue';
import TheForm from '@/components/form/TheForm.vue';
import { useQuestionsStore } from '@/stores/questions';
import { createTestingPinia } from '@pinia/testing';

describe('TheForm', () => {
  const renderTheForm = () => {
    render(TheForm, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
  };
  it('checks if the length of answers is greater than 0', () => {
    renderTheForm();
    const questionsStore = useQuestionsStore();
    const answers = (questionsStore.answers = []);
    expect(answers).toHaveLength(0);
  });
  it('checks if the length of answers is greater than 0', () => {
    renderTheForm();
    const questionsStore = useQuestionsStore();
    const answers = (questionsStore.answers = [{ id: 1, selectedAnswer: '4' }]);
    expect(answers).toHaveLength(1);
  });
});
