<template>
  <in-input
    v-bind="$attrs"
    ref="input"
    v-model="query"
    :placeholder="placeholder"
    @keydown.enter.prevent="addSuggestionEnter()"
    @keydown.down="index += 1"
    @keydown.up="index -= 1"
    @input="onSearch"
    v-on="listeners"
  >
    <div v-if="searchTerm && searchTerm.length && suggestions.length" class="c-autocomplete">
      <div
        v-for="(suggestion, si) of suggestions.slice(0, 5)"
        :key="si"
        class="c-autocomplete__item"
        :class="{'is-active': index === si}"
        @click="selectSuggestion(suggestion)"
      >
        {{ display(suggestion) }}
      </div>
    </div>
  </in-input>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'nuxt-property-decorator';
import { debounce } from 'lodash';
import InInput from '~/components/shared/components/input.vue';

@Component({
  name: 'in-autocomplete',
  components: { InInput },
})
export default class InAutocomplete extends Vue {
  @Prop({ required: false }) placeholder?: string;

  @Prop({ required: false }) value?: string;

  @Prop({ required: true }) suggestions?: any[];

  @Prop({ required: false, default: false }) lazy?: boolean;

  @Prop({ required: false, default: () => (suggestion: any) => suggestion }) display?: (suggestion: any) => string;

  @Prop({ required: false }) custom?: boolean;

  query = '';

  searchTerm = '';

  index = -1;

  @Watch('value')
  onValueChange(val: any) {
    if (val) {
      if (this.display) {
        this.query = this.display(val);
      } else {
        this.query = val;
      }
    } else {
      this.query = '';
    }
  }

  public clearField() {
    this.searchTerm = '';
    this.query = '';
    this.index = -1;
    this.$emit('input', '');
  }

  get listeners() {
    delete this.$listeners.input;
    return this.$listeners;
  }

  get onSearch() {
    const self = this;
    return debounce((input: string) => {
      self.emitValue(input);
    }, this.lazy ? 300 : 0);
  }

  emitValue(value: string) {
    this.searchTerm = value || '';
    this.$emit('search', this.searchTerm);
    if (!this.searchTerm.length) {
      this.$emit('input', this.searchTerm);
    }
  }

  selectSuggestion(suggestion: any) {
    this.searchTerm = '';
    if (this.display) {
      this.query = this.display(suggestion);
    } else {
      this.query = suggestion;
    }
    this.index = -1;
    this.$emit('input', suggestion);
    this.$emit('selected', suggestion);
  }

  addSuggestionEnter() {
    if ((this.suggestions || []).length > 0) {
      if (this.index >= 0 && this.index < (this.suggestions || []).length) {
        this.selectSuggestion((this.suggestions || [])[this.index]);
      } else {
        this.selectSuggestion((this.suggestions || [])[0]);
      }
    } else if (this.custom && this.query && this.query.length) {
      this.selectSuggestion(this.query);
    }
  }

  focus() {
    (this.$refs as any).input.focus();
  }

  mounted() {
    if (this.value) {
      this.searchTerm = '';
      if (this.display) {
        this.query = this.display(this.value);
      } else {
        this.query = this.value;
      }
    }
  }
}
</script>
