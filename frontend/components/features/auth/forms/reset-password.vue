<template>
  <form class="block" @submit.prevent="save">
    <in-field title="New password" class="mb-16">
      <in-input
        v-model="form.password"
        type="password"
        placeholder="Minimum 8 characters"
        autocomplete="new-password"
        :error="$v.form.password.$dirty && $v.form.password.$invalid"
        @blur="$v.form.password.$touch()"
      />
      <in-field-message v-if="!$v.form.password.required && $v.form.password.$dirty">
        Please enter your password
      </in-field-message>
      <in-field-message v-else-if="!$v.form.password.minLength && $v.form.password.$dirty">
        Password needs to be at least 8 characters long
      </in-field-message>
    </in-field>
    <in-field title="Repeat new password" class="mb-16">
      <in-input
        v-model="form.repeatPassword"
        type="password"
        placeholder="Repeat password"
        :error="$v.form.repeatPassword.$dirty && $v.form.repeatPassword.$invalid"
        @blur="$v.form.repeatPassword.$touch()"
      />
      <in-field-message v-if="!$v.form.repeatPassword.required && $v.form.repeatPassword.$dirty">
        Please enter your password
      </in-field-message>
      <in-field-message v-else-if="!$v.form.repeatPassword.sameAs && $v.form.repeatPassword.$dirty">
        Passwords don't match
      </in-field-message>
    </in-field>

    <in-button :disabled="$v.$invalid" :loading="sending">
      Sign up
    </in-button>
  </form>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'nuxt-property-decorator';
import { minLength, required, sameAs } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import InButton from '~/components/shared/components/button.vue';
import { API_SERVICE } from '~/components/shared/services/api.service';

interface ResetPasswordForm {
  password: string,
  repeatPassword: string,
}

const initialForm: ResetPasswordForm = {
  password: '',
  repeatPassword: '',
};

@Component({
  name: 'in-auth-form-reset-password',
  components: {
    InButton, InFieldMessage, InInput, InField,
  },
  validations() {
    const self: any = this;
    return {
      form: {
        password: {
          required,
          minLength: minLength(8),
        },
        repeatPassword: {
          required,
          sameAs: sameAs(() => self.form.password),
        },
      },
    };
  },
})
export default class AuthFormRegister extends Vue {
  @Prop({ required: true }) token: string;

  form: ResetPasswordForm = {
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
    API_SERVICE.auth.resetPassword(this.token, this.form.password)
      .then(() => {
        this.$invois.toast({
          title: 'Success',
          body: 'You password has been reset!',
        });
        this.reset();
      })
      .catch(() => {
        this.$invois.toast({
          title: 'Error',
          body: 'There was an error reseting password, please try later',
        });
      })
      .finally(() => {
        this.sending = false;
      });
  }
}
</script>
