<template>
  <div class='lib container'>
    <label :for='inputId'>{{ label }}</label>
    <br>
    <div class='field'>
      <input :id='inputId' v-model='searchQuery' ref='searchRef' @focusin.stop='isSearchingOptions = true' />
      <button v-if='isSearchingOptions' class='close' @click.prevent='closeSelections'>
        <close-icon></close-icon>
      </button>
    </div>

    <ul v-if='isSearchingOptions'>
      <li v-if='invalidOptionMessage' class='default'>
        <info-icon class='icon'></info-icon>
        <span>{{ invalidOptionMessage }}</span>
      </li>
      <li v-for='(option, index) in filteredOptions' :key='`option-${index}`' @click.prevent='selectOption(option)'>{{ option }}</li>
    </ul>

    <div class='pills-container'>
      <div class='selected-pill' v-for='(pillOption, index) in selected' :key='`pill-${index}`'>
        <p>{{ pillOption }}</p>
        <button @click.prevent='emit("remove", pillOption)'>
          <close-icon></close-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';

import CloseIcon from '@/assets/icons/close.svg';
import InfoIcon from '@/assets/icons/info.svg';

export interface Props {
  label: string
  options: Array<string>
  selected: Array<string>
}

export interface Emits {
  (eventName: 'add', option: string): void,
  (eventName: 'remove', option: string): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const inputId = ref(`input-${props.label.toLowerCase().replace(/ /g, '-')}`);
const searchRef = ref();
const searchQuery = ref<string>('');
const isSearchingOptions = ref<boolean>(false);

const filteredOptions = computed((): Array<string> => {
  return props.options.filter((option) => {
    if (props.selected.includes(option)) {
      return false;
    }

    return option.toLowerCase().includes(searchQuery.value.trim().toLowerCase());
  });
});

const invalidOptionMessage = computed((): string | undefined => {
  if (props.options.length === props.selected.length) {
    return 'All options selected';
  }

  if (searchQuery.value && !filteredOptions.value.length) {
    return 'Option not available';
  }

  return undefined;
});

function closeSelections(): void {
  isSearchingOptions.value = false;
  searchQuery.value = '';
}

function selectOption(option: string): void {
  searchQuery.value = '';
  emit('add', option);

  searchRef.value.focus();
}
</script>

<style lang='scss' scoped>
.container {
  .field {
    display: flex;
    align-items: center;
    height: 34px;
    border: 1px solid #CACED1;
    border-radius: 4px;

    input {
      font-size: 14px;
      line-height: 20px;
      padding: 6px 10px;
      width: 100%;
      border: none;

      &:focus {
        outline: none;
      }
    }

    button.close {
      width: 20px;
      height: 20px;
      background: none;
      border: 1px solid #CACED1;
      border-radius: 50%;
      margin-right: 10px;

      svg {
        margin-top: 1px;
        filter: invert(92%) sepia(7%) saturate(120%) hue-rotate(163deg) brightness(90%) contrast(90%);
      }
    }
  }

  ul {
    background-color: white;
    list-style: none;
    position: absolute;
    margin-top: 6px;
    padding: 5px 0;
    width: 300px;
    z-index: 1;
    border-radius: 6px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    overflow-y: scroll;
    max-height: 160px;

    li {
      padding: 10px 0 10px 10px;
      cursor: pointer;

      &:hover {
        background-color: #EFEFEF;
      }
    }

    li.default {
      display: flex;
      align-items: flex-start;

      .icon {
        margin-right: 4px;
      }
    }
  }

  .pills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;

    .selected-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: #EFEFEF;
      border-radius: 60px;

      p {
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        padding: 4px 0 4px 12px;
      }

      button {
        background: none;
        font-size: inherit;
        line-height: inherit;
        padding-right: 8px;
        height: 16px;

        svg {
          transform: scale(0.875);
        }
      }
    }
  }
}
</style>
