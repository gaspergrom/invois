<template>
  <nuxt-link
    v-if="to"
    :to="to"
    :class="[type && `c-btn--${type}`, size && `c-btn--${size}`, {'is-loading': loading}]"
    class="c-btn"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </nuxt-link>
  <button
    v-else
    :type="buttonType"
    class="c-btn"
    :class="[type && `c-btn--${type}`, size && `c-btn--${size}`, {'is-loading': loading}]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-button',
})
export default class InButton extends Vue {
  @Prop({ required: false, default: 'primary' }) type?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'link' | 'outline' | 'success' | 'warning' | 'danger';

  @Prop({ required: false, default: 'large' }) size?: 'large' | 'medium' | 'small';

  @Prop({ required: false }) to?: string;

  @Prop({ required: false }) buttonType?: string;

  @Prop({ required: false, default: false }) loading?: boolean;
}
</script>
