import Vue from 'kolibri.lib.vue';
import store from 'kolibri.coreVue.vuex.store';
import ColourPicker from '../views/ColourPicker';

export default {
  show() {
    const pickerDiv = global.document.createElement('div');
    global.document.body.appendChild(pickerDiv);
    this.rootvue = new Vue(
      Object.assign(
        {
          el: pickerDiv,
          store,
        },
        ColourPicker
      )
    );
  },
  hide() {
    global.document.body.removeChild(this.rootvue.$el);
    this.rootvue.$destroy();
  },
};
