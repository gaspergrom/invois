<template>
  <article class="c-card py-8 px-12 shadow-1 flex items-center justify-between group">
    <div class="flex">
      <div class="pt-4 pr-8">
        <div data-tooltip="Low priority" class="h-8 w-8 rounded-full bg-green mt-2 c-tooltip c-tooltip--wrap" />
      </div>
      <div>
        <h5 class="text-h5 font-semibold">
          Frontend development
        </h5>
        <p class="text-body-XXS text-gray-70">
          20. jan 2022 - 1. dec 2022
        </p>
      </div>
    </div>
    <div class="flex items-center">
      <in-icon :name="Icons.DOLLAR_CIRCLE" :height="16" :width="16" class="text-green" />
      <p class="text-body-XS font-semibold text-gray-70 ml-4">
        1045,00€
      </p>
    </div>
    <div>
      <in-button type="danger" size="icon-small" class="opacity-0 group-hover:opacity-100 transition">
        <in-icon :name="Icons.TRASH" :height="16" :width="16" />
      </in-button>
      <in-button size="icon-small" class="opacity-0 group-hover:opacity-100 transition ">
        <in-icon :name="Icons.EDIT" :height="16" :width="16" />
      </in-button>
      <in-button type="secondary" size="icon-small">
        <in-icon :name="Icons.FILE" :height="16" :width="16" />
      </in-button>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Icons } from '~/components/shared/constants/icons';
import { Routes } from '~/components/shared/constants/routes';
import InIcon from '~/components/shared/components/icon.vue';
import InButton from '~/components/shared/components/button.vue';

@Component({
  name: 'in-client-project-card',
  components: { InButton, InIcon },
})
export default class ClientProjectCard extends Vue {
  Routes = Routes;

  Icons = Icons;
}
</script>
