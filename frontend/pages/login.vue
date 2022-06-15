<router>
{name: 'login'}
</router>

<template>
  <div>
    <div class="container">
      <div class="flex justify-center items-center h-screen">
        <div style="width: 400px">
          <div class="flex justify-center">
            <h1 class="font-bold text-h0 bg-gradient-main bg-clip-text text-transparent text-center">
              Login
            </h1>
          </div>
          <div class="flex justify-center">
            <in-auth-oauth2 class="mt-16" />
          </div>
          <div class="flex items-center justify-center">
            <div class="h-2 w-64 bg-gray-20" />
            <p class="text-body-XXS text-gray-30 mx-8 my-16 font-semibold">
              OR
            </p>
            <div class="h-2 w-64 bg-gray-20" />
          </div>
          <in-auth-form-login />
          <p class="text-body-XXS mt-8 font-semibold text-gray-70 text-center">
            Don't have an account yet?
            <nuxt-link class="text-primary" :to="{name: Routes.SIGN_UP}">
              Sign up
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import InAuthFormLogin from '~/components/features/auth/forms/login.vue';
import { Routes } from '~/components/shared/constants/routes';
import InAuthOauth2 from '~/components/features/auth/components/oauth2.vue';

@Component({
  components: {
    InAuthOauth2,
    InAuthFormLogin,
  },
  layout: 'auth',
})
export default class Login extends Vue {
  Routes = Routes;
}
</script>
