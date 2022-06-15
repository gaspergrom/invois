<template>
  <div>
    <main>
      <Nuxt />
    </main>
    <in-globals />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import InGlobals from '~/components/shared/components/globals/globals.vue';

@Component({
  components: { InGlobals },
  middleware: 'auth',
})
export default class AuthLayout extends Vue {}
</script>
