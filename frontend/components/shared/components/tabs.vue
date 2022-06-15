<template>
  <div class="c-tabs" :class="[type && `c-tabs--${type}`]" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-tabs',
})
export default class InTabs extends Vue {
  @Prop({ required: false }) type?: string;
}
</script>
