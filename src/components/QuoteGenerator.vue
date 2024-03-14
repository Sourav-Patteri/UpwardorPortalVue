<template>
  <form @submit.prevent='handleFormSubmit'>
    <div class='form-value__container'>
      <label for='num-of-doors'>Number of doors:</label>
      <input v-model='doors' type='number' min='1' max='1000' id='num-of-doors' required/>
      <small>Warning message</small>
    </div>

    <div class='form-value__container'>
      <input id='bulk-panels' type='checkbox' v-model='isPanelsOnlyOrder'/>
      <label for='bulk-panels'>Panels Only (Bulk)</label>
    </div>

    <div class='form-value__container'>
      <label for='door-width'>Door width:</label>
      <select v-model='selectedDoorWidth' id='door-width'>
        <option v-for='width in displayDoorWidths' :key='`w-key-${width}`'>{{ width }}</option>
      </select>
    </div>

    <div class='form-value__container'>
      <label for='door-height'>Door height:</label>
      <select v-model='selectedDoorHeight' id='door-height'>
        <option v-for='height in displayDoorHeights' :key='`h-key-${height}`'>{{ height }}</option>
      </select>
    </div>

    <div class='form-value__container'>
      <label for='stamp-pattern'>Stamp Pattern:</label>
      <select v-model='selectedStampPattern' id='stamp-pattern'>
        <option v-for='pattern in stampPatterns' :key='pattern.key' :value='pattern.value'>{{ pattern.displayName }}</option>
      </select>
    </div>

    <div class='form-value__container'>
      <label for='panel-color'>Panel Color</label>
      <select v-model='selectedPanelColor' id='panel-color'>
        <option v-for='color in panelColors' :key='color.key' :value='color.value' >{{ color.displayName }}</option>
      </select>
    </div>

    <div class='form-value__container'> <!-- FIXME: Verify this -->
      <input id='has-windows' type='checkbox' v-model='hasWindows'/>
      <label for='has-windows'>Windows</label>

      <span v-if='hasWindows'>
        <input id='is-vertical-configuration' type='checkbox' v-model='isVerticalConfiguration'/>
        <label for='is-vertical-configuration'>Vertical Configuration</label>
      </span>
    </div>

    <div class='form-value__container'>
      <p>Frame Size:</p>
      <span v-for='size in frameSizes' :key='`s-${size}`'>
        <input :id='`frame-size-${size}`' type='radio' :value='size.toLowerCase()' v-model='chosenFrameSize'>
        <label :for='`frame-size-${size}`'>{{ size }}</label>
      </span>
    </div>

    <div class='form-value__container'>
      <label for='glazing-type'>Glazing Type</label>
      <select v-model='selectedGlazingType' id='glazing-type'>
        <option v-for='gtype in glazingTypeOptions' :key='`g-type-${gtype.key}`' :value='gtype.key'>{{ gtype.displayName }}</option>
      </select>
    </div>

    <div class='form-value__container'>
      <label for='insert-type'>Insert Type</label>
      <select v-model='selectedInsertType' id='insert-type'>
        <option v-for='itype in insertTypeOptions' :key='`i-type-${itype.key}`' :value='itype.key'>{{ itype.displayName }}</option>
      </select>
    </div>

    <div class='form-value__container'>
      <input id='are-tracks-req' type='checkbox' v-model='areTracksRequired'/>
      <label for='are-tracks-req'>Are tracks required?</label>
    </div>

    <div v-if='areTracksRequired'>
      <div class='form-value__container'>
        <p>Track Radius</p>
        <span v-for='radius in trackOptions.trackRadiusOptions' :key='`tr-${radius}`'>
          <input :id='`track-radius-${radius}`' type='radio' :value='radius' v-model='chosenTrackRadius' />
          <label :for='`track-radius-${radius}`'>{{ radius }}</label>
        </span>
      </div>

      <div class='form-value__container'>
        <label for='track-type'>Track Type</label>
        <select v-model='selectedTrackType' id='track-type'>
          <option v-for='trackType in trackOptions.trackTypeOptions' :key='`t-type-${trackType.key}`' :value='trackType.key'>{{ trackType.displayName }}</option>
        </select>
      </div>

      <div class='form-value__container'>
        <p>Special Track Request</p>

        <input id='str-none' type='radio' :value='null' v-model='chosenSpecialTrackRequest' />
        <label for='str-none'>Not required</label>
        <span v-for='specialTrack in trackOptions.specialTrackRequestOptions' :key='`str-${specialTrack.key}`'>
          <input :id='`str-${specialTrack.key}`' type='radio' :value='specialTrack.key' v-model='chosenSpecialTrackRequest' />
          <label :for='`str-${specialTrack.key}`'>{{ specialTrack.displayName }}</label>
        </span>
      </div>
    </div>

    <div class='form-value__container'>
      <span class='ip-with-suffix'>
        <label for='extension-height'>Extension Height</label>
        <input id='extension-height' type='number' min='1' max='15' v-model='extensionHeight' />
        <small class='suffix'>ft</small>
      </span>
      <small>Warning message</small>
    </div>

    <div class='form-value__container'>
      <p>Extras:</p>
      <div>
        <span v-for='(extra, index) in selectedExtras' :key='`selected-extra-${index}`'>
          <p class='selected-list'>
            <span>{{ extra }}</span>
            <button>x</button> <!-- TODO: Remove from list -->
          </p>
        </span>
        <input type='text' /> <!-- TODO: Implement Typeahead -->
      </div>
      <ul v-if='isExtrasListOpen'>
        <li v-for='(extra, index) in hardwareExtras' :key='`extras-${index}`' @click='updateExtrasList(extra)'>{{ extra }}</li>
      </ul>
    </div>

    <div class='form-value__container'>
      <button>Generate Quote</button>
    </div>
  </form>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue';

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


