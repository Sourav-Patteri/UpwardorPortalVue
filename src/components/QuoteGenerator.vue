<template>
  <form>
    <div class='form-row'>
      <form-input
        required
        class='input-small'
        label='Number of doors'
        placeholder='Number of doors'
        :value='doors'
        :min='1'
        :max='1000'
        @change='(...v) => updateDoorsValue(...v)'
      >
      </form-input>

      <div class='form-row__field-group flex-max door-size-select-group'>
        <p>Door measurements</p>
        <div>
          <form-select
            label='Door width'
            :options='displayDoorWidths'
            :selected='selectedDoorWidth'
            @select='(...v) => { selectedDoorWidth = v[0] }'
          >
          </form-select>

          <form-select
            label='Door height'
            :options='displayDoorHeights'
            :selected='selectedDoorHeight'
            @select='(...v) => { selectedDoorHeight = v[0] }'
          >
          </form-select>
        </div>
      </div>

      <control-input
        class='flex-small cb-panels'
        label='Panels Only (Bulk)'
        :checked='isPanelsOnlyOrder'
        @toggle='isPanelsOnlyOrder = !isPanelsOnlyOrder'
      >
      </control-input>
    </div>

    <div class='form-row'>
      <div class='form-row__field-group flex-max'>
        <p>Styles</p>

        <div>
          <form-select
            class='val-select'
            label='Stamp Pattern'
            :options='stampPatterns.map((s) => s.displayName)'
            :values='stampPatterns.map((s) => s.value)'
            :selected='selectedStampPattern'
            @select='(...v) => { selectedStampPattern = v[0] }'
          >
          </form-select>

          <form-select
            class='val-select'
            label='Panel Color'
            :options='panelColors.map((c) => c.displayName)'
            :values='panelColors.map((c) => c.value)'
            :selected='selectedPanelColor'
            @select='(...v) => { selectedPanelColor = v[0] }'
          >
          </form-select>
        </div>
      </div>

      <div class='form-row__field-group flex-small frame-radio-group'>
        <p>Frame Size</p>
        <div>
          <span v-for='size in frameSizes' :key='`s-${size}`'>
            <control-input
              radio-control
              :label='size'
              :checked='chosenFrameSize === size'
              :value='size'
              @check='(...v) => { chosenFrameSize = v[0] ?? frameSizes[0] }'
            >
            </control-input>
          </span>
        </div>
      </div>
    </div>

    <div class='form-row'>
      <div class='form-row__field-group window-cb-group'>
        <div class='group-gap-min'>
          <control-input label='Windows' :checked='hasWindows' @toggle='hasWindows = !hasWindows'>
          </control-input>

          <control-input label='Vertical Configuration' :disabled='!hasWindows' :checked='isVerticalConfiguration' @toggle='isVerticalConfiguration = !isVerticalConfiguration'>
          </control-input>
        </div>
      </div>

      <div v-if='hasWindows'>
        <form-select
          class='val-select'
          label='Glazing Type'
          :options='glazingTypeOptions.map((g) => g.displayName)'
          :values='glazingTypeOptions.map((g) => g.key)'
          :selected='selectedGlazingType'
          @select='(...v) => { selectedGlazingType = v[0] }'
        >
        </form-select>

        <form-select
          class='val-select'
          label='Insert Type'
          :options='insertTypeOptions.map((i) => i.displayName)'
          :values='insertTypeOptions.map((i) => i.key)'
          :selected='selectedInsertType'
          @select='(...v) => { selectedInsertType = v[0] }'
        >
        </form-select>
      </div>
    </div>

    <div class='form-row'>
      <div class='form-row__field-group'>
        <div>
          <control-input label='Are tracks required?' :checked='areTracksRequired' @toggle='areTracksRequired = !areTracksRequired'>
          </control-input>
        </div>

        <div v-if='areTracksRequired' class='guarded tracks-info'>
          <div class='track-radius'>
            <p>Track Radius</p>
            <div class='tracks-radio-group'>
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
          </div>

          <form-select
            class='track-type-select'
            label='Track Type'
            label-position-top
            :options='trackOptions.trackTypeOptions.map((t) => t.displayName)'
            :values='trackOptions.trackTypeOptions.map((t) => t.key)'
            :selected='selectedTrackType'
            @select='(...v) => { selectedTrackType = v[0] }'
          >
          </form-select>
        </div>
      </div>
    </div>

    <div v-if='areTracksRequired' class='form-row'>
      <div class='form-row__field-group'>
        <p>Special Track Request</p>
        <div>
          <div class='tracks-radio-group tracks-special'>
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
        <div v-if='chosenSpecialTrackRequest'>
          <form-input
          class='input-small'
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
      </div>
    </div>

    <div class='form-row'>
      <multiselect-typeahead
        label='Extras'
        :options='hardwareExtras'
        :selected='selectedExtras'
        @add='(...v) => updateSelectedExtras(...v, OptionsUpdateMethod.add)'
        @remove='(...v) => updateSelectedExtras(...v, OptionsUpdateMethod.remove)'
      >
      </multiselect-typeahead>
    </div>

    <div class='form-actions'>
      <button class='secondary' type='reset' @click.prevent='resetState'>Reset</button>
      <button class='primary' type='submit' :disabled='isSubmitDisabled' @click.prevent='handleFormSubmit'>Generate Quote</button>
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
  hardwareExtras,
  panelsTable,
  bottomRetainerParts
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
const chosenFrameSize = ref<string>(frameSizes[0]);
const selectedGlazingType = ref<string | null>(null);
const selectedInsertType = ref<string | null>(null);
const areTracksRequired = ref<boolean>(false);
const chosenTrackRadius = ref<number>(trackOptions.trackRadiusOptions[0]);
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

