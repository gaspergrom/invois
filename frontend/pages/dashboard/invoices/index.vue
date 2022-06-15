<router>
{name: 'invoices'}
</router>

<template>
  <div>
    <div class="container">
      <h1>Invoices</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
  layout: 'dashboard',
})
export default class Invoices extends Vue {}
</script>
