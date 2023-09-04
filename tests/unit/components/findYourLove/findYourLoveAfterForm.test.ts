import { fireEvent, render, screen } from '@testing-library/vue';
import findYourLoveAfterForm from '@/components/findYourLove/findYourLoveAfterForm.vue';

import { useQuestionsStore } from '@/stores/questions';
import { createTestingPinia } from '@pinia/testing';
import { RouterLinkStub } from '@vue/test-utils';
import { sampleUsers } from 'tests/utils/sampleUsers';

describe('findYourLoveAfterForm', () => {
  const renderFindYourLoveAfterForm = () => {
    render(findYourLoveAfterForm, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'router-link': RouterLinkStub,
          FontAwesomeIcon: true
        }
      }
    });
  };

  it('renders users', async () => {
    renderFindYourLoveAfterForm();

    const questionsStore = useQuestionsStore();
    questionsStore.answers = [
      { id: 1, selectedAnswer: '4' },
      { id: 2, selectedAnswer: '-3' }
    ];
    questionsStore.personalInfo = [
      { gender: 'female', empathyLevel: 'low', lookingFor: 'female', description: 'aa' }
    ];
    questionsStore.users = sampleUsers;

    const routerLink = (await screen.findByAltText('user photo')) as HTMLElement;
    expect(routerLink).toBeInTheDocument();
  });

  it('renders only 10 users', async () => {
    renderFindYourLoveAfterForm();

    const questionsStore = useQuestionsStore();
    questionsStore.answers = [
      { id: 1, selectedAnswer: '4' },
      { id: 2, selectedAnswer: '-3' }
    ];
    questionsStore.personalInfo = [
      { gender: 'female', empathyLevel: 'low', lookingFor: 'female', description: 'aa' }
    ];

    const renderUsers = () => {
      let users = [];
      for (let i = 1; i <= 13; i++) {
        users.push({
          id: i,
          firstName: `Jacklyn${i}`,
          lastName: 'Lemke',
          age: 100,
          profileImg:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png',
          ownedEmphatyLevel: 'low',
          gender: 'female',
          lookingFor: 'female',
          empathyLevel: 'low',
          description: 'H'
        });
      }
      return users;
    };
    questionsStore.users = renderUsers();

    const names10 = (await screen.findAllByAltText('user photo')) as HTMLElement[];
    expect(names10).toHaveLength(10);
    expect(names10).not.toHaveLength(11);

    await fireEvent.scroll(window, { target: { scrollY: 1524 } });
    const names13 = (await screen.findAllByAltText('user photo')) as HTMLElement[];
    expect(names13).toHaveLength(13);
  });
});
