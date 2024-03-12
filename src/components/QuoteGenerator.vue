<template>
  <form>
    <div class='form-value__container'>
      <form-input
        required
        label='Number of doors'
        placeholder='Number of doors'
        :value='doors'
        :min='1'
        :max='1000'
        @change='(...v) => updateDoorsValue(...v)'
      >
      </form-input>
    </div>

    <div class='form-value__container'>
      <control-input
        label='Panels Only (Bulk)'
        :checked='isPanelsOnlyOrder'
        @toggle='isPanelsOnlyOrder = !isPanelsOnlyOrder'
      >
      </control-input>
    </div>

    <div class='form-value__container'>
      <form-select
        label='Door width'
        :options='displayDoorWidths'
        :selected='selectedDoorWidth'
        @select='(...v) => { selectedDoorWidth = v[0] }'
      >
      </form-select>
    </div>

    <div class='form-value__container'>
      <form-select
        label='Door height'
        :options='displayDoorHeights'
        :selected='selectedDoorHeight'
        @select='(...v) => { selectedDoorHeight = v[0] }'
      >
      </form-select>
    </div>

    <div class='form-value__container'>
      <form-select
        label='Stamp Pattern'
        :options='stampPatterns.map((s) => s.displayName)'
        :values='stampPatterns.map((s) => s.key)'
        :selected='selectedStampPattern'
        @select='(...v) => { selectedStampPattern = v[0] }'
      >
      </form-select>
    </div>

    <div class='form-value__container'>
      <form-select
        label='Panel Color'
        :options='panelColors'
        :selected='selectedPanelColor'
        @select='(...v) => { selectedPanelColor = v[0] }'
      >
      </form-select>
    </div>

    <div class='form-value__container'> <!-- FIXME: Verify this -->
      <control-input
        label='Windows'
        :checked='hasWindows'
        @toggle='hasWindows = !hasWindows'
      >
      </control-input>

      <span v-if='hasWindows'>
      <control-input
        label='Vertical Configuration'
        :checked='isVerticalConfiguration'
        @toggle='isVerticalConfiguration = !isVerticalConfiguration'
      >
      </control-input>
      </span>
    </div>

    <div class='form-value__container'>
      <p>Frame Size:</p>
      <span v-for='size in frameSizes' :key='`s-${size}`'>
        <control-input
          radio-control
          :label='size'
          :checked='chosenFrameSize === size'
          :value='size'
          @check='(...v) => { chosenFrameSize = v[0] }'
        >
        </control-input>
      </span>
    </div>

    <div class='form-value__container'>
      <form-select
        label='Glazing Type'
        :options='glazingTypeOptions.map((g) => g.displayName)'
        :values='glazingTypeOptions.map((g) => g.key)'
        :selected='selectedGlazingType'
        @select='(...v) => { selectedGlazingType = v[0] }'
      >
      </form-select>
    </div>

    <div class='form-value__container'>
      <form-select
        label='Insert Type'
        :options='insertTypeOptions.map((i) => i.displayName)'
        :values='insertTypeOptions.map((i) => i.key)'
        :selected='selectedInsertType'
        @select='(...v) => { selectedInsertType = v[0] }'
      >
      </form-select>
    </div>

    <div class='form-value__container'>
      <control-input
        label='Are tracks required?'
        :checked='areTracksRequired'
        @toggle='areTracksRequired = !areTracksRequired'
      >
      </control-input>
    </div>

    <div v-if='areTracksRequired'>
      <div class='form-value__container'>
        <p>Track Radius</p>
        <span v-for='radius in trackOptions.trackRadiusOptions' :key='`tr-${radius}`'>
        <control-input
          radio-control
          :label='`${radius}`'
          :checked='chosenTrackRadius === radius'
          :value='`${radius}`'
          @check='(...v) => { chosenTrackRadius = Number(v[0]) }'
        >
        </control-input>
        </span>
      </div>

      <div class='form-value__container'>
      <form-select
        label='Track Type'
        label-position-top
        :options='trackOptions.trackTypeOptions.map((t) => t.displayName)'
        :values='trackOptions.trackTypeOptions.map((t) => t.key)'
        :selected='selectedTrackType'
        @select='(...v) => { selectedTrackType = v[0] }'
      >
      </form-select>
      </div>

      <div class='form-value__container'>
        <p>Special Track Request</p>

        <control-input
          radio-control
          label='Not required'
          :checked='chosenSpecialTrackRequest === null'
          :value='null'
          @check='(...v) => { chosenSpecialTrackRequest = v[0] }'
        >
        </control-input>
        <span v-for='specialTrack in trackOptions.specialTrackRequestOptions' :key='`str-${specialTrack.key}`'>
          <control-input
            radio-control
            :label='specialTrack.displayName'
            :checked='chosenSpecialTrackRequest === specialTrack.key'
            :value='specialTrack.key'
            @check='(...v) => { chosenSpecialTrackRequest = v[0] }'
          >
          </control-input>
        </span>
      </div>
    </div>

    <div class='form-value__container'>
      <form-input
        label='Extension Height'
        placeholder='Extension height'
        suffix='ft'
        :value='extensionHeight'
        :min='1'
        :max='15'
        @change='(...v) => updateExtensionHeightValue(...v)'
      >
      </form-input>
    </div>

    <div class='form-value__container'>
      <multiselect-typeahead
        label='Extras'
        :options='hardwareExtras'
        :selected='selectedExtras'
        @add='(...v) => updateSelectedExtras(...v, OptionsUpdateMethod.add)'
        @remove='(...v) => updateSelectedExtras(...v, OptionsUpdateMethod.remove)'
      >
      </multiselect-typeahead>
    </div>

    <div class='form-value__container'>
      <button>Generate Quote</button>
    </div>
  </form>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';

