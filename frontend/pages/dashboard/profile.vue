<template>
  <div>
    <div class="container">
      <div class="flex">
        <div class="w-full md:w-1/4">
          <div class="flex justify-center">
            <in-profile :size="80" :src="user.profilePhoto" :name="user.name" :surname="user.lastName" />
          </div>
          <p class="text-center font-semibold">
            {{ user.name }} {{ user.lastName }}
          </p>
          <p class="text-center text-gray-70 text-body-XXS">
            {{ user.email }}
          </p>
        </div>
        <div class="w-full md:w-3/4">
          <in-tabs class="p-0">
            <in-tab :to="{name: Routes.PROFILE}">
              Profile
            </in-tab>
          </in-tabs>
          <div class="pt-16">
            <nuxt-child />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator';
import InTabs from '~/components/shared/components/tabs.vue';
import InTab from '~/components/shared/components/tab.vue';
import { Routes } from '~/components/shared/constants/routes';
import { AuthGetters } from '~/store/auth/getters';
import { StoreNamespace } from '~/store';
import { User } from '~/components/features/auth/auth.model';
import InProfile from '~/components/shared/components/profile.vue';

@Component({
  components: { InProfile, InTab, InTabs },
  layout: 'dashboard',
})
export default class Profile extends Vue {
  @Getter(AuthGetters.USER, { namespace: StoreNamespace.AUTH }) user: User;

  Routes = Routes;
}
</script>
