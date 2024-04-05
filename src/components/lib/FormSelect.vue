<template>
  <div class='lib container' :class='{ "flex-col": labelPositionTop }'>
    <label :for='selectId'>{{ label }}</label>

    <div class='select-container'>
      <select :id='selectId' :value='selected' :disabled='disabled' @change.prevent.stop='selectOption(($event.target as HTMLSelectElement).value)'>
        <option
          v-for='(opt, index) in displayOptions'
          :key='`${selectId}-${index}`'
          :value='opt[1]'
        >
          {{ opt[0] }}
        </option>
      </select>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';


export interface Props {
  label: string
  labelPositionTop?: boolean
  options: Array<string>
  values?: Array<string>
  selected: string | null
  disabled?: boolean
}

export interface Emits {
  (eventName: 'select', value: string | null): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectId = ref(`select-${props.label.toLowerCase().replace(/ /g, '-')}`);

// Provides select-options in [ option, value ] format
const displayOptions = computed((): Map<string, string> => {
  const opts = new Map<string, string>();

  props.options.forEach((opt, optIndex) => {
    const correspondingValue = props.values ? props.values[optIndex] : opt;
    opts.set(opt, correspondingValue);
  });

  return opts;
});

function selectOption(option: string): void {
  if (props.disabled) {
    return;
  }

  emit('select', option);
}
</script>

<style lang='scss' scoped>
.container {
  display: flex;
  align-items: end;
  gap: 6px;

  &.flex-col {
    align-items: normal;
    flex-direction: column;
  }

  .select-container {
    flex: 1;
    position: relative;

    select {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      height: 34px;
      padding: 6px 10px;
      background-color: #FFF;
      border: 1px solid #CACED1;
      border-radius: 4px;
      color: #000;
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
}
</style>
