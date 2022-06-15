import Vue, { ComponentOptions } from 'vue'
import { AlertContent, ToastContent } from '~/plugins/global'

declare module 'vue/types/vue' {
  interface Vue {
    $invois: {
      toast: (content: ToastContent) => void,
      alert: (content: AlertContent) => void,
    },
    $sanitize: (string) => string,
    $store: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    middleware?: string | string[];
    layout?: string;
  }
}
