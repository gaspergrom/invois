<template>
  <div class="c-modal pt-80 pb-40 pl-16 pr-16 md:pt-32 md:pb-32" :class="{'show': open}" @click="close()">
    <div class="c-modal__content" :style="[width ? {'max-width': width} : null]" @click.stop>
      <div class="flex justify-between pt-24 px-24">
        <slot name="header"></slot>
        <div v-if="!removeX" class="cursor-pointer text-gray-50 pl-8 pt-8 pb-8 flex" @click="close()">
          <in-icon :name="Icons.X" height="13" width="13" />
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
import InIcon from '~/components/shared/components/icon.vue';

@Component({
  name: 'in-modal',
  components: { InIcon },
})
export default class InModal extends Vue {
  @Prop() open?: boolean;

  @Prop({ required: false }) width?: string;

  @Prop({ required: false, default: false }) removeX?: boolean;

  Icons = Icons;

  @Watch('open')
  onOpenChange(show: boolean) {
    if (!show) {
      window.removeEventListener('keyup', this.onEscapeKeyUp);
    } else {
      window.addEventListener('keyup', this.onEscapeKeyUp);
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
