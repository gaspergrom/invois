// @ts-ignore
import { ToastContent } from '~/components/shared/components/globals/toast.vue';
// @ts-ignore
import { AlertContent } from '~/components/shared/components/globals/alert.vue';
import { GlobalState } from './state';

export enum GlobalMutations {
  TOAST = 'toast',
  ALERT = 'alert',
}

const mutations: Record<GlobalMutations, (state: GlobalState, data?: any) => any> = {
  [GlobalMutations.TOAST]: (state: GlobalState, toast: ToastContent) => {
    state.toast = toast || null;
  },
  [GlobalMutations.ALERT]: (state: GlobalState, alert: AlertContent) => {
    state.alert = alert || null;
  },
};

export default mutations;
