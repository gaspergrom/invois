<router>
{name: 'transactions'}
</router>

<template>
  <div>
    <div class="container">
      <h1>Transactions</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
  layout: 'dashboard',
})
export default class Transactions extends Vue {}
</script>
