<template>
  <div v-if="allowSvg" class="flex">
    <svg v-bind="$attrs" :height="`${height/16}rem`" :width="`${width/16}rem`">
      <use :xlink:href="`/icons/invois-icons.svg?#${name}`" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Icons } from '~/components/shared/constants/icons';

@Component({
  name: 'in-icon',
})
export default class InIcon extends Vue {
  @Prop({ required: true }) name?: string;

  @Prop({ required: true }) height?: number;

  @Prop({ required: true }) width?: number;

  @Prop({ required: false, default: false }) stretch?: boolean;

  get allowSvg() {
    return (Object.values(Icons as any) as string[]).includes(<string> this.name);
  }

  get items() {
    return Object.values(Icons as any).length;
  }
}
</script>
