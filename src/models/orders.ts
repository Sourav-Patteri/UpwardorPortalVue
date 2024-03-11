export interface MeasurementOptions {
  foot: string
  inches?: Array<string>
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
