<template>
  <div class="c-toast" :class="{'is-active': isOpen}">
    <div class="flex">
      <div v-if="content.icon" class="pr-8" style="margin-top: 2px">
        <in-icon :name="content.icon" :height="16" :width="16" class="flex text-primary-80" />
      </div>
      <div>
        <h4 v-if="content.title" class="text-h6 text-white font-bold">
          {{ content.title }}
        </h4>
        <p v-if="content.body" class="text-body-XXS text-white">
          {{ content.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line import/no-cycle
import { GlobalMutations } from '~/store/globals/mutations';
import InIcon from '~/components/shared/components/icon.vue';
// eslint-disable-next-line import/no-cycle
import { StoreNamespace } from '~/store';
import { Icons } from '../../constants/icons';

export interface ToastContent {
  title?: string,
  body?: string,
  icon?: Icons,
}

@Component({
  name: 'in-global-toast',
  components: { InIcon },
})
export default class InGlobalToast extends Vue {
  isOpen = false;

  content: ToastContent = {
    title: undefined,
    body: undefined,
    icon: undefined,
  };

  timeout: any = null;

  open(options: ToastContent) {
    if (this.isOpen || this.timeout) {
      this.close();
      setTimeout(() => {
        this.showToast(options);
      }, 200);
    } else {
      this.showToast(options);
    }
  }

  private showToast(options: ToastContent) {
    this.content = options;
    this.isOpen = true;

    this.timeout = setTimeout(() => {
      this.close();
    }, 3000);
  }

  private close() {
    this.isOpen = false;
    setTimeout(() => {
      this.clear();
    }, 200);
  }

  private clear() {
    this.content.title = undefined;
    this.content.body = '';
    this.content.icon = undefined;
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  created() {
    (this as any).$store.subscribe((mutation: any, state: any) => {
      if (mutation.type === `${StoreNamespace.GLOBALS}/${GlobalMutations.TOAST}`) {
        this.open(state.globals.toast);
      }
    });
  }
}
</script>
