import Vue from 'vue'
import {ToastContent} from "~/components/shared/components/globals/toast.vue";
import {GlobalMutations} from "~/store/globals/mutations";
import {AlertContent} from "~/components/shared/components/globals/alert.vue";
import {StoreNamespace} from "~/store";

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    (el as any).clickOutsideEvent = function (event: any) {
      if (el !== event.target && !el.contains(event.target)) {
        // @ts-ignore
        vnode.context[binding?.expression](event)
      }
    }
    document.body.addEventListener('click', (el as any).clickOutsideEvent)
  },
  unbind (el) {
    document.body.removeEventListener('click', (el as any).clickOutsideEvent)
  }
})

export default (context: any, inject: (name: string, content: any) => void) => {
  inject('invois', {
    toast (content: ToastContent) {
      context.store.commit(`${StoreNamespace.GLOBALS}/${GlobalMutations.TOAST}`, content)
    },
    alert (content: AlertContent) {
      context.store.commit(`${StoreNamespace.GLOBALS}/${GlobalMutations.ALERT}`, content)
    }
  })
}
