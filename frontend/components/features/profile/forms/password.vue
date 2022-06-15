<template>
  <form class="block" @submit.prevent="save">
    <in-field title="Old password" class="mb-16">
      <in-input
        v-model="form.oldPassword"
        type="password"
        placeholder="Minimum 8 characters"
        tabindex="4"
        autocomplete="current-password"
        :error="$v.form.oldPassword.$dirty && $v.form.oldPassword.$invalid"
        @blur="$v.form.oldPassword.$touch()"
      />
      <in-field-message v-if="!$v.form.oldPassword.required && $v.form.oldPassword.$dirty">
        Please enter your old password
      </in-field-message>
    </in-field>
    <in-field title="New password" class="mb-16">
      <in-input
        v-model="form.password"
        type="password"
        placeholder="Minimum 8 characters"
        tabindex="4"
        autocomplete="new-password"
        :error="$v.form.password.$dirty && $v.form.password.$invalid"
        @blur="$v.form.password.$touch()"
      />
      <in-field-message v-if="!$v.form.password.required && $v.form.password.$dirty">
        Please enter new password
      </in-field-message>
    </in-field>
    <in-button :disabled="$v.$invalid" :loading="sending">
      Change password
    </in-button>
  </form>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'nuxt-property-decorator';
import { required } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import InButton from '~/components/shared/components/button.vue';
import { API_SERVICE } from '~/components/shared/services/api.service';

interface ProfilePasswordForm {
  oldPassword: string,
  password: string,
}

const initialForm: ProfilePasswordForm = {
  oldPassword: '',
  password: '',
};

@Component({
  name: 'in-profile-form-password',
  components: {
    InButton, InFieldMessage, InInput, InField,
  },
  validations: {
    form: {
      oldPassword: {
        required,
      },
      password: {
        required,
      },
    },
  },
})
export default class ProfileFormPassword extends Vue {
  form: ProfilePasswordForm = {
    ...initialForm,
  };

  sending = false;

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.sending = true;
    API_SERVICE.auth.changePassword(this.form.oldPassword, this.form.password)
      .then(() => {
        this.$invois.toast({
          title: 'Success!',
          body: 'Password has been updated!',
        });
        this.reset();
      })
      .catch(() => {
        this.$invois.toast({
          title: 'Error!',
          body: 'There was an error changing password!',
        });
      })
      .finally(() => {
        this.sending = false;
      });
  }

  reset() {
    this.form = {
      ...initialForm,
    };
    this.$v.$reset();
  }
}
</script>
