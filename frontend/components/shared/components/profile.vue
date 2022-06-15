<template>
  <div
    class="c-profile"
    :data-overlay="overlay"
    :class="[type && `c-profile--${type}`, {'has-overlay': overlay}]"
    :style="{'height': `${size/16}rem`, 'width': `${size/16}rem`}"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <img v-if="src" alt="Profile" :src="src">
    <div
      v-else-if="name || surname"
      class="c-profile__initials"
      :style="{'font-size': `${(size/16)*0.4}rem`}"
    >
      <span>{{ name ? name.substr(0, 1) : '' }}{{ surname ? surname.substr(0, 1) : '' }}</span>
    </div>
    <img v-else-if="useDefault" alt="Profile" src="~/assets/images/avatar.png">
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-profile',
})
export default class InProfile extends Vue {
  @Prop({ required: false }) type?: string;

  @Prop({ required: true }) size: number;

  @Prop({ required: false }) src?: string;

  @Prop({ required: false }) name?: string;

  @Prop({ required: false }) surname?: string;

  @Prop({ required: false }) overlay?: string;

  @Prop({ required: false, default: false }) useDefault?: boolean;
}
</script>