const doors = ref<number>(1);
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
const selectedTrackRadius = ref<number | null>(null);
const chosenTrackRadius = ref<number | null>(null);
const selectedTrackType = ref<string | null>(null);
const chosenSpecialTrackRequest = ref<string | null>(null);
const extensionHeight = ref<number>(1);
const selectedExtras = ref<Array<string>>(hardwareExtras);
const isExtrasListOpen = ref<boolean>(false);

const displayDoorWidths = computed((): Array<string> => {
  return doorMeasurementsOptions.widthOptions.map((val) => `${val.foot}'`);
});

const displayDoorHeights = computed((): Array<string> => {
  const heights = [];

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

function updateExtrasList(extra: string): void {
  selectedExtras.value.push(extra);
}

function handleFormSubmit() : void {
 
    // Call function to calculate quote
    const panelPartNumber = computed((): string => {
      
    // Define the bulk panel prefix
    const bulkPanelPrefix = isPanelsOnlyOrder.value ? 'PN60' : 'PN65';

    // Extract door height suffix
    const doorHeightSuffix = selectedDoorHeight.value;

    // Extract the first two characters of door width as door width suffix
    const doorWidthSuffix = selectedDoorWidth.value.substring(0, 2);

    const panelWidths = Object.keys(panelsTable[doorHeightSuffix] || {});

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

  const bottomRetainerPart = bottomRetainerParts[selectedDoorWidth.value.substring(0, 2)];

  let frameTypeNum = chosenFrameSize.value === 'short' ? 0 : 1;  

  const glazingKitPart = `GK15-1${frameTypeNum}${selectedPanelColor.value}-00`

  // TODO: Decide and put in how to display the information. Tabular form?
  console.log(`Your quote: Panel Part Numbers - ${panelPartNumber.value}. The Bottom Retainer part number is- ${bottomRetainerPart}. The Astragal is PL10-00005-01. The Glazing Kit is ${glazingKitPart}`);
};

</script>

<style scoped lang='scss'>
</style>