import { render, screen } from '@testing-library/vue';
import TheHero from '@/components/loveSearch/TheHero.vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('TheHero', () => {
  const renderTheHero = () => {
    render(TheHero, {
      global: {
        stubs: {
          'router-link': RouterLinkStub,
          FontAwesomeIcon: true
        }
      }
    });
  };

  it('displays header text', () => {
    renderTheHero();
    const h1Text = screen.queryByRole('heading', { name: /want to find your other half?/i });
    expect(h1Text).toBeInTheDocument();
  });

  it('displays header text', () => {
    renderTheHero();
    const h3Text = screen.queryByRole('heading', {
      name: /fill the form and find the person just like you!/i
    });
    expect(h3Text).toBeInTheDocument();
  });

  it('displays button', () => {
    renderTheHero();
    const button = screen.queryByRole('button', {
      name: /go to the form/i
    });
    expect(button).toBeInTheDocument();
  });
});
