import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import { Store } from 'vuex';
import { sync } from 'vuex-router-sync';
import { VueRouter } from 'vue-router/types/router';
import App from './app/App/App.vue';
import { store } from './store';
import { router } from './router';
import { IState } from './state';
import { i18n } from '@shared/plugins/i18n/i18n';
import { HttpService } from '@shared/services/HttpService/HttpService';
import './shared/directives';

import {Database} from './interfaceDatabase';
import {ImplementationDatabase} from './firebaseImplementation';

let FunctionsDatabase: Database = new ImplementationDatabase();

import Vuetify from 'vuetify';
Vue.use(Vuetify);


Vue.use(VeeValidate, { inject: false, delay: 1 });

export interface IApp {
  app: Vue;
  router: VueRouter;
  store: Store<IState>;
  i18n: VueI18n;
}

Vue.use(Vuetify);
Vue.use(VeeValidate, { inject: false, delay: 1 });



export const createApp = (): IApp => {
  sync(store, router);

  HttpService.store = store;
  FunctionsDatabase.init();
  const app: Vue = new Vue({
    router,
    store,
    i18n,
    vuetify: new Vuetify({
      icons: {
        iconfont: 'mdi',
      },
    }),
    render: (h) => h(App),
  });

  return { app, router, store, i18n , };
};