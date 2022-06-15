<template>
  <div>
    <div
      v-for="el of new Array(count)"
      :key="el"
      class="c-loading"
      v-bind="$attrs"
      :style="{'height': height, 'width': width, ...additionalStyle}"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-loading',
})
export default class InLoading extends Vue {
  @Prop({ default: '100px' }) height?: string;

  @Prop({ default: '100%' }) width?: string;

  @Prop() additionalStyle?: Record<string, any>;

  @Prop({ default: 1 }) count?: number;
}
</script>
