<template>
  <div>
    <div class="c-side-modal__backdrop" :class="{'show': open}" @click="close()" />
    <div :id="id" class="c-side-modal" :class="{'show': open}" :style="{'width': width, 'right': '-' + width}">
      <div class="c-side-modal__header flex items-center justify-between py-16 px-24">
        <div>
          <h3 v-if="title" class="text-h3 font-semibold">
            {{ title }}
          </h3>
          <slot name="header" />
        </div>
        <div class="flex">
          <in-button v-if="cancelText" type="tertiary" size="small" class="mr-12" @click="$emit('cancel')">
            {{ cancelText }}
          </in-button>
          <in-button
            v-if="confirmText"
            size="small"
            :loading="isConfirmLoading"
            :class="{'is-disabled': isConfirmDisabled}"
            class="mr-12"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </in-button>
          <div class="c-side-modal__navigation">
            <in-button
              v-if="aditionalActions && aditionalActions.length > 0"
              size="icon-small"
              type="secondary"
              class="rounded-4 shadow-none"
            >
              <in-icon :name="Icons.MORE" :height="16" :width="16" />
            </in-button>
            <nav>
              <a v-for="(action, ai) of aditionalActions" :key="ai" :class="`is-${action.type}`" @click="action.action()">
                <in-icon :name="action.icon" :height="16" :width="16" />
                <span>{{ action.text }}</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'nuxt-property-decorator';
import { Icons } from '~/components/shared/constants/icons';
import InButton from '~/components/shared/components/button.vue';
import InIcon from '~/components/shared/components/icon.vue';

export interface SideModalAction {
  text: string,
  action: () => void,
  icon: Icons,
  type: 'regular' | 'danger'
}

@Component({
  name: 'in-side-modal',
  components: { InIcon, InButton },
})
export default class InSideModal extends Vue {
  @Prop() open?: boolean;

  @Prop() title?: string;

  @Prop() cancelText?: string;

  @Prop() confirmText?: string;

  @Prop({ default: false }) isConfirmLoading?: boolean;

  @Prop({ default: false }) isConfirmDisabled?: boolean;

  @Prop() id?: string;

  @Prop({ default: '50rem' }) width?: string;

  @Prop() aditionalActions?: SideModalAction[];

  Icons = Icons;

  @Watch('open')
  onOpenChange(show: boolean) {
    if (!show) {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keyup', this.onEscapeKeyUp);
    } else {
      window.addEventListener('keyup', this.onEscapeKeyUp);
      this.$nextTick(() => {
        document.body.classList.add('overflow-hidden');
      });
    }
  }

  onEscapeKeyUp(event: any) {
    if (event.which === 27) {
      this.close();
    }
  }

  close() {
    this.$emit('close');
  }
}
</script>
