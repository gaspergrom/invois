<template>
  <form @submit.prevent="save">
    <in-field title="Your email" class="mb-16">
      <in-input
        v-model="form.email"
        type="email"
        placeholder="john.doe@gmail.com"
        autocomplete="email"
        tabindex="1"
        :error="$v.form.email.$dirty && $v.form.email.$invalid"
        @blur="$v.form.email.$touch()"
      />
      <in-field-message v-if="!$v.form.email.required && $v.form.email.$dirty">
        Please enter your email
      </in-field-message>
      <in-field-message v-else-if="!$v.form.email.email && $v.form.email.$dirty">
        Please enter valid email
      </in-field-message>
    </in-field>
    <in-field title="Your password" class="mb-16">
      <in-input
        v-model="form.password"
        type="password"
        placeholder="Minimum 8 characters"
        tabindex="2"
        autocomplete="current-password"
        :error="$v.form.password.$dirty && $v.form.password.$invalid"
        @blur="$v.form.password.$touch()"
      />
      <in-field-message v-if="!$v.form.password.required && $v.form.password.$dirty">
        Please enter your password
      </in-field-message>
      <template #action>
        <nuxt-link :to="{name: Routes.FORGOT_PASSWORD}" class="text-primary text-body-XXS font-semibold">
          Forgot password?
        </nuxt-link>
      </template>
    </in-field>
    <div class="flex justify-center">
      <in-button :disabled="$v.$invalid" :loading="sending">
        Log in
      </in-button>
    </div>
  </form>
</template>

<script lang="ts">
import { Action, Component, Vue } from 'nuxt-property-decorator';
import { email, required } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import InButton from '~/components/shared/components/button.vue';
import { AuthActions } from '~/store/auth/actions';
import { StoreNamespace } from '~/store';
import { AuthLoginData } from '~/components/features/auth/auth.model';
import { Routes } from '~/components/shared/constants/routes';

interface LoginForm {
  email: string,
  password: string,
}

const initialForm: LoginForm = {
  email: '',
  password: '',
};

@Component({
  name: 'in-auth-form-login',
  components: {
    InButton, InFieldMessage, InInput, InField,
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
})
export default class AuthFormLogin extends Vue {
  @Action(AuthActions.LOGIN, { namespace: StoreNamespace.AUTH }) login: (data: AuthLoginData) => Promise<string>;

  Routes = Routes;

  form: LoginForm = {
    ...initialForm,
  };

  sending = false;

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.sending = true;
    this.login({
      ...this.form,
    })
      .then(() => {
        this.$router.push({ name: Routes.DASHBOARD });
      })
      .catch(({ data, message }) => {
        const error = data.message || message;
        this.$invois.toast({
          title: 'Error',
          body: error,
        });
      })
      .finally(() => {
        this.sending = false;
      });
  }
}
</script>
