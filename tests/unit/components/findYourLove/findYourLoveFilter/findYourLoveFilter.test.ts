import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';

import { useUserStore } from '@/stores/user';
import findYourLoveFilter from '@/components/findYourLove/findYourLoveFilter/findYourLoveFilter.vue';
import userEvent from '@testing-library/user-event';

describe('findYourLoveFilter', () => {
  const renderFindYourLoveFilter = () => {
    render(findYourLoveFilter, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };

  it('renders filter button', () => {
    renderFindYourLoveFilter();

    const button = screen.queryByRole('button', { name: /filter/i }) as HTMLButtonElement;
    expect(button).toBeInTheDocument();
  });

  it('invokes SHOW_FILTER function after clicking the button', async () => {
    renderFindYourLoveFilter();

    const button = screen.queryByRole('button', { name: /filter/i }) as HTMLButtonElement;

    const userStore = useUserStore();

    await userEvent.click(button);
    expect(userStore.SHOW_FILTER).toHaveBeenCalled();
  });
});
