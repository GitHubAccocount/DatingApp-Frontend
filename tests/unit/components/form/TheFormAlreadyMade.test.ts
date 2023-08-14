import { render, screen } from '@testing-library/vue';
import TheFormAlreadyMade from '@/components/form/TheFormAlreadyMade.vue';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import type { Mock } from 'vitest';
vi.mock('axios');
const axiosPostMock = axios.post as Mock;
const assignMock = vi.fn();

describe('TheFormAlreadyMade', () => {
  beforeEach(() => {
    axiosPostMock.mockResolvedValue({});
  });
  it('displays h1 text', () => {
    render(TheFormAlreadyMade);
    const h1Text = screen.queryByText('It seems that the test has already been done');
    expect(h1Text).toBeInTheDocument();
  });

  it('displays button', () => {
    render(TheFormAlreadyMade);
    const button = screen.queryByRole('button', { name: /i want to repeat the test/i });
    expect(button).toBeInTheDocument();
  });

  it('clears data on server', async () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() }
    });
    render(TheFormAlreadyMade);
    const button = screen.queryByRole('button', {
      name: /i want to repeat the test/i
    }) as HTMLButtonElement;
    await userEvent.click(button);
    // window.location = { assign: assignMock as any } as Location;
    expect(axios.post).toHaveBeenCalledWith('http://myfakeapi.com/answers', {});
    expect(axios.post).toHaveBeenCalledWith('http://myfakeapi.com/personalInfo', {});
    expect(window.location.reload).toHaveBeenCalled();
    Object.defineProperty(window, 'location', { configurable: true, value: window.location });
  });
});
