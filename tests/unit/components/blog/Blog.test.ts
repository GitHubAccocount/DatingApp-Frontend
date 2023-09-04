import { findByText, render, screen } from '@testing-library/vue';
import Blog from '@/components/blog/Blog.vue';
import { useUserStore } from '@/stores/user';
import { createTestingPinia } from '@pinia/testing';
import { RouterLinkStub } from '@vue/test-utils';
import { useBlogStore } from '@/stores/blog';

describe('Blog', () => {
  const renderBlog = () => {
    render(Blog, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          FontAwesomeIcon: true,
          'router-link': RouterLinkStub
        }
      }
    });
  };

  it('calls FETCH_BLOGS on mounted', () => {
    renderBlog();
    const blogStore = useBlogStore();
    expect(blogStore.FETCH_BLOGS).toHaveBeenCalled();
  });

  it('renders blog', async () => {
    renderBlog();
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

    const text = await screen.findByText('ExampleTitle');
    expect(text).toBeInTheDocument();
  });
});