const panelPartNumber = computed((): string => {
  // Define the bulk panel prefix
  const bulkPanelPrefix = isPanelsOnlyOrder.value ? 'PN60' : 'PN65';

  // Extract door height suffix
  const doorHeightSuffix = selectedDoorHeight.value!;

  // Extract the first two characters of door width as door width suffix
  const doorWidthSuffix = selectedDoorWidth.value!.substring(0, 2);

  const panelWidths = Object.keys(panelsTable[doorHeightSuffix]);

  const partNumbers: string[] = [];

  panelWidths.forEach((panelWidth) => {
    const panelWidthSuffix = panelWidth.padStart(2, '0');
    const panelCount = panelsTable[doorHeightSuffix][panelWidth];

    if (panelCount > 0) {
      const partNumber = `${bulkPanelPrefix}-${panelWidthSuffix}${selectedStampPattern.value}${selectedPanelColor.value}-${doorWidthSuffix}00`;
      partNumbers.push(partNumber);
    }
  });

  return partNumbers.join(', ');
});

const isSubmitDisabled = computed((): boolean => {
  //FIXME: isSubmitDisabled does not reevaluate on input change

  /* if (!doors.value || !selectedDoorWidth.value || !selectedDoorHeight.value || !selectedStampPattern.value || !selectedPanelColor.value) {
    return true;
  }
  //  console.log(`has windows- ${hasWindows.value}, glaz- ${!selectedGlazingType.value} insert- ${!selectedInsertType.value}`)
  if (hasWindows.value && (!selectedGlazingType.value || !selectedInsertType.value)) {
    return true;
  }

  if (areTracksRequired.value && (!chosenTrackRadius.value || !selectedTrackType.value)) {
    return true;
  } */

  return false;
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

function handleFormSubmit(): void {
  if (isSubmitDisabled.value) {
    return;
  }
  
  //console.log(`selectedDoorWidth- ${selectedDoorWidth.value}`);
  const bottomRetainerPart = bottomRetainerParts[selectedDoorWidth.value!.substring(0, 2)];

  let frameTypeNum = chosenFrameSize.value === 'Short' ? 0 : 1;

  const glazingKitPart = `GK15-1${frameTypeNum}${selectedPanelColor.value}-00`;

  frameTypeNum = chosenFrameSize.value === 'Short' ? 19 : 18;
  const archedOrNot = (selectedInsertType.value === '10' || selectedInsertType.value === '11') ? 2 : 1;

  const insertPart = `GL${frameTypeNum}-${selectedInsertType.value}${archedOrNot}-00`;

  // TODO: Decide and put in how to display the information. Tabular form?
  console.log(`Your quote: Panel Part Numbers - ${panelPartNumber.value}. The Bottom Retainer part number is- ${bottomRetainerPart}. 
  The Astragal is PL10-00005-01. The Glazing Kit is ${glazingKitPart}. The Insert Part is ${insertPart}`);
}

function resetState(): void {
  doors.value = 1;
  isPanelsOnlyOrder.value = false;
  selectedDoorWidth.value = null;
  selectedDoorHeight.value = null;
  selectedStampPattern.value = null;
  selectedPanelColor.value = null;
  hasWindows.value = false;
  isVerticalConfiguration.value = false;
  chosenFrameSize.value = frameSizes[0];
  selectedGlazingType.value = null;
  selectedInsertType.value = null;
  areTracksRequired.value = false;
  chosenTrackRadius.value = trackOptions.trackRadiusOptions[0];
  selectedTrackType.value = null;
  chosenSpecialTrackRequest.value = null;
  extensionHeight.value = 1;
  selectedExtras.value = hardwareExtras;
}
</script>

<style scoped lang='scss'>
form {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .form-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    .form-row__field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;

      & > div {
        display: flex;
        justify-content: space-between;
        gap: 8px;

        & > * {
          flex: 1;
        }

        &.group-gap-min {
          justify-content: space-evenly;

          & > * {
            flex: auto;
          }
        }
      }

      .guarded {
        border: 1px solid #CACED1;
        border-radius: 6px;
        padding: 8px 12px;
      }

      .tracks-info {
        flex-wrap: wrap;
        gap: 16px;
      }
    }

    & > * {
      flex: 1;
    }

    .flex-max {
      flex: 1.5;
    }

    .flex-small {
      flex: 0.6;
    }

    .input-small {
      min-width: 200px;
      max-width: 250px;
    }

    .door-size-select-group {
      min-width: 410px;
    }

    .cb-panels {
      min-width: 150px;
      max-width: 155px;
    }

    .val-select {
      min-width: 230px;
    }

    .frame-radio-group {
      min-width: 150px;
      max-width: 155px;
    }

    .window-cb-group {
      min-width: 270px;
      max-width: 300px;
    }

    .tracks-radio-group {
      display: flex;
      justify-content: space-between;
    }

    .track-radius {
      min-width: 100px;
      max-width: 120px;
    }

    .track-type-select {
      min-width: 270px;
    }

    .tracks-special {
      min-width: 465px;
      max-width: 500px;
    }
  }

  .form-actions {
    display: flex;
    gap: 24px;

    button {
      background-color: white;
      border: 2px solid black;
      border-radius: 60px;
      padding: 8px 20px;
      font-size: 16px;

      $primary-color: #379392;

      &.primary {
        border-color: $primary-color;
        color: $primary-color;

        &:hover {
          background-color: $primary-color;
          color: white;
        }

        &:disabled {
          border-color: #CACED1;
          background-color: white;
          color: #CACED1;
          cursor: not-allowed;
        }
      }

      &.secondary {
        &:hover {
          background-color: #CACED1;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  form {
    .form-row {
      flex-direction: column;

      .form-row__field-group {
        & > div {
          flex-direction: column;
        }
      }

      .input-small {
        max-width: none;
      }

      .door-size-select-group {
        min-width: 0;
        max-width: none;
      }

      .frame-radio-group {

        & > div {
          flex-direction: row;
        }
      }

      .window-cb-group {
        min-width: 0;
        max-width: none;

        & > div {
          flex-direction: row;
        }
      }

      .tracks-info {
        flex-direction: column;
      }

      .track-type-select {
        min-width: 0;
        max-width: none;
      }

      .tracks-special {
        flex-direction: column;
        min-width: 0;
        max-width: none;
      }
    }
  }
}
</style>
