<template>
  <in-card class="p-8 flex flex-col group border border-gray-10">
    <div class="flex justify-between items-center">
      <h6 class="text-h6 font-bold pb-2">
        {{ contact.name }}
      </h6>
      <div class="opacity-0 group-hover:opacity-100 flex items-center">
        <div class="mr-4 cursor-pointer" @click="remove()">
          <in-icon :name="Icons.TRASH" :height="16" :width="16" class="text-red" />
        </div>
        <div class="cursor-pointer" @click="edit()">
          <in-icon :name="Icons.EDIT" :height="16" :width="16" class="text-gray-70 transition hover:text-primary" />
        </div>
      </div>
    </div>
    <a :href="`mailto:${contact.email}`" class="text-body-XXS text-gray-60 transition hover:text-primary" target="_blank">
      {{ contact.email }}
    </a>
    <a v-if="contact.phoneNumber" :href="`tel:${contact.phoneNumber}`" class="text-body-XXS text-gray-60 transition hover:text-primary mt-2" target="_blank">
      {{ contact.phoneNumber }}
    </a>
  </in-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Icons } from '~/components/shared/constants/icons';
import InIcon from '~/components/shared/components/icon.vue';
import { ClientContact } from '~/components/features/clients/Client.model';
import InCard from '~/components/shared/components/card.vue';

@Component({
  name: 'in-client-contact-card',
  components: { InCard, InIcon },
})
export default class ClientContactCard extends Vue {
  @Prop({ required: true }) contact: ClientContact;

  Icons = Icons;

  edit() {
    this.$emit('edit');
  }

  remove() {
    this.$invois.alert({
      type: 'danger',
      title: 'Remove contact?',
      body: 'Are you sure you want to remove this contact?',
      confirm: {
        text: 'Delete',
        action: () => {
          this.$emit('remove');
        },
      },
      cancel: {
        text: 'Cancel',
        action: () => null,
      },
    });
  }
}
</script>
