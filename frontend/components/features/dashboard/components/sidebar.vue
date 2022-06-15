<template>
  <aside class="px-12 py-16">
    <div class="flex">
      <h2 class="font-bold text-h1 bg-gradient-main bg-clip-text text-transparent">
        Invois
      </h2>
    </div>
    <div class="pt-16">
      <nav class="menu">
        <nuxt-link :to="{name: Routes.DASHBOARD}" class="flex items-center" active-class="active" exact>
          <in-icon :name="Icons.HOME" :height="16" :width="16" />
          <span class="ml-4">Dashboard</span>
        </nuxt-link>
        <nuxt-link :to="{name: Routes.CLIENTS}" class="flex items-center" active-class="active">
          <in-icon :name="Icons.USER" :height="16" :width="16" />
          <span class="ml-4">Clients</span>
        </nuxt-link>

        <nuxt-link :to="{name: Routes.PROJECTS}" class="flex items-center" active-class="active">
          <in-icon :name="Icons.SUITCASE" :height="16" :width="16" />
          <span class="ml-4">Projects</span>
        </nuxt-link>

        <nuxt-link :to="{name: Routes.INVOICES}" class="flex items-center" active-class="active">
          <in-icon :name="Icons.FILE" :height="16" :width="16" />
          <span class="ml-4">Invoices</span>
        </nuxt-link>

        <nuxt-link :to="{name: Routes.TIME}" class="flex items-center" active-class="active">
          <in-icon :name="Icons.TIME" :height="16" :width="16" />
          <span class="ml-4">Time tracking</span>
        </nuxt-link>

        <nuxt-link :to="{name: Routes.TRANSACTIONS}" class="flex items-center" active-class="active">
          <in-icon :name="Icons.DOLLAR_CIRCLE" :height="16" :width="16" />
          <span class="ml-4">Transactions</span>
        </nuxt-link>
      </nav>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import InIcon from '~/components/shared/components/icon.vue';
import { Icons } from '~/components/shared/constants/icons';
import { Routes } from '~/components/shared/constants/routes';

@Component({
  name: 'in-dashboard-sidebar',
  components: { InIcon },
})
export default class DashboardSidebar extends Vue {
  Routes = Routes;

  Icons = Icons;
}
</script>
