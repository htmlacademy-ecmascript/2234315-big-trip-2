const POINTS_QUANTITY = 4;

const POINTS_TYPES = [
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

const NoPointText = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export { POINTS_QUANTITY, POINTS_TYPES, DATE_FORMAT, NoPointText, FilterType };
