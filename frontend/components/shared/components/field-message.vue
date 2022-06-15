<template>
  <p :class="[type && `c-field--${type}`]" v-bind="$attrs" v-on="$listeners">
    <slot />
  </p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-field-message',
})
export default class InFieldMessage extends Vue {
  @Prop({ required: false, default: 'error' }) type?: string;
}
</script>
