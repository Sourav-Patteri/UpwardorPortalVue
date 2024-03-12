<template>
  <form @submit.prevent="handleFormSubmit">
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
        <option v-for='pattern in stampPatterns' :key='pattern.key' :value='pattern.key'>{{ pattern.displayName }}</option>
      </select>
    </div>

    <div class='form-value__container'>
      <label for='panel-color'>Panel Color</label>
      <select v-model='selectedPanelColor' id='panel-color'>
        <option v-for='color in panelColors' :key='color'>{{ color }}</option>
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
  hardwareExtras
} from '@/models/orders';


const doors = ref<number>(1);
const isPanelsOnlyOrder = ref<boolean>(false);
const selectedDoorWidth = ref<string | null>(null);
const selectedDoorHeight = ref<string>("");
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

const handleFormSubmit = () => {
 
  console.log('Form submitted!');
  console.log('Number of doors:', doors.value);
  console.log('Is Panels Only Order:', isPanelsOnlyOrder.value);


  // Call function to calculate quote
  calculateQuote();

};

// Helper function to get the stamp pattern suffix
function getStampPatternSuffix(stampPattern: string | null): string {
  const suffixes: Record<string, string> = {
    FLUSH: '0',
    SH: '1',
    BC: '2',
    TRAFALGAR: '3',
    SHXL: '4',
    BCXL: '5',
  };

  return suffixes[stampPattern] || '';
}

// Helper function to get the panel color suffix
function getPanelColorSuffix(panelColor: string | null): string {
  const suffixes: Record<string, string> = {
    WHITE: '00',
    SANDTONE: '04',
    BLACK: '05',
    BRONZE: '06',
    'NEW BROWN': '10',
    'STEEL GREY': '20',
    'NEW ALMOND': '30',
    WALNUT: '51',
    HAZELWOOD: '40',
  };

  return suffixes[panelColor] || '';
}

const generatePanelPartNumber = (
  bulkPanelsValue: boolean,
  doorHeightValue: string,
  doorWidthValue: string | null,
  numberOfDoorsValue: number | null,
  stampPatternValue: string | null,
  panelColorValue: string | null
): string => {
  // Define the bulk panel prefix
  const bulkPanelPrefix = bulkPanelsValue === true ? 'PN60' : 'PN65';

  // Extract door height suffix
  const doorHeightSuffix = doorHeightValue;

  // Extract the first two characters of door width as door width suffix
  const doorWidthSuffix = doorWidthValue.substring(0, 2);

  const panelsTable: Record<string, Record<string, number>> = {
      "06'0": { "18": 0, "21": 0, "24": 3 },
      "06'3": { "18": 3, "21": 1, "24": 0 },
      "06'6": { "18": 2, "21": 2, "24": 0 },
      "06'9": { "18": 1, "21": 3, "24": 0 },
      "07'0": { "18": 0, "21": 4, "24": 0 },
      "07'3": { "18": 0, "21": 3, "24": 1 },
      "07'6": { "18": 0, "21": 2, "24": 2 },
      "07'9": { "18": 0, "21": 1, "24": 3 },
      "08'0": { "18": 0, "21": 0, "24": 4 },
      "08'3": { "18": 2, "21": 3, "24": 0 },
      "08'6": { "18": 1, "21": 4, "24": 0 },
      "08'9": { "18": 0, "21": 5, "24": 0 },
      "09'0": { "18": 0, "21": 4, "24": 1 },
      "09'3": { "18": 0, "21": 3, "24": 2 },
      "09'6": { "18": 0, "21": 2, "24": 3 },
      "09'9": { "18": 0, "21": 1, "24": 4 },
      "10'0": { "18": 0, "21": 0, "24": 5 },
      "10'3": { "18": 1, "21": 5, "24": 0 },
      "10'6": { "18": 0, "21": 6, "24": 0 },
      "10'9": { "18": 0, "21": 5, "24": 1 },
      "11'0": { "18": 0, "21": 4, "24": 2 },
      "11'3": { "18": 0, "21": 3, "24": 3 },
      "11'6": { "18": 0, "21": 2, "24": 4 },
      "11'9": { "18": 0, "21": 1, "24": 5 },
      "12'0": { "18": 0, "21": 0, "24": 6 }
  };
  console.log(`door height- ${doorHeightSuffix}`)
  const panelWidths = Object.keys(panelsTable[doorHeightSuffix] || {});
  const partNumbers: string[] = [];
 // FIXME: PanelWidths not populating as expected.
 // console.log(`panelwidths- ${Object.keys(panelsTable[doorHeightSuffix] || {})}`);

  panelWidths.forEach((panelWidth) => {
    const panelWidthSuffix = panelWidth.padStart(2, '0');
    const panelCount = panelsTable[doorHeightSuffix][panelWidth];
    //console.log(`panelCount- ${panelCount}`)//testing
    if (panelCount > 0) {
      const partNumber = `${bulkPanelPrefix}-${panelWidthSuffix}${getStampPatternSuffix(stampPatternValue)}${getPanelColorSuffix(panelColorValue)}-${doorWidthSuffix}00`;
      partNumbers.push(partNumber);
    }
  });

  console.log(`Your quote: Panel Part Numbers - ${partNumbers.join(', ')}.`)
  return partNumbers.join(', ');

};

const calculateQuote = () => {
  const panelPartNumber = generatePanelPartNumber(isPanelsOnlyOrder.value, selectedDoorHeight.value, selectedDoorWidth.value, doors.value, selectedStampPattern.value, selectedPanelColor.value);
};

</script>

<style scoped lang='scss'>
</style>
