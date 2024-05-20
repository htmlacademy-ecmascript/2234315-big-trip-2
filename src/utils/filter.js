import { FilterType } from '../const.js';
import { isFutureDate, isPresentDate, isExpiredDate } from './utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentDate(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isExpiredDate(point.dateTo)),
};

export { filter };
