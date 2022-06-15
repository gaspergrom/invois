<template>
  <div class="flex">
    <in-card class="p-8 mr-16 shadow-1" @click="socialLogin('google')">
      <in-icon :name="Icons.GOOGLE" :height="32" :width="32" />
    </in-card>
    <in-card class="p-8 mr-16 shadow-1" @click="socialLogin('facebook')">
      <in-icon :name="Icons.FACEBOOK" :height="32" :width="32" />
    </in-card>
    <in-card class="p-12 shadow-1" @click="socialLogin('linkedin')">
      <in-icon :name="Icons.LINKEDIN" :height="24" :width="24" />
    </in-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import InCard from '~/components/shared/components/card.vue';
import { API_SERVICE } from '~/components/shared/services/api.service';
import InIcon from '~/components/shared/components/icon.vue';
import { Icons } from '~/components/shared/constants/icons';

@Component({
  name: 'in-auth-oauth2',
  components: { InIcon, InCard },
})
export default class AuthFormForgotPassword extends Vue {
  Icons = Icons;

  socialLogin(platform: string) {
    API_SERVICE.auth.socialLogin(platform);
  }
}
</script>