import MultiselectTypeahead from '@/components/lib/MultiselectTypeahead.vue';
import FormInput from '@/components/lib/FormInput.vue';
import FormSelect from '@/components/lib/FormSelect.vue';
import ControlInput from '@/components/lib/ControlInput.vue';
import {
  doorMeasurementsOptions,
  stampPatterns,
  panelColors,
  frameSizes,
  glazingTypeOptions,
  insertTypeOptions,
  trackOptions,
  hardwareExtras
} from '@/models/orders';


enum OptionsUpdateMethod {
  add = 'ADD',
  remove = 'REMOVE'
}

const doors = ref<number | null>(1);
const isPanelsOnlyOrder = ref<boolean>(false);
const selectedDoorWidth = ref<string | null>(null);
const selectedDoorHeight = ref<string | null>(null);
const selectedStampPattern = ref<string | null>(null);
const selectedPanelColor = ref<string | null>(null);
const hasWindows = ref<boolean>(false);
const isVerticalConfiguration = ref<boolean>(false);
const chosenFrameSize = ref<string | null>(null);
const selectedGlazingType = ref<string | null>(null);
const selectedInsertType = ref<string | null>(null);
const areTracksRequired = ref<boolean>(false);
const chosenTrackRadius = ref<number | null>(null);
const selectedTrackType = ref<string | null>(null);
const chosenSpecialTrackRequest = ref<string | null>(null);
const extensionHeight = ref<number | null>(1);
const selectedExtras = ref<Array<string>>(hardwareExtras);

const displayDoorWidths = computed((): Array<string> => {
  return doorMeasurementsOptions.widthOptions.map((val) => `${val.foot}'`);
});

const displayDoorHeights = computed((): Array<string> => {
  const heights: Array<string> = [];

  doorMeasurementsOptions.heightOptions.forEach((heightOptions) => {
    const foot = `${heightOptions.foot}'`;

    const options = heightOptions.inches?.map((inch) => `${foot}${inch}"`);

    if (options) {
      heights.push(...options);
    } else {
      heights.push(foot);
    }
  });

  return heights;
});

function updateDoorsValue(value: number | null): void {
  doors.value = value;
}

function updateExtensionHeightValue(value: number | null): void {
  extensionHeight.value = value;
}

function updateSelectedExtras(extra: string, updateMethod: OptionsUpdateMethod): void {
  switch (updateMethod) {
    case OptionsUpdateMethod.add:
      selectedExtras.value.push(extra);
      break;

    case OptionsUpdateMethod.remove:
      selectedExtras.value = selectedExtras.value.filter((v) => v !== extra);
  }
}
</script>

<style scoped lang='scss'>
</style>
