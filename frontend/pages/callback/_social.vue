<router>
{name: 'oauth2'}
</router>

<template>
  <div>
    <div class="container" />
  </div>
</template>

<script lang="ts">
import { Action, Component, Vue } from 'nuxt-property-decorator';
import { Routes } from '~/components/shared/constants/routes';
import { AuthActions } from '~/store/auth/actions';
import { StoreNamespace } from '~/store';

@Component({})
export default class Oauth2 extends Vue {
  @Action(AuthActions.SOCIAL_CALLBACK, { namespace: StoreNamespace.AUTH }) socialCallback: (data: { platform: string, params: any }) => Promise<void>;

  Routes = Routes;

  type: string | null = null;

  mounted() {
    const { social } = this.$route.params;
    if (social) {
      this.socialCallback({
        platform: social,
        params: this.$route.query,
      })
        .then(() => {
          this.$router.push({ name: Routes.DASHBOARD });
        })
        .catch(() => {
          this.$invois.toast({
            title: 'Error',
            body: 'There was an error logging in please try again',
          });
          this.$router.push({ name: Routes.LOGIN });
        });
    }
  }
}
</script>
