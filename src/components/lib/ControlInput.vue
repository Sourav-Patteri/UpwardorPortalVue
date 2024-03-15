<template>
  <div class='lib container'>
    <input
      :id='controlId'
      :type='radioControl ? "radio" : "checkbox"'
      :checked='checked'
      :disabled='disabled'
      @click='handleClick'
    />

    <label :for='controlId' :class='{ "disabled": disabled }'>{{ label }}</label>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';


export interface Props {
  label: string
  checked: boolean
  value?: string | null
  disabled?: boolean
  radioControl?: boolean
}

export interface Emits {
  (eventName: 'toggle'): void,
  (eventName: 'check', value: string | null): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const controlId = ref(`control-${props.label.toLowerCase().replace(/ /g, '-')}`);

function handleClick(): void {
  if (props.disabled) {
    return;
  }

  return props.radioControl ? emit('check', props.value ?? null) : emit('toggle');
}
</script>

<style lang='scss' scoped>
.container {
  display: grid;
  grid-template-columns: 16px auto;
  align-content: end;
  gap: 8px;

  input {
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    margin: 0;
    display: grid;
    place-content: center;
    width: 18px;
    height: 18px;
    border: 1px solid currentColor;
    color: #CACED1;
    transform: translateY(-1px);

    &::before {
      content: "";
      width: 10px;
      height: 10px;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 16px 16px black;
      background-color: black;
    }

    &:hover {
      background-color: #EFEFEF;
    }

    &:focus {
      outline: 2px solid #EFEFEF;
    }

    &:disabled {
      cursor: not-allowed;

      &:hover {
        background-color: white;
      }
    }
  }

  input[type="checkbox"] {
    border-radius: 4px;

    &::before {
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform-origin: bottom left;
    }

    &:checked::before {
      transform: scale(1);
    }
  }

  input[type="radio"] {
    border-radius: 50%;

    &::before {
      border-radius: 50%;
      transform: scale(0);
    }

    &:checked::before {
      transform: scale(1);
    }
  }

  label {
    cursor: pointer;

    &.disabled {
      color: #CACED1;
      cursor: not-allowed;
    }
  }
}
</style>
