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

export const panelsTable: Record<string, Record<string, number>> = {
  '06\'0"': { '18': 0, '21': 0, '24': 3 },
  '06\'3"': { '18': 3, '21': 1, '24': 0 },
  '06\'6"': { '18': 2, '21': 2, '24': 0 },
  '06\'9"': { '18': 1, '21': 3, '24': 0 },
  '07\'0"': { '18': 0, '21': 4, '24': 0 },
  '07\'3"': { '18': 0, '21': 3, '24': 1 },
  '07\'6"': { '18': 0, '21': 2, '24': 2 },
  '07\'9"': { '18': 0, '21': 1, '24': 3 },
  '08\'0"': { '18': 0, '21': 0, '24': 4 },
  '08\'3"': { '18': 2, '21': 3, '24': 0 },
  '08\'6"': { '18': 1, '21': 4, '24': 0 },
  '08\'9"': { '18': 0, '21': 5, '24': 0 },
  '09\'0"': { '18': 0, '21': 4, '24': 1 },
  '09\'3"': { '18': 0, '21': 3, '24': 2 },
  '09\'6"': { '18': 0, '21': 2, '24': 3 },
  '09\'9"': { '18': 0, '21': 1, '24': 4 },
  '10\'0"': { '18': 0, '21': 0, '24': 5 },
  '10\'3"': { '18': 1, '21': 5, '24': 0 },
  '10\'6"': { '18': 0, '21': 6, '24': 0 },
  '10\'9"': { '18': 0, '21': 5, '24': 1 },
  '11\'0"': { '18': 0, '21': 4, '24': 2 },
  '11\'3"': { '18': 0, '21': 3, '24': 3 },
  '11\'6"': { '18': 0, '21': 2, '24': 4 },
  '11\'9"': { '18': 0, '21': 1, '24': 5 },
  '12\'0"': { '18': 0, '21': 0, '24': 6 }
};

export const bottomRetainerParts: Record<string, string> = {
    '07': 'PL10-00145-07',
    '08': 'PL10-00145-01',
    '09': 'PL10-00146-00',
    '10': 'PL10-00146-00',
    '11': 'PL10-00149-00',
    '12': 'PL10-00149-00',
    '13': 'PL10-00146-01',
    '14': 'PL10-00146-01',
    '15': 'PL10-00146-01',
    '16': 'PL10-00146-01',
    '18': 'PL10-00150-00',
  };

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

export const panelColors: Array<KeyDisplayNameValue> = [
  { key: 'WHITE', displayName: 'WHITE', value: '00'},                                                       
  { key: 'SANDTONE', displayName: 'SANDTONE', value: '04'},
  { key: 'BLACK', displayName: 'BLACK', value: '05'},
  { key: 'BRONZE', displayName: 'BRONZE', value: '06'},
  { key: 'NEW BROWN', displayName: 'NEW BROWN', value: '10'},
  { key: 'STEEL GREY', displayName: 'STEEL GREY', value: '20'},
  { key: 'NEW ALMOND', displayName: 'NEW ALMOND', value: '30'},
  { key: 'WALNUT', displayName: 'WALNUT', value: '51'},
  { key: 'HAZELWOOD', displayName: 'HAZELWOOD', value: '40'}
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
