<template>
  <div class="flex">
    <main class="px-24 py-16">
      <section>
        <h3 class="text-h4 font-semibold pb-4">
          Client info
        </h3>

        <in-field title="Company name" class="mb-8">
          <in-input
            v-model="form.companyName"
            placeholder="Invois inc."
            autocomplete="no-complete"
            :error="$v.form.companyName.$dirty && $v.form.companyName.$invalid"
            @blur="$v.form.companyName.$touch()"
          />
          <in-field-message v-if="!$v.form.companyName.required && $v.form.companyName.$dirty">
            Please enter company name
          </in-field-message>
        </in-field>

        <div class="flex -mx-8">
          <div class="w-full w-3/4 px-8">
            <in-field title="Street address" class="mb-8">
              <in-input
                v-model="form.address"
                placeholder="Some street 21"
                autocomplete="no-complete"
                :error="$v.form.address.$dirty && $v.form.address.$invalid"
                @blur="$v.form.address.$touch()"
              />
              <in-field-message v-if="!$v.form.address.required && $v.form.address.$dirty">
                Please enter client street address
              </in-field-message>
            </in-field>
          </div>

          <div class="w-full w-1/4 px-8">
            <in-field title="Apt/Unit" class="mb-8">
              <in-input
                v-model="form.address2"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
        </div>
        <div class="flex -mx-8">
          <div class="w-full w-3/4 px-8">
            <in-field title="City" class="mb-8">
              <in-input
                v-model="form.addressCity"
                placeholder="New York"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
          <div class="w-full w-1/4 px-8">
            <in-field title="Postal code" class="mb-8">
              <in-input
                v-model="form.addressPostCode"
                placeholder="10000"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
        </div>
        <div class="flex -mx-8">
          <div class="w-full w-3/4 px-8">
            <in-field title="Country" class="mb-8">
              <in-input
                v-model="form.country"
                placeholder="United States"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
          <div class="w-full w-1/4 px-8">
            <in-field title="State" class="mb-8">
              <in-input
                v-model="form.addressState"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
        </div>
      </section>
      <section>
        <h3 class="text-h4 font-semibold pt-16 pb-4">
          Tax info
        </h3>
        <div class="flex -mx-8">
          <div class="w-full w-1/4 px-8">
            <in-field title="Tax ID Label" class="mb-8">
              <in-input
                v-model="form.taxIdLabel"
                placeholder="SI"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
          <div class="w-full w-3/4 px-8">
            <in-field title="Tax ID Number" class="mb-8">
              <in-input
                v-model="form.taxIdNumber"
                placeholder="12345678"
                autocomplete="no-complete"
              />
            </in-field>
          </div>
        </div>
      </section>
      <section v-if="!isEdit">
        <h3 class="text-h4 font-semibold pt-16 pb-4">
          Contact
        </h3>
        <in-field title="Contact Name" class="mb-8">
          <in-input
            v-model="form.contactName"
            placeholder="John Doe"
            autocomplete="no-complete"
          />
        </in-field>
        <in-field title="Contact Email" class="mb-8">
          <in-input
            v-model="form.contactEmail"
            type="email"
            placeholder="john.doe@gmail.com"
            autocomplete="no-complete"
            :error="$v.form.contactEmail.$dirty && $v.form.contactEmail.$invalid"
            @blur="$v.form.contactEmail.$touch()"
          />
          <in-field-message v-if="!$v.form.contactEmail.required && $v.form.contactEmail.$dirty">
            Please enter contact email
          </in-field-message>
          <in-field-message v-if="!$v.form.contactEmail.email && $v.form.contactEmail.$dirty">
            Please enter valid email
          </in-field-message>
        </in-field>
      </section>
    </main>
    <aside v-if="isEdit" class="py-24 px-16">
      <section>
        <div class="flex justify-between pb-8">
          <p class="text-gray-70 text-h6 font-semibold">
            Contacts
          </p>
          <a class="text-body-XXS text-primary font-semibold cursor-pointer" @click="isAddContactModalOpen = true">+
            Add</a>
        </div>
        <in-client-contact-card
          v-for="(contact, ci) of form.contacts"
          :key="ci"
          :contact="contact"
          class="mb-4"
          @remove="form.contacts.splice(ci, 1)"
          @edit="isEditContactModalOpen = ci"
        />
        <p v-if="form.contacts.length === 0" class="text-body-XXS font-normal">
          There are no contacts for this client
        </p>
      </section>
    </aside>
    <in-modal :open="isAddContactModalOpen" @close="isAddContactModalOpen = false">
      <template #header>
        <h3 class="text-h3 font-semibold">
          Add Contact
        </h3>
      </template>
      <div class="px-24 py-16">
        <in-client-form-client-contact @save="form.contacts.push($event)" @close="isAddContactModalOpen = false" />
      </div>
    </in-modal>
    <in-modal :open="isEditContactModalOpen !== null" @close="isEditContactModalOpen = null">
      <template #header>
        <h3 class="text-h3 font-semibold">
          Edit Contact
        </h3>
      </template>
      <div v-if="isEditContactModalOpen !== null" class="px-24 py-16">
        <in-client-form-client-contact
          :contact="form.contacts[isEditContactModalOpen]"
          @save="form.contacts[isEditContactModalOpen] = $event"
          @close="isEditContactModalOpen = null"
        />
      </div>
    </in-modal>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'nuxt-property-decorator';
