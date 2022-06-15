<template>
  <form @submit.prevent="save()">
    <in-field title="Contact name" class="mb-8">
      <in-input
        v-model="form.name"
        placeholder="John Doe"
        autocomplete="no-complete"
      />
    </in-field>
    <in-field title="Contact email" class="mb-8">
      <in-input
        v-model="form.email"
        type="email"
        placeholder="john.doe@gmail.com"
        autocomplete="no-complete"
        :error="$v.form.email.$dirty && $v.form.email.$invalid"
        @blur="$v.form.email.$touch()"
      />
      <in-field-message v-if="!$v.form.email.required && $v.form.email.$dirty">
        Please enter contact email
      </in-field-message>
      <in-field-message v-if="!$v.form.email.email && $v.form.email.$dirty">
        Please enter valid contact email
      </in-field-message>
    </in-field>
    <in-field title="Contact email" class="mb-8">
      <in-input
        v-model="form.phoneNumber"
        type="tel"
        placeholder="+1 123 456 789"
        autocomplete="no-complete"
      />
    </in-field>
    <div class="flex pt-8">
      <in-button size="medium" class="mr-8" type="secondary" button-type="button" @click="close()">
        Cancel
      </in-button>
      <in-button size="medium">
        Save
      </in-button>
    </div>
  </form>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'nuxt-property-decorator';
import { email, required } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import { ClientContact } from '~/components/features/clients/Client.model';
import InButton from '~/components/shared/components/button.vue';

interface ClientContactForm {
  name: string;
  email: string;
  phoneNumber: string;
}

const initialForm: ClientContactForm = {
  name: '',
  email: '',
  phoneNumber: '',
};

@Component({
  name: 'in-client-form-client-contact',
  components: {
    InButton,
    InFieldMessage,
    InInput,
    InField,
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
export default class ClientFormClientContact extends Vue {
  @Prop({ required: false }) contact?: ClientContact;

  form: ClientContactForm = {
    ...initialForm,
  };

  @Watch('contact', {
    immediate: true,
    deep: true,
  })
  onClientChange(contact: ClientContact) {
    if (contact) {
      this.fillForm(contact);
    }
  }

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.$emit('save', this.form);
    this.close();
    this.reset();
  }

  close() {
    this.$emit('close');
  }

  reset() {
    this.form = {
      ...initialForm,
    };
    this.$v.$reset();
  }

  fillForm(contact: ClientContact) {
    this.form = {
      name: contact.name || '',
      email: contact.email || '',
      phoneNumber: contact.phoneNumber || '',
    };
  }
}
</script>
