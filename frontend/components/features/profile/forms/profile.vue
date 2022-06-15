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
    <in-button :disabled="$v.$invalid" :loading="sending">
      Save
    </in-button>
  </form>
</template>

<script lang="ts">
import {
  Action, Component, Getter, Vue, Watch,
} from 'nuxt-property-decorator';
import { required } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import InButton from '~/components/shared/components/button.vue';
import { AuthActions } from '~/store/auth/actions';
import { StoreNamespace } from '~/store';
import { User } from '~/components/features/auth/auth.model';
import { AuthGetters } from '~/store/auth/getters';

interface ProfileForm {
  name: string,
  lastName: string,
}

const initialForm: ProfileForm = {
  name: '',
  lastName: '',
};

@Component({
  name: 'in-profile-form-profile',
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
    },
  },
})
export default class AuthFormRegister extends Vue {
  @Action(AuthActions.UPDATE_USER, { namespace: StoreNamespace.AUTH }) updateUser: (data: Partial<User>) => Promise<void>;

  @Getter(AuthGetters.USER, { namespace: StoreNamespace.AUTH }) user: User;

  form: ProfileForm = {
    ...initialForm,
  };

  sending = false;

  @Watch('user', { immediate: true, deep: true })
  onUserChange(user: User) {
    this.fillForm(user);
  }

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.sending = true;
    this.updateUser({
      ...this.form,
    })
      .then(() => {
        this.$invois.toast({
          title: 'Success!',
          body: 'Profile updated successfully!',
        });
      })
      .catch(() => {
        this.$invois.toast({
          title: 'Error!',
          body: 'There was an error updating profile!',
        });
      })
      .finally(() => {
        this.sending = false;
      });
  }

  fillForm(user: User) {
    this.form.name = user.name;
    this.form.lastName = user.lastName;
  }
}
</script>
