<template>
  <div
    v-click-outside="close"
    class="c-dropdown"
    :class="[vertical && `c-dropdown--${vertical}`, horisontal && `c-dropdown--${horisontal}`, {'is-active': active}]"
    @click="!disabled && toggle()"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-dropdown',
})
export default class InDropdown extends Vue {
  @Prop({ required: false }) vertical?: 'up' | 'down';

  @Prop({ required: false }) horisontal?: 'right' | 'left';

  @Prop({ required: false }) disabled?: boolean;

  active: boolean = false;

  toggle() {
    this.active = !this.active;
    this.$emit('open', this.active);
  }

  close() {
    this.active = false;
    this.$emit('open', false);
  }
}
</script>
