<template>
  <in-input
    type="date"
    :value="format(value)"
    :min="format(min)"
    :max="format(max)"
    v-bind="$attrs"
    v-on="listeners"
    @input="transform($event)"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { DATE_SERVICE } from '~/components/shared/services/date.service';
import InInput from '~/components/shared/components/input.vue';

@Component({
  name: 'in-input-date',
  components: { InInput },
})
export default class InInputDate extends Vue {
  @Prop({ required: true }) value: string;

  @Prop({ required: false }) min?: string;

  @Prop({ required: false }) max?: string;

  d = DATE_SERVICE.instance;

  f: string = 'YYYY-MM-DD';

  get listeners() {
    delete this.$listeners.input;
    return this.$listeners;
  }

  format(value: string) {
    if (value) {
      return this.d(value).format(this.f);
    }
    return value;
  }

  transform(value: string) {
    if (value) {
      const date = new Date(value).toISOString();
      this.$emit('input', date);
      return;
    }
    this.$emit('input', '');
  }
}
</script>
