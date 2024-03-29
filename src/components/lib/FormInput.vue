<template>
  <div class='lib container'>
    <label :for='inputId'>{{ label }}</label>

    <div class='field'>
      <input
        class='field__input'
        type='number'
        :placeholder='placeholder'
        :value='value'
        :id='inputId'
        :min='min'
        :max='max'
        :required='required'
        :disabled='disabled'
        @input='inputChangeHandler(($event.target as HTMLInputElement)?.value)'
      />
      <p v-if='suffix' class='field__suffix'>{{ suffix }}</p>
    </div>

    <small v-if='errorMessage' class='error message'>
      <span>{{ errorMessage }}</span>
    </small>
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
  disabled?: boolean
}

interface Emits {
  (eventName: 'change', value: number | null): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const inputId = ref(`input-${props.label.toLowerCase().replace(/ /g, '-')}`);

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
  if (props.disabled) {
    return;
  }

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
    border: 1px solid #CACED1;
    border-radius: 4px;

    .field__input {
      width: 100%;
      padding: 6px 10px;
      border: none;

      &:focus {
        outline: none;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    input[type='number'] {
      appearance: textfield;
      -moz-appearance: textfield;
      -webkit-appearance: textfield;
    }

    .field__suffix {
      padding-right: 10px;
      line-height: 38px;
      color: #767676;
    }
  }

  small.message {
    position: absolute;

    span {
      position: relative;
      top: 65px;
      left: 4px;
    }
  }
}
</style>