import { email, required } from 'vuelidate/lib/validators';
import InField from '~/components/shared/components/field.vue';
import InInput from '~/components/shared/components/input.vue';
import InFieldMessage from '~/components/shared/components/field-message.vue';
import { API_SERVICE } from '~/components/shared/services/api.service';
import { Client, ClientContact } from '~/components/features/clients/Client.model';
import { Icons } from '~/components/shared/constants/icons';
import InModal from '~/components/shared/components/modal.vue';
import InClientFormClientContact from '~/components/features/clients/forms/client-contact.vue';
import InClientContactCard from '~/components/features/clients/components/client-contact-card.vue';

interface ClientForm {
  companyName: string;
  country: string;
  address: string;
  address2: string;
  addressCity: string;
  addressPostCode: string;
  addressState: string;
  taxIdLabel: string;
  taxIdNumber: string;
  contactName?: string;
  contactEmail?: string;
  contacts?: ClientContact[];
}

const initialForm: ClientForm = {
  companyName: '',
  country: '',
  address: '',
  address2: '',
  addressCity: '',
  addressPostCode: '',
  addressState: '',
  taxIdLabel: '',
  taxIdNumber: '',
  contactName: '',
  contactEmail: '',
  contacts: [],
};

@Component({
  name: 'in-client-form-client',
  components: {
    InClientContactCard,
    InClientFormClientContact,
    InModal,
    InFieldMessage,
    InInput,
    InField,
  },
  validations() {
    const self: any = this;
    return {
      form: {
        companyName: {
          required,
        },
        address: {
          required,
        },
        contactEmail: {
          required: !self.isEdit ? required : () => true,
          email: !self.isEdit ? email : () => true,
        },
        contacts: {
          required: self.isEdit ? required : () => true,
        },
      },
    };
  },
})
export default class ClientFormClient extends Vue {
  @Prop({ required: false }) client?: Client;

  isAddContactModalOpen = false;

  isEditContactModalOpen: number | null = null;

  Icons = Icons;

  form: ClientForm = {
    ...initialForm,
  };

  sending = false;

  @Watch('client', {
    immediate: true,
    deep: true,
  })
  onClientChange(client: Client) {
    if (client) {
      this.fillForm(client);
    }
  }

  get isEdit(): boolean {
    return !!this.client;
  }

  save() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.sending = true;
    (this.isEdit && this.client
      ? API_SERVICE.clients.updateClient(this.client.id, {
        ...this.form,
        contactName: undefined,
        contactEmail: undefined,
      })
      : API_SERVICE.clients.createClient({
        ...this.form,
        contacts: undefined,
      }))
      .then(() => {
        this.$emit('close');
        this.reset();
        this.$invois.toast({
          title: 'Success',
          body: this.isEdit && this.client ? 'Client successfully updated!' : 'Client successfully created!',
        });
      })
      .catch(() => {
        this.$invois.toast({
          title: 'Error',
          body: this.isEdit && this.client ? 'There was an error updating client' : 'There was an error creating client',
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

  fillForm(client: Client) {
    this.form = {
      ...initialForm,
      companyName: client.companyName || '',
      country: client.country || '',
      address: client.address || '',
      address2: client.address2 || '',
      addressCity: client.addressCity || '',
      addressPostCode: client.addressPostCode || '',
      addressState: client.addressState || '',
      taxIdLabel: client.taxIdLabel || '',
      taxIdNumber: client.taxIdNumber || '',
      contacts: client.contacts || [],
    };
  }
}
</script>
