import MainNav from '@/components/navigation/MainNav.vue';

import { mount } from '@vue/test-utils';
import { render, screen } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import type { Mock } from 'vitest';
import { RouterLinkStub } from '@vue/test-utils';
vi.mock('vue-router');
const useRouteMock = useRoute as Mock;

describe('MainNav', () => {
  const renderMainNAv = () => {
    useRouteMock.mockReturnValue({ path: '/find' });
    render(MainNav, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    });
  };

  it('renders icon when width < md', () => {
    renderMainNAv();
    const hamXicon = screen.queryByRole('button', { name: 'hamXicon' }) as HTMLButtonElement;
    expect(hamXicon).toBeVisible();
  });

  it('hidden icon when width > md', () => {
    renderMainNAv();
    const hamXicon = screen.queryByRole('button', { name: 'hamXicon' }) as HTMLButtonElement;
    // due to inability to resize window, only presence of the class is checked
    expect(hamXicon).toHaveClass('md:hidden');
  });

  it('display each menu item in nav', () => {
    renderMainNAv();
    const menuItemsInNav = screen.queryAllByRole('listitem');
    const menuItemsInNavText = menuItemsInNav.map((item) => item.textContent);
    expect(menuItemsInNavText).toEqual(['Home', 'Find Your Love', 'Blog']);
  });

  describe('function inOutNav', () => {
    it('returns correct class as default', () => {
      renderMainNAv();
      const ul = screen.queryByRole('list');
      expect(ul).toHaveClass('-top-48');
    });
    it('returns correct class after user click', async () => {
      renderMainNAv();
      const hamXicon = screen.queryByRole('button', { name: 'hamXicon' }) as HTMLButtonElement;
      const userStore = useUserStore();
      userStore.showNav = true;
      const ul = await screen.findByRole('list');
      expect(ul).toHaveClass('top-16');
    });
  });

  describe('function inOutIcon', () => {
    it('return correct icon as default', () => {
      const userStore = useUserStore();
      userStore.showNav = false;
      // procedure similiar to the one used for testing function inOutNav was
      // impossible to be repeated here due to
      // "Could not display diff. It's possible objects are too large to compare.
      // Try increasing --outputDiffMaxSize option."
      // Perhaps stubing font-awesome-icon caused the message(?error?)
      // That's why computed value is used
      const wrapper = mount(MainNav);
      expect(wrapper.vm.inOutIcon).toEqual(['fas', 'bars']);
    });

    it('return correct icon after user click', () => {
      const userStore = useUserStore();
      userStore.showNav = true;
      const wrapper = mount(MainNav);
      expect(wrapper.vm.inOutIcon).toEqual(['fas', 'xmark']);
    });
  });
});
