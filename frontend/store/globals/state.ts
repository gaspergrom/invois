// @ts-ignore
import { ToastContent } from '~/components/shared/components/globals/toast.vue';
// @ts-ignore
import { AlertContent } from '~/components/shared/components/globals/alert.vue';

export interface GlobalState {
  toast: ToastContent | null,
  alert: AlertContent | null,
}

const state: () => GlobalState = () => ({
  toast: null,
  alert: null,
});

export default state;
