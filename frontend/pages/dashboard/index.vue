<router>
{name: 'dashboard'}
</router>

<template>
  <div>
    <div class="container">
      <h1>Dashboard</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
  layout: 'dashboard',
})
export default class Dashboard extends Vue {}
</script>
