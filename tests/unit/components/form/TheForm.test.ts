import { render } from '@testing-library/vue';
import TheForm from '@/components/form/TheForm.vue';
import { useQuestionsStore } from '@/stores/questions';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';

vi.mock('vue-router');

describe('TheForm', () => {
  const renderTheForm = () => {
    render(TheForm, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };
  it('checks if the length of answers is 0', () => {
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
