export interface MeasurementOptions {
  foot: string
  inches?: Array<string>
}

export interface KeyValueSelects {
  key: string
  displayName: string
}

export const doorWidths: Array<string | MeasurementOptions> = [
  { foot: '08' }, { foot: '09' }, { foot: '10' }, { foot: '12' },
  { foot: '14' }, { foot: '16' }, { foot: '18' }
];

export const doorHeights: Array<MeasurementOptions> = [
  { foot: '06', inches: [ '0', '3', '6', '9' ] },
  { foot: '07', inches: [ '0', '3', '6', '9' ] },
  { foot: '08', inches: [ '0', '3', '6', '9' ] },
  { foot: '09', inches: [ '0', '3', '6', '9' ] },
  { foot: '10', inches: [ '0', '3', '6', '9' ] },
  { foot: '11', inches: [ '0', '3', '6', '9' ] },
  { foot: '12', inches: [ '0' ] }
];

export const stampPatterns: Array<KeyValueSelects> = [
  { key: 'FLUSH', displayName: 'Flush' },
  { key: 'TRAFALGAR', displayName: 'Trafalgar' },
  { key: 'BC', displayName: 'Bronte Creek' },
  { key: 'BCXL', displayName: 'Bronte Creek XL' },
  { key: 'SH', displayName: 'Sheridan' },
  { key: 'SHXL', displayName: 'Sheridan XL' }
];

export const panelColors: Array<string> = [
  'WHITE', 'SANDTONE', 'BLACK', 'BRONZE', 'NEW BROWN', 'STEEL GREY', 'NEW ALMOND', 'WALNUT'
];

export const frameSizes: Array<string> = [ 'Long', 'Short' ];

export const glazingTypeOptions: Array<KeyValueSelects> = [
  { key: '5', displayName: 'NO GLASS' },
  { key: '2', displayName: 'THERM - CLEAR/ CLEAR' },
  { key: '1', displayName: 'SINGLE - CLEAR/ CLEAR' },
  { key: '4', displayName: 'THERM - ACID ETCHED' }
];

export const insertTypeOptions: Array<KeyValueSelects> = [
  { key: '00', displayName: 'No Insert' },
  { key: '02', displayName: 'CASCADE' },
  { key: '06', displayName: 'STOCKTON' },
  { key: '10', displayName: 'ARCHED STOCKBRIDGE' },
  { key: '11', displayName: 'ARCHED STOCKTON' },
  { key: '12', displayName: 'STRAIGHT STOCKBRIDGE' },
  { key: '13', displayName: 'WATERTON' }
];

export const trackRadii: Array<number> = [ 12, 15 ];

export const trackTypeOptions: Array<KeyValueSelects> = [
  { key: 'standard-lift-bracket', displayName: 'STANDARD LIFT BRACKET MOUNT' },
  { key: 'standard-lift-angle', displayName: 'STANDARD LIFT ANGLE MOUNT' },
  { key: 'standard-lift-long-angle', displayName: 'STANDARD LIFT LONG ANGLE' },
  { key: 'vertical-lift-bracket', displayName: 'VERTICAL LIFT BRACKET MOUNT' },
  { key: 'vertical-lift-angle', displayName: 'VERTICAL LIFT ANGLE MOUNT' }
];

export const specialTrackRequestOptions: Array<KeyValueSelects> = [
  { key: 'high-lift-kits', displayName: 'HIGH LIFT KITS' }, { key: 'low-head-room-kits', displayName: 'LOW HEAD ROOM KITS' }
];
