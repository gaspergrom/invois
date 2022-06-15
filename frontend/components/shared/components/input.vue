<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      ref="input"
      :type="type"
      class="c-input"
      :class="[{'c-input--error': error, 'c-input--prefix': !!prefix,'c-input--suffix': !!suffix, 'c-input--action': actionText}, addClass]"
      :style="addstyle"
      :value="value"
      :tabindex="tabindex"
      v-on="listeners"
      @input="updateValue()"
    >

    <div v-if="prefix" class="c-input__prefix">
      {{ prefix }}
    </div>
    <div v-if="suffix" class="c-input__suffix">
      {{ suffix }}
    </div>
    <div
      v-if="actionText"
      class="c-input__action"
      @click="$emit('action', valueProxy)"
    >
      {{ actionText }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'in-input',
})
export default class InInput extends Vue {
  @Prop({
    required: false,
    default: 'text',
  }) type?: string;

  @Prop({ required: true }) value: any;

  @Prop({ required: false }) error?: boolean;

  @Prop({ required: false }) addstyle?: string;

  @Prop({ required: false }) addClass?: any;

  @Prop({ required: false }) defaultValue?: any;

  @Prop({ required: false }) prefix?: string;

  @Prop({ required: false }) suffix?: string;

  @Prop({ required: false }) actionText?: string;

  @Prop({ required: false }) tabindex?: string;

  valueProxy = '';

  get listeners() {
    delete this.$listeners.input;
    return this.$listeners;
  }

  updateValue() {
    this.valueProxy = (this.$refs.input as HTMLInputElement).value;
    this.$emit('input', this.valueProxy);
  }

  focus() {
    (this.$refs as any).input.focus();
  }

  mounted() {
    if (!this.value) {
      this.$emit('input', this.defaultValue);
    }
  }
}
</script>
