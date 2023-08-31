import { render, screen } from '@testing-library/vue';

import checkboxes from '@/components/findYourLove/findYourLoveFilter/checkboxes.vue';
import { useUserStore } from '@/stores/user';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

describe('checkboxes', () => {
  const renderCheckboxes = () => {
    render(checkboxes, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
  };

  it('collect data when user choose checkbox', async () => {
    renderCheckboxes();

    const userStore = useUserStore();

    const input1825 = screen.queryByRole('checkbox', { name: /45-55/i }) as HTMLInputElement;
    await userEvent.click(input1825);

    expect(userStore.SELECT_AGE).toHaveBeenCalled();
  });

  it('calls CLEAR_SELECTION', () => {
    const { unmount } = render(checkboxes, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
    const userStore = useUserStore();

    unmount();

    expect(userStore.CLEAR_SELECTION).toHaveBeenCalled();
  });
});
