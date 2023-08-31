import { render, screen } from '@testing-library/vue';

import collapsibleAccordion from '@/components/findYourLove/findYourLoveFilter/collapsibleAccordion.vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

describe('collapsibleAccordion', () => {
  const renderCollapsibleAccordion = () => {
    render(collapsibleAccordion, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };
  it('displays checkbox when button in clicked', async () => {
    renderCollapsibleAccordion();

    const button = screen.queryByRole('button') as HTMLButtonElement;
    await userEvent.click(button);

    const checkbox = await screen.findAllByRole('checkbox');
    expect(checkbox).toHaveLength(5);
  });

  it('closes accordion on outside click', async () => {
    renderCollapsibleAccordion();

    const button = screen.queryByRole('button') as HTMLButtonElement;
    await userEvent.click(button);

    const checkbox = await screen.findAllByRole('checkbox');
    expect(checkbox).toHaveLength(5);

    const outsideElemnt = document.createElement('div');
    await userEvent.click(outsideElemnt);

    const checkboxEmpty = await screen.findAllByRole('checkbox');
    expect(checkboxEmpty).not.toHaveLength(0);
  });
});
