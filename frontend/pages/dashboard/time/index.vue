<router>
{name: 'time'}
</router>

<template>
  <div>
    <div class="container">
      <h1>Time tracking</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
  layout: 'dashboard',
})
export default class Time extends Vue {}
</script>
