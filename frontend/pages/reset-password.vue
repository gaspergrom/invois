<router>
{name: 'reset-password'}
</router>

<template>
  <div>
    <div class="container">
      <div class="flex justify-center items-center h-screen">
        <div style="width: 400px">
          <in-loading v-if="loading" />
          <div v-else-if="valid">
            <p class="text-h1 font-semibold pb-8">
              Reset password
            </p>
            <in-auth-form-reset-password :token="token" />
            <p class="text-body-XXS mt-8 font-semibold text-gray-70">
              Return to
              <nuxt-link class="text-primary" :to="{name: Routes.LOGIN}">
                Login
              </nuxt-link>
            </p>
          </div>
          <div v-else>
            <p class="text-h1 font-semibold">
              Link has expired
            </p>
            <p class="pb-8">
              You can send password reset email again
            </p>
            <in-auth-form-forgot-password />
            <p class="text-body-XXS mt-8 font-semibold text-gray-70">
              Return to
              <nuxt-link class="text-primary" :to="{name: Routes.LOGIN}">
                Login
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { API_SERVICE } from '~/components/shared/services/api.service';
import InLoading from '~/components/shared/components/loading.vue';
import InAuthFormForgotPassword from '~/components/features/auth/forms/forgot-password.vue';
import InAuthFormResetPassword from '~/components/features/auth/forms/reset-password.vue';
import { Routes } from '~/components/shared/constants/routes';

@Component({
  components: { InAuthFormResetPassword, InAuthFormForgotPassword, InLoading },
  layout: 'auth',
})
export default class ResetPassword extends Vue {
  Routes = Routes;

  token: string | null = null;

  loading = true;

  valid = false;

  mounted() {
    this.token = this.$route.query.token as string;
    this.loading = true;
    API_SERVICE.auth.verifyResetPasswordToken(this.token)
      .then(() => {
        this.valid = true;
      })
      .catch(() => {
        this.valid = false;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>
