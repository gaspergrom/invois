<router>
{name: 'profile'}
</router>

<template>
  <div>
    <in-profile-form-profile class="mb-32" />
    <h3 class="text-h3 font-bold">
      Change password
    </h3>
    <in-profile-form-password />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import InProfileFormProfile from '~/components/features/profile/forms/profile.vue';
import InProfileFormPassword from '~/components/features/profile/forms/password.vue';

@Component({
  components: {
    InProfileFormPassword, InProfileFormProfile,
  },
  layout: 'dashboard',
})
export default class Profile extends Vue {}
</script>
