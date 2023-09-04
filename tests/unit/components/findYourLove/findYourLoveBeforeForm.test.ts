import { render, screen } from '@testing-library/vue';
import findYourLoveBeforeForm from '@/components/findYourLove/findYourLoveBeforeForm.vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('findYourLoveBeforeForm', () => {
  it('renders button which redirect to /form', () => {
    render(findYourLoveBeforeForm, {
      global: {
        stubs: {
          'router-link': RouterLinkStub,
          FontAwesomeIcon: true
        }
      }
    });

    const button = screen.queryByRole('button', { name: /go to the form/i }) as HTMLButtonElement;
    expect(button).toBeInTheDocument();
  });
});
