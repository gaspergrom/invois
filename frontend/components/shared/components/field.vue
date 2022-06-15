<template>
  <div class="c-field" v-bind="$attrs" v-on="$listeners">
    <div class="flex justify-between">
      <label v-if="title" :for="id">{{ title }}</label>
      <slot name="action" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-field',
})
export default class InField extends Vue {
  @Prop({ required: false }) title?: string;

  @Prop({ required: false }) id?: string;
}
</script>
