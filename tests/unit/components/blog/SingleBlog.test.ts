import { render, screen } from '@testing-library/vue';
import SingleBlog from '@/components/blog/SingleBlog.vue';
import { useBlogStore } from '@/stores/blog';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type { Mock } from 'vitest';

import { useRoute } from 'vue-router';
vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

describe('SingleBlog', () => {
  const renderSingleBlog = () => {
    render(SingleBlog, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });

    useRouteMock.mockReturnValue({ params: { id: 1 } });
  };

  it('calls FETCH_BLOGS when mounted', () => {
    renderSingleBlog();

    const blogStore = useBlogStore();
    expect(blogStore.FETCH_BLOGS).toHaveBeenCalled();
  });

  it('renders blog when blog exists', async () => {
    renderSingleBlog();

    const blogStore = useBlogStore();
    blogStore.blogs = [
      {
        id: 1,
        title: 'ExampleTitle',
        date: 'Example',
        img: 'Example',
        subtitle1: 'Example',
        content1: 'Example',
        subtitle2: 'Example',
        content2: 'Example',
        subtitle3: 'Example',
        content3: 'Example',
        content4: 'Example',
        subtitle5: 'Example',
        content5: 'Example',
        subtitle6: 'Example',
        content6: 'Example',
        subtitle7: 'Example',
        content7: 'Example'
      }
    ];

    const title = await screen.findByText('ExampleTitle');
    expect(title).toBeInTheDocument();
  });

  it('doesnt render blog', async () => {
    renderSingleBlog();

    const blogStore = useBlogStore();
    blogStore.blogs = [
      {
        id: 2,
        title: 'ExampleTitle',
        date: 'Example',
        img: 'Example',
        subtitle1: 'Example',
        content1: 'Example',
        subtitle2: 'Example',
        content2: 'Example',
        subtitle3: 'Example',
        content3: 'Example',
        content4: 'Example',
        subtitle5: 'Example',
        content5: 'Example',
        subtitle6: 'Example',
        content6: 'Example',
        subtitle7: 'Example',
        content7: 'Example'
      }
    ];

    const title = await screen.findByText("Sorry. This page doesn't exists.");
    expect(title).toBeInTheDocument();
  });
});
