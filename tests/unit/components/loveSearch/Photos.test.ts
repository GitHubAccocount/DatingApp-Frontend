import { render, screen } from '@testing-library/vue';

import Photos from '@/components/loveSearch/Photos.vue';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';

describe('Photos', () => {
  it('checks initial img src', () => {
    const wrapper = mount(Photos);

    const vm = wrapper.vm as any;

    const photo = wrapper.find('img');

    vm.isLoaded = true;

    photo.trigger('load');

    const photoSrc = photo.attributes('src');
    console.log(photoSrc);
    expect(photoSrc).toEqual('assets/couple1v2.jpeg');
  });

  it('executes every 5s', async () => {
    vi.useFakeTimers();
    render(Photos);

    vi.advanceTimersToNextTimer();
    await nextTick();

    const photo = screen.getByAltText('Couple photos');
    const photoSrc = photo.getAttribute('src');
    expect(photoSrc).toContain('assets/couple2v2.jpeg');
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });
});
