<template>
  <div>
    <in-global-toast />
    <in-global-alert />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import InGlobalToast from '~/components/shared/components/globals/toast.vue';
import InGlobalAlert from '~/components/shared/components/globals/alert.vue';

@Component({
  name: 'in-globals',
  components: {
    InGlobalAlert,
    InGlobalToast,
  },
})
export default class InGlobals extends Vue {}
</script>
