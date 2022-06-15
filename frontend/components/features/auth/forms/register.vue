<template>
  <form class="block" @submit.prevent="save">
    <div class="flex w-full">
      <div class="md:pr-8 w-full md:w-1/2">
        <in-field title="First name" class="mb-16">
          <in-input
            v-model="form.name"
            placeholder="John"
            autocomplete="given-name"
            tabindex="1"
            :error="$v.form.name.$dirty && $v.form.name.$invalid"
            @blur="$v.form.name.$touch()"
          />
          <in-field-message v-if="!$v.form.name.required && $v.form.name.$dirty">
            Please enter your first name
          </in-field-message>
        </in-field>
      </div>
      <div class="md:pl-8 w-full md:w-1/2">
        <in-field title="Last name" class="mb-16">
          <in-input
            v-model="form.lastName"
            placeholder="Doe"
            autocomplete="family-name"
            tabindex="2"
            :error="$v.form.lastName.$dirty && $v.form.lastName.$invalid"
            @blur="$v.form.lastName.$touch()"
          />
          <in-field-message v-if="!$v.form.lastName.required && $v.form.lastName.$dirty">
            Please enter your last name
          </in-field-message>
        </in-field>
      </div>
    </div>
    <in-field title="Your email" class="mb-16">
      <in-input
        v-model="form.email"
        type="email"
        placeholder="john.doe@gmail.com"
        autocomplete="email"
        tabindex="3"
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
        tabindex="4"
        autocomplete="current-password"
        :error="$v.form.password.$dirty && $v.form.password.$invalid"
        @blur="$v.form.password.$touch()"
      />
      <in-field-message v-if="!$v.form.password.required && $v.form.password.$dirty">
        Please enter your password
      </in-field-message>
    </in-field>
    <div class="flex justify-center">
      <in-button :disabled="$v.$invalid" :loading="sending">
        Sign up
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
import { AuthRegisterData } from '~/components/features/auth/auth.model';
import { Routes } from '~/components/shared/constants/routes';

interface RegisterForm {
  name: string,
  lastName: string,
  email: string,
  password: string,
}

const initialForm: RegisterForm = {
  name: '',
  lastName: '',
  email: '',
  password: '',
};

@Component({
  name: 'in-auth-form-register',
  components: {
    InButton, InFieldMessage, InInput, InField,
  },
  validations: {
    form: {
      name: {
        required,
      },
      lastName: {
        required,
      },
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
export default class AuthFormRegister extends Vue {
  @Action(AuthActions.REGISTER, { namespace: StoreNamespace.AUTH }) register: (data: AuthRegisterData) => Promise<void>;

  form: RegisterForm = {
    ...initialForm,
  };

  sending = false;

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.sending = true;
    this.register({
      ...this.form,
    })
      .then(() => {
        this.$router.push({ name: Routes.DASHBOARD });
      })
      .finally(() => {
        this.sending = false;
      });
  }
}
</script>
