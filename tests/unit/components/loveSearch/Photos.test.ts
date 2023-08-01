import { render, screen } from '@testing-library/vue';

import Photos from '@/components/loveSearch/Photos.vue';
import { nextTick } from 'vue';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('Photos', () => {
  it('checks initial img src', () => {
    render(Photos);
    const photo = screen.getByAltText('Couple photos');
    const photoSrc = photo.getAttribute('src');
    expect(photoSrc).toContain('assets/couple1v2.jpeg');
  });

  it('executes every 5s', async () => {
    render(Photos);

    vi.advanceTimersToNextTimer();
    await nextTick();

    const photo = screen.getByAltText('Couple photos');
    const photoSrc = photo.getAttribute('src');
    expect(photoSrc).toContain('assets/couple2v2.jpeg');
  });

  it('removes interval when component is closed', () => {});
  const { unmount } = render(Photos);
  const clearInterval = vi.fn();
  vi.stubGlobal('clearInterval', clearInterval);
  unmount();
  expect(clearInterval).toHaveBeenCalled();
  vi.unstubAllGlobals();
});
