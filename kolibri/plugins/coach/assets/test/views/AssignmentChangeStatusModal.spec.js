import { mount } from '@vue/test-utils';
import store from 'kolibri.coreVue.vuex.store';
import AssignmentChangeStatusModal from '../../src/views/plan/assignments/AssignmentChangeStatusModal';

const defaultProps = {
  modalTitle: '',
  modalDescription: '',
};

// prettier-ignore
function makeWrapper(options) {
  const wrapper = mount(AssignmentChangeStatusModal, options);
  const els = {
    activeRadio: () => wrapper.findAll('input[type="radio"]').at(0),
    inactiveRadio: () => wrapper.findAll('input[type="radio"]').at(1),
    submitButton: () => wrapper.find('button[type="submit"]'),
    cancelButton: () => wrapper.find('button[name="cancel"]'),
    form: () => wrapper.find('form')
  }
  return { wrapper, els };
}

describe('AssignmentChangeStatusModal', () => {
  it('if status is changed from active to inactive, submitting form emits a "changestatus" event', () => {
    const { wrapper, els } = makeWrapper({
      propsData: {
        ...defaultProps,
        active: true,
      },
      store,
    });
    expect(wrapper.vm.activeIsSelected).toEqual(true);
    els.inactiveRadio().trigger('change');
    expect(wrapper.vm.activeIsSelected).toBeFalsy();
    // Clicking submit button doesn't propagate to form: may be bug with test-utils
    // els.submitButton().trigger('click');
    els.form().trigger('submit');
    expect(wrapper.emitted().changeStatus[0][0]).toEqual(false);
  });

  it('if status is changed from inactive to active, submitting form emits a "changestatus" event', () => {
    const { wrapper, els } = makeWrapper({
      propsData: {
        ...defaultProps,
        active: false,
      },
      store,
    });
    expect(wrapper.vm.activeIsSelected).toBeFalsy();
    els.activeRadio().trigger('change');
    expect(wrapper.vm.activeIsSelected).toEqual(true);
    els.form().trigger('submit');
    expect(wrapper.emitted().changeStatus[0][0]).toEqual(true);
  });

  it('if status has not changed, submitting form only closes modal', () => {
    const { wrapper, els } = makeWrapper({
      propsData: {
        ...defaultProps,
        active: false,
      },
      store,
    });
    els.form().trigger('submit');
    expect(wrapper.emitted().cancel.length).toEqual(1);
  });

  it('pressing "cancel" closes the modal', () => {
    const { wrapper, els } = makeWrapper({
      propsData: { ...defaultProps },
      store,
    });
    els.cancelButton().trigger('click');
    expect(wrapper.emitted().cancel.length).toEqual(1);
  });
});
