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
    <in-button :disabled="$v.$invalid" :loading="sending">
      Reset password
    </in-button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { email, required } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import InButton from '~/components/shared/components/button.vue';
import { API_SERVICE } from '~/components/shared/services/api.service';

interface ForgotPasswordForm {
  email: string,
}

const initialForm: ForgotPasswordForm = {
  email: '',
};

@Component({
  name: 'in-auth-form-forgot-password',
  components: {
    InButton, InFieldMessage, InInput, InField,
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
})
export default class AuthFormForgotPassword extends Vue {
  form: ForgotPasswordForm = {
    ...initialForm,
  };

  sending = false;

  reset() {
    this.form = {
      ...initialForm,
    };
    this.$v.$reset();
  }

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.sending = true;
    API_SERVICE.auth.forgotPassword(this.form.email)
      .then(() => {
        this.$invois.toast({
          title: 'Success',
          body: 'Email with password reset link has been sent!',
        });
        this.reset();
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
