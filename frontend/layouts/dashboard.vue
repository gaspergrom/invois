<template>
  <div class="l-dashboard">
    <in-dashboard-header />
    <in-dashboard-sidebar />
    <main>
      <Nuxt />
    </main>
    <in-globals />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import InGlobals from '~/components/shared/components/globals/globals.vue';
import InDashboardHeader from '~/components/features/dashboard/components/header.vue';
import InDashboardSidebar from '~/components/features/dashboard/components/sidebar.vue';

@Component({
  components: { InDashboardSidebar, InDashboardHeader, InGlobals },
  middleware: 'dashboard',
})
export default class DefaultLayout extends Vue {}
</script>
