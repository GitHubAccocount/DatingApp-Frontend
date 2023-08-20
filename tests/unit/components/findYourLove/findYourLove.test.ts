import { render, screen } from '@testing-library/vue';
import findYourLove from '@/components/findYourLove/findYourLove.vue';
import { createTestingPinia } from '@pinia/testing';
import { useQuestionsStore } from '@/stores/questions';
import { nextTick } from 'vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('findYourLove', () => {
  const renderFindYourLove = () => {
    render(findYourLove, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
  };

  it('renders find-your-love-after-form', async () => {
    renderFindYourLove();
    const questionsStore = useQuestionsStore();
    questionsStore.personalInfo = [{ gender: 'a' }];
    questionsStore.answers = [{ id: 1, selectedAnswer: '4' }];

    await nextTick();

    expect(screen.queryByTestId('find-your-love-after-form')).toBeInTheDocument();
    expect(screen.queryByTestId('find-your-love-before-form')).not.toBeInTheDocument();
  });

  it('renders find-your-love-before-form', async () => {
    renderFindYourLove();
    const questionsStore = useQuestionsStore();
    questionsStore.personalInfo = [];
    questionsStore.answers = [];

    await nextTick();

    expect(screen.queryByTestId('find-your-love-after-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('find-your-love-before-form')).toBeInTheDocument();
  });
});
