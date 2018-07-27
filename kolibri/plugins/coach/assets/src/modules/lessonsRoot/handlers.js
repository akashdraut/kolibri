import { LearnerGroupResource } from 'kolibri.resources';
import { LessonsPageNames } from '../../constants/lessonsConstants';

// Show the Lessons Root Page, where all the Lessons are listed for a given Classroom
export function showLessonsRootPage(store, classId) {
  store.commit('CORE_SET_PAGE_LOADING', true);
  store.commit('lessonsRoot/SET_STATE', {
    lessons: [],
    learnerGroups: [],
  });
  const loadRequirements = [
    // Fetch learner groups for the New Lesson Modal
    LearnerGroupResource.fetchCollection({ getParams: { parent: classId } }),
    store.dispatch('lessonsRoot/refreshClassLessons', classId),
    store.dispatch('setClassState', classId),
  ];
  return Promise.all(loadRequirements).then(
    ([learnerGroups]) => {
      store.commit('lessonsRoot/SET_LEARNER_GROUPS', learnerGroups);
      store.commit('SET_PAGE_NAME', LessonsPageNames.ROOT);
      store.commit('CORE_SET_PAGE_LOADING', false);
    },
    error => {
      store.dispatch('handleApiError', error);
      store.commit('CORE_SET_PAGE_LOADING', false);
    }
  );
}
