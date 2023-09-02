import { render, screen } from '@testing-library/vue';
import type { Mock } from 'vitest';
import { useQuestionsStore } from '@/stores/questions';
import { createTestingPinia } from '@pinia/testing';
import singleUser from '@/components/findYourLove/singleUser/singleUser.vue';
import { sampleUsers } from 'tests/utils/sampleUsers';

import { useRoute } from 'vue-router';
vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

describe('singleUser', () => {
  const renderSingleUser = (id: string) => {
    const pinia = createTestingPinia();

    useRouteMock.mockReturnValue({
      params: {
        id: id
      }
    });

    const questionStore = useQuestionsStore();
    // @ts-expect-error: recommended solution from pinia.vujejs.org
    questionStore.FILTERED_USERS = sampleUsers;

    render(singleUser, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };
  it('doesnt render user when params.id and user.id are not the same', () => {
    renderSingleUser('9');

    const text = screen.queryByText("Sorry. This page doesn't exist.") as HTMLElement;
    expect(text).toBeInTheDocument();
  });

  it('renders user when params.id and user.id are the same', () => {
    renderSingleUser('2');

    const photo = screen.queryByAltText('user photo') as HTMLElement;
    console.log(photo);
    expect(photo).toBeInTheDocument();
  });
});
