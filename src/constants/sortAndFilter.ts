export enum SORT_OPTIONS {
  CAPTURED_DATE_DESCENDING = 'captured-date-descending',
  CAPTURED_DATE_ASCENDING = 'captured-date-ascending',
  NAME_ASCENDING = 'name-ascending',
  NAME_DESCENDING = 'name-descending',
}

export enum POKEDEX_FILTERS {
  NAME = 'name',
  CAPTURED_DATE = 'captured-date',
  HEIGHT_TYPE = 'height-type',
}

export enum HEIGHTS {
  SMALL = 'small',
  MEDIUM = 'medium',
  BIG = 'big',
}

export const HEIGHT_TYPES = {
  small: {
    min: 0,
    max: 1,
  },
  medium: {
    min: 1,
    max: 1.5,
  },
  big: { min: 1.5, max: Infinity },
};
