export interface MeasurementOptions {
  foot: string
  inches?: Array<string>
}

export interface StampPattern {
  key: string,
  displayName: string
}

export const doorWidths: Array<string | MeasurementOptions> = [
  { foot: '08' }, { foot: '09' }, { foot: '10' }, { foot: '12' },
  { foot: '14' }, { foot: '16' }, { foot: '18' }
];

export const doorHeights: Array<MeasurementOptions> = [
  {
    foot: '06',
    inches: [ '0', '3', '6', '9' ]
  },
  {
    foot: '07',
    inches: [ '0', '3', '6', '9' ]
  },
  {
    foot: '08',
    inches: [ '0', '3', '6', '9' ]
  },
  {
    foot: '09',
    inches: [ '0', '3', '6', '9' ]
  },
  {
    foot: '10',
    inches: [ '0', '3', '6', '9' ]
  },
  {
    foot: '11',
    inches: [ '0', '3', '6', '9' ]
  },
  {
    foot: '12',
    inches: [ '0' ]
  }
];

export const stampPatterns: Array<StampPattern> = [
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
