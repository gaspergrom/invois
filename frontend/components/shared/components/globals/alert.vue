<template>
  <in-modal :open="isOpen" :remove-x="true" @close="isOpen = false">
    <div class="p-32">
      <div class="flex justify-center pb-8">
        <in-icon
          :name="content.icon || Icons.ALERT_CIRCLE"
          :height="48"
          :width="48"
          :class="{
            'text-primary': content.type === 'warning',
            'text-red': content.type === 'danger',
            'text-green': content.type === 'success'
          }"
        />
      </div>
      <h3 v-if="content.title" class="text-h3 font-bold text-center pb-8">
        {{ content.title }}
      </h3>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="text-center text-gray-75 text-body-S c-content" v-html="$sanitize(content.body)" />
      <div class="flex justify-center pt-24">
        <in-button v-if="content.cancel" size="medium" type="secondary" class="mr-8 ml-8" @click="content.cancel.action(); close()">
          {{ content.cancel.text }}
        </in-button>
        <in-button v-if="content.confirm" size="medium" class="mr-8 ml-8" @click="content.confirm.action(); close()">
          {{ content.confirm.text }}
        </in-button>
      </div>
    </div>
  </in-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line import/no-cycle
import { GlobalMutations } from '~/store/globals/mutations';
import InButton from '~/components/shared/components/button.vue';
import InModal from '~/components/shared/components/modal.vue';
import InIcon from '~/components/shared/components/icon.vue';
import { Icons } from '../../constants/icons';

export interface AlertContent {
  type?: 'danger' | 'success' | 'warning',
  title: string,
  body?: string,
  icon?: Icons,
  confirm?: {
    text: string;
    action: () => void
  },
  cancel?: {
    text: string;
    action: () => void
  }
}

@Component({
  name: 'in-global-alert',
  components: {
    InIcon,
    InModal,
    InButton,
  },
})
export default class RSGlobalAlert extends Vue {
  Icons = Icons;

  isOpen = false;

  content: AlertContent = {
    type: 'danger',
    title: '',
    body: '',
    icon: undefined,
    confirm: undefined,
    cancel: undefined,
  };

  timeout: any = null;

  open(options: AlertContent) {
    if (this.isOpen || this.timeout) {
      this.close();
      setTimeout(() => {
        this.showAlert(options);
      }, 200);
    } else {
      this.showAlert(options);
    }
  }

  private showAlert(options: AlertContent) {
    this.content = options;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    setTimeout(() => {
      this.clear();
    }, 200);
  }

  private clear() {
    this.content.title = '';
    this.content.body = '';
    this.content.icon = undefined;
    this.content.confirm = undefined;
    this.content.cancel = undefined;
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  created() {
    this.$store.subscribe((mutation: any, state: any) => {
      if (mutation.type === `globals/${GlobalMutations.ALERT}`) {
        this.open(state.globals.alert);
      }
    });
  }
}
</script>
