import dayjs from 'dayjs';

const POINTS_QUANTITY = 4;

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DATE_FORMAT = {
  time: 'HH:mm',
  date: 'YYYY-MM-DD',
  shortDate: 'MMM DD',
  fullDate: 'DD/MM/YY HH:mm'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const DISABLED_SORT_TYPES = [
  SortType.EVENT,
  SortType.OFFERS
];

const PointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs().$d,
  dateTo: dayjs().add(1, 'days').$d,
  destination: '',
  isFavourite: false,
  offers: [],
  type: POINT_TYPES[5],
};

export {
  POINTS_QUANTITY,
  POINT_TYPES,
  DATE_FORMAT,
  FilterType,
  NoPointsTextType,
  SortType,
  DISABLED_SORT_TYPES,
  PointMode,
  UserAction,
  UpdateType,
  BLANK_POINT
};
