<router>
{name: 'clients'}
</router>

<template>
  <div>
    <div class="container pt-24">
      <div class="flex justify-between">
        <div>
          <in-search placeholder="Search clients and projects..." style="min-width: 320px" />
        </div>
        <div class="flex">
          <in-button type="secondary" size="small" class="mr-8" @click="isCreateClientModalOpen = true">
            + Add Client
          </in-button>
          <in-button size="small" @click="isCreateProjectModalOpen = true">
            + Add Project
          </in-button>
        </div>
      </div>
      <div class="pt-32">
        <in-client-card
          v-for="client of overview"
          :key="client.id"
          :client="client"
          class="mb-32"
          @reload="getOverview()"
          @edit="isEditClientModalOpen = client"
        >
          <in-client-project-card class="rounded border-b border-gray-10" />
        </in-client-card>
        <div v-if="overview.length === 0">
          <h4 class="text-h4 font-semibold mb-8">
            There are no clients yet.
          </h4>
          <in-button size="medium" @click="isCreateClientModalOpen = true">
            Add client
          </in-button>
        </div>
      </div>
    </div>
    <in-side-modal
      :open="isCreateClientModalOpen"
      title="Add Client"
      cancel-text="Cancel"
      confirm-text="Create Client"
      :is-confirm-disabled="$refs.clientCreateForm && $refs.clientCreateForm.$v.$invalid"
      :is-confirm-loading="$refs.clientCreateForm && $refs.clientCreateForm.sending"
      @close="isCreateClientModalOpen = false"
      @cancel="isCreateClientModalOpen = false"
      @confirm="$refs.clientCreateForm.save()"
    >
      <in-client-form-client ref="clientCreateForm" @close="isCreateClientModalOpen = false; getOverview()" />
    </in-side-modal>
    <in-side-modal
      :open="isEditClientModalOpen !== null"
      title="Edit Client"
      cancel-text="Cancel"
      confirm-text="Save"
      :is-confirm-disabled="$refs.clientEditForm && $refs.clientEditForm.$v.$invalid"
      :is-confirm-loading="$refs.clientEditForm && $refs.clientEditForm.sending"
      @close="isEditClientModalOpen = null"
      @cancel="isEditClientModalOpen = null"
      @confirm="$refs.clientEditForm.save()"
    >
      <in-client-form-client ref="clientEditForm" :client="isEditClientModalOpen" @close="isEditClientModalOpen = null; getOverview()" />
    </in-side-modal>
    <in-side-modal
      :open="isCreateProjectModalOpen"
      title="Add Project"
      cancel-text="Cancel"
      confirm-text="Create Project"
      @close="isCreateProjectModalOpen = false"
      @cancel="isCreateProjectModalOpen = false"
      @confirm="$refs.projectCreateForm.save()"
    >
      <in-client-form-project ref="projectCreateForm" @close="isCreateProjectModalOpen = false; getOverview()" />
    </in-side-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import InClientCard from '~/components/features/clients/components/client-card.vue';
import InClientProjectCard from '~/components/features/clients/components/project-card.vue';
import InSearch from '~/components/shared/components/search.vue';
import InButton from '~/components/shared/components/button.vue';
import InSideModal from '~/components/shared/components/side-modal.vue';
import InClientFormClient from '~/components/features/clients/forms/client.vue';
import { API_SERVICE } from '~/components/shared/services/api.service';
import { Client } from '~/components/features/clients/Client.model';
import InClientFormProject from '~/components/features/clients/forms/project.vue';

@Component({
  components: {
    InClientFormProject,
    InClientFormClient,
    InSideModal,
    InButton,
    InSearch,
    InClientProjectCard,
    InClientCard,
  },
  layout: 'dashboard',
})
export default class Clients extends Vue {
  isCreateClientModalOpen = false;

  isEditClientModalOpen: Client | null = null;

  isCreateProjectModalOpen = false;

  overview: Client[] = [];

  getOverview() {
    API_SERVICE.clients.getOverview(1)
      .then(({ data }) => {
        this.overview = data;
      })
      .catch(() => {
        this.$invois.toast({
          title: 'Error',
          body: 'There was an error loading clients',
        });
      });
  }

  mounted() {
    this.getOverview();
  }
}
</script>
