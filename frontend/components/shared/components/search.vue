<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      ref="input"
      type="search"
      class="c-input c-input--small"
      :class="{'c-input--prefix': !hideIcon}"
      v-on="$listeners"
      @keydown.enter.prevent
      @input="updateValue()"
    >
    <div v-if="!hideIcon" class="c-input__prefix text-gray-30">
      <in-icon :name="Icons.SEARCH" :height="16" :width="16" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Icons } from '~/components/shared/constants/icons';
import InIcon from '~/components/shared/components/icon.vue';

@Component({
  name: 'in-search',
  components: { InIcon },
})
export default class InInput extends Vue {
  @Prop({ required: false, default: false }) lazy: boolean;

  @Prop({ required: false, default: false }) hideIcon: boolean;

  Icons = Icons;

  valueProxy = '';

  updateValue() {
    this.valueProxy = (this.$refs.input as HTMLInputElement).value;
    const { value } = this.$refs.input as HTMLInputElement;
    if (this.lazy) {
      setTimeout(() => {
        if (this.valueProxy === value) {
          this.$emit('search', this.valueProxy);
        }
      }, 300);
    } else {
      this.$emit('search', this.valueProxy);
    }
  }
}
</script>
