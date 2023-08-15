import { render, screen } from '@testing-library/vue';
import TheFormPersonalAlreadyMade from '@/components/form/TheFormPersonalAlreadyMade.vue';
import type { Mock } from 'vitest';

import { useRouter } from 'vue-router';
import userEvent from '@testing-library/user-event';
vi.mock('vue-router');
const useRouterMock = useRouter as Mock;

describe('TheFormPersonalAlreadyMade', () => {
  it('displayes h1 text', () => {
    render(TheFormPersonalAlreadyMade);
    const h1Text = screen.queryByText("You can't access this page.");
    expect(h1Text).toBeInTheDocument();
  });

  it('redirect user to /form page', async () => {
    const push = vi.fn();
    useRouterMock.mockReturnValue({ push });
    render(TheFormPersonalAlreadyMade);

    const button = screen.queryByRole('button', { name: /redirect me/i }) as HTMLButtonElement;
    await userEvent.click(button);

    expect(push).toHaveBeenCalledWith({ path: '/form' });
  });
});
