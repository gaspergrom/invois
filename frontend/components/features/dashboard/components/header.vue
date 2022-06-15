<template>
  <header class="flex justify-end p-16">
    <div class="flex items-center">
      <div class="p-4">
        <in-icon :name="Icons.BELL" :height="20" :width="20" class="text-gray-70" />
      </div>
      <div class="p-4">
        <in-icon :name="Icons.SEARCH" :height="20" :width="20" class="text-gray-70" />
      </div>
      <p v-if="user" class="text-body-XS font-semibold mr-8 ml-4">
        {{ user.name }} {{ user.lastName }}
      </p>
      <in-dropdown v-if="user" horisontal="right">
        <in-profile
          :src="user.profilePhoto"
          :name="user.name"
          :surname="user.lastName"
          :use-default="true"
          :size="36"
        />
        <nav>
          <nuxt-link :to="{name: Routes.PROFILE}" active-class="is-active">
            Profile
          </nuxt-link>
          <hr>
          <a @click="logout()">Logout</a>
        </nav>
      </in-dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import {
  Action, Component, Getter, Vue,
} from 'nuxt-property-decorator';
import InProfile from '~/components/shared/components/profile.vue';
import { StoreNamespace } from '~/store';
import { User } from '~/components/features/auth/auth.model';
import { AuthGetters } from '~/store/auth/getters';
import InIcon from '~/components/shared/components/icon.vue';
import { Icons } from '~/components/shared/constants/icons';
import InDropdown from '~/components/shared/components/dropdown.vue';
import { AuthActions } from '~/store/auth/actions';
import { Routes } from '~/components/shared/constants/routes';

@Component({
  name: 'in-dashboard-header',
  components: { InDropdown, InIcon, InProfile },
})
export default class DashboardHeader extends Vue {
  @Getter(AuthGetters.USER, { namespace: StoreNamespace.AUTH }) user: User;

  @Action(AuthActions.LOGOUT, { namespace: StoreNamespace.AUTH }) authLogout: () => void;

  Routes = Routes;

  Icons = Icons;

  logout() {
    this.authLogout();
    this.$router.push({ name: Routes.LOGIN });
  }
}
</script>
