<template>
  <section>
    <div class="flex items-center group mb-8">
      <h4 class="text-h4 font-semibold group-hover:text-primary transition mr-4" @click="edit()">
        {{ client.companyName }}
      </h4>
      <div class="opacity-0 group-hover:opacity-100 transition mr-4 cursor-pointer" @click="edit()">
        <in-icon :name="Icons.EDIT" :height="16" :width="16" class="text-gray-70" />
      </div>
      <in-dropdown>
        <div class="opacity-0 group-hover:opacity-100 transition mr-8 cursor-pointer">
          <in-icon :name="Icons.TRASH" :height="16" :width="16" class="text-gray-70" />
        </div>
        <nav>
          <a @click="archive()">
            Archive
          </a>
          <a class="text-red" @click="remove()">
            Delete
          </a>
        </nav>
      </in-dropdown>
      <div class="opacity-0 group-hover:opacity-100 transition flex items-center cursor-pointer" @click="addProject()">
        <in-icon :name="Icons.PLUS" :height="16" :width="16" class="text-gray-70" />
        <span class="text-body-XXS font-semibold text-gray-70">Add project</span>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Icons } from '~/components/shared/constants/icons';
import { Routes } from '~/components/shared/constants/routes';
import InIcon from '~/components/shared/components/icon.vue';
import { Client, ClientState } from '~/components/features/clients/Client.model';
import InDropdown from '~/components/shared/components/dropdown.vue';
import { API_SERVICE } from '~/components/shared/services/api.service';

@Component({
  name: 'in-client-card',
  components: { InDropdown, InIcon },
})
export default class ClientCard extends Vue {
  @Prop({ required: true }) client: Client;

  Routes = Routes;

  Icons = Icons;

  edit() {
    this.$emit('edit');
  }

  archive() {
    this.$invois.alert({
      type: 'danger',
      title: 'Archive client?',
      body: 'Are you sure you want to archive this client?',
      confirm: {
        text: 'Archive',
        action: () => {
          API_SERVICE.clients.updateClient(this.client.id, {
            state: ClientState.ARCHIVE,
          })
            .then(() => {
              this.$invois.toast({
                title: 'Archived!',
                body: 'Client has been successfully archived.',
              });
              this.$emit('reload');
            })
            .catch(() => {
              this.$invois.toast({
                title: 'Error',
                body: 'There was an erorr archiving client',
              });
            });
        },
      },
      cancel: {
        text: 'Cancel',
        action: () => null,
      },
    });
  }

  remove() {
    this.$invois.alert({
      type: 'danger',
      title: 'Delete client?',
      body: 'Are you sure you want to delete this client? This will delete your client forever',
      confirm: {
        text: 'Delete',
        action: () => {
          API_SERVICE.clients.deleteClient(this.client.id)
            .then(() => {
              this.$invois.toast({
                title: 'Deleted!',
                body: 'Client has been successfully deleted.',
              });
              this.$emit('reload');
            })
            .catch(() => {
              this.$invois.toast({
                title: 'Error',
                body: 'There was an erorr archiving client',
              });
            });
        },
      },
      cancel: {
        text: 'Cancel',
        action: () => null,
      },
    });
  }

  addProject() {
    this.$emit('add-project');
  }
}
</script>
