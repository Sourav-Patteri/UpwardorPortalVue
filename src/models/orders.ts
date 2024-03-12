export interface MeasurementOptions {
  foot: string
  inches?: Array<string>
}

export interface DoorMeasurementsOptions {
  widthOptions: Array<MeasurementOptions>
  heightOptions: Array<MeasurementOptions>
}

export interface KeyValueSelect {
  key: string
  displayName: string
}

export interface KeyDisplayNameValue extends KeyValueSelect {
  value: string;
}

export interface TrackOptions {
  trackRadiusOptions: Array<number>
  trackTypeOptions: Array<KeyValueSelect>
  specialTrackRequestOptions: Array<KeyValueSelect>
}

const doorWidths: Array<MeasurementOptions> = [
  { foot: '08' }, { foot: '09' }, { foot: '10' }, { foot: '12' },
  { foot: '14' }, { foot: '16' }, { foot: '18' }
];

const doorHeights: Array<MeasurementOptions> = [
  { foot: '06', inches: [ '0', '3', '6', '9' ] },
  { foot: '07', inches: [ '0', '3', '6', '9' ] },
  { foot: '08', inches: [ '0', '3', '6', '9' ] },
  { foot: '09', inches: [ '0', '3', '6', '9' ] },
  { foot: '10', inches: [ '0', '3', '6', '9' ] },
  { foot: '11', inches: [ '0', '3', '6', '9' ] },
  { foot: '12', inches: [ '0' ] }
];

export const doorMeasurementsOptions: DoorMeasurementsOptions = {
  widthOptions: doorWidths,
  heightOptions: doorHeights
};

export const stampPatterns: Array<KeyDisplayNameValue> = [
  { key: 'FLUSH', displayName: 'Flush', value: '0' },
  { key: 'TRAFALGAR', displayName: 'Trafalgar', value: '3' },
  { key: 'BC', displayName: 'Bronte Creek', value: '2' },
  { key: 'BCXL', displayName: 'Bronte Creek XL', value: '5' },
  { key: 'SH', displayName: 'Sheridan', value: '1' },
  { key: 'SHXL', displayName: 'Sheridan XL', value: '4' },
];

export const panelColors: Array<string> = [
  'WHITE', 'SANDTONE', 'BLACK', 'BRONZE', 'NEW BROWN', 'STEEL GREY', 'NEW ALMOND', 'WALNUT'
];

export const frameSizes: Array<string> = [ 'Long', 'Short' ];

export const glazingTypeOptions: Array<KeyValueSelect> = [
  { key: '5', displayName: 'NO GLASS' },
  { key: '2', displayName: 'THERM - CLEAR/ CLEAR' },
  { key: '1', displayName: 'SINGLE - CLEAR/ CLEAR' },
  { key: '4', displayName: 'THERM - ACID ETCHED' }
];

export const insertTypeOptions: Array<KeyValueSelect> = [
  { key: '00', displayName: 'No Insert' },
  { key: '02', displayName: 'CASCADE' },
  { key: '06', displayName: 'STOCKTON' },
  { key: '10', displayName: 'ARCHED STOCKBRIDGE' },
  { key: '11', displayName: 'ARCHED STOCKTON' },
  { key: '12', displayName: 'STRAIGHT STOCKBRIDGE' },
  { key: '13', displayName: 'WATERTON' }
];

const trackRadii: Array<number> = [ 12, 15 ];

const trackTypeOptions: Array<KeyValueSelect> = [
  { key: 'standard-lift-bracket', displayName: 'STANDARD LIFT BRACKET MOUNT' },
  { key: 'standard-lift-angle', displayName: 'STANDARD LIFT ANGLE MOUNT' },
  { key: 'standard-lift-long-angle', displayName: 'STANDARD LIFT LONG ANGLE' },
  { key: 'vertical-lift-bracket', displayName: 'VERTICAL LIFT BRACKET MOUNT' },
  { key: 'vertical-lift-angle', displayName: 'VERTICAL LIFT ANGLE MOUNT' }
];

const specialTrackRequestOptions: Array<KeyValueSelect> = [
  { key: 'high-lift-kits', displayName: 'HIGH LIFT KITS' }, { key: 'low-head-room-kits', displayName: 'LOW HEAD ROOM KITS' }
];

export const trackOptions: TrackOptions = {
  trackRadiusOptions: trackRadii,
  trackTypeOptions,
  specialTrackRequestOptions
};

export const hardwareExtras: Array<string> = [
  'Shafts', 'Springs', 'Struts', 'Hardware Kits', 'Weather Stripping',
  'Decorative Hardware Parts', 'Astragal and Bottom Retainer'
];
