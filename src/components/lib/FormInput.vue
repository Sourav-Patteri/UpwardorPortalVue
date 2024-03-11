<template>
  <div class='container'>
    <label :for='inputId'>{{ label }}</label>

    <div class='field'>
      <input
        class='field__input'
        :placeholder='placeholder'
        :value='value'
        :id='inputId'
        :min='min'
        :max='max'
        :required='required'
        @input='inputChangeHandler($event.target.value)'
      />
      <p v-if='suffix' class='field__suffix'>{{ suffix }}</p>
    </div>

    <small v-if='errorMessage' class='error'>{{ errorMessage }}</small>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';


export interface Props {
  label: string
  placeholder?: string
  value: number | null
  min: number
  max: number
  suffix?: string
  required?: boolean
}

interface Emits {
  (eventName: 'change', value: number): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const inputId = ref(`input-${props.label.toLowerCase().replaceAll(' ', '-')}`);

const errorMessage = computed((): string | undefined => {
  if (!props.value) {
    return 'Please enter a valid number';
  }

  if (props.value < props.min || props.value > props.max) {
    return 'Value out of bounds';
  }

  return undefined;
});

function inputChangeHandler(value: string): void {
  if (value === '' || value.match(/\D/g)) {
    emit('change', null);

    return;
  }

  emit('change', Number(value));
}
</script>

<style scoped lang='scss'>
.container {
  display: flex;
  flex-direction: column;
  gap: 2px;

  label {
    padding-bottom: 4px;
  }

  .field {
    display: flex;
    height: 34px;
    border: 1px solid black;
    border-radius: 4px;

    .field__input {
      width: 100%;
      padding: 6px 10px;
      border: none;

      &:focus {
        outline: none;
      }
    }

    .field__suffix {
      padding-right: 10px;
      line-height: 38px;
      color: #767676;
    }
  }

  small {
    padding-top: 2px;
    padding-left: 4px;
  }
}
</style>
