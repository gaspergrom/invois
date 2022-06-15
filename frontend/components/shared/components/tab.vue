<template>
  <nuxt-link
    v-if="to"
    :to="to"
    class="c-tab"
    active-class="is-active"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </nuxt-link>
  <div v-else class="c-tab" :class="{'is-active': active}" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-tab',
})
export default class InTab extends Vue {
  @Prop({ required: false, default: false }) active?: boolean;

  @Prop({ required: false }) to?: string;
}
</script>
