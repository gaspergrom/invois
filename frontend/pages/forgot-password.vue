<router>
{name: 'forgot-password'}
</router>

<template>
  <div>
    <div class="container">
      <div class="flex justify-center items-center h-screen">
        <div style="width: 400px">
          <p class="text-h1 font-semibold pb-8">
            Forgot password?
          </p>
          <in-auth-form-forgot-password />
          <p class="text-body-XXS mt-8 font-semibold text-gray-70">
            Remember password?
            <nuxt-link class="text-primary" :to="{name: Routes.LOGIN}">
              Login
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Routes } from '~/components/shared/constants/routes';
import InAuthFormForgotPassword from '~/components/features/auth/forms/forgot-password.vue';

@Component({
  components: {
    InAuthFormForgotPassword,
  },
  layout: 'auth',
})
export default class Login extends Vue {
  Routes = Routes;
}
</script>
