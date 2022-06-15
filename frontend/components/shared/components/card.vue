<template>
  <div class="c-card" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  name: 'in-card',
})
export default class InCard extends Vue {}
</script>
