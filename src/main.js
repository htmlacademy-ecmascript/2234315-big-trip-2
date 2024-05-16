import AppPresenter from './presenter/app-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';

const filterWrapper = document.querySelector('.trip-controls__filters');
const pointsListWrapper = document.querySelector('.trip-events');

const pointModel = new PointModel();
const filterPresenter = new FilterPresenter({
  filterContainer: filterWrapper,
  pointModel
});
const appPresenter = new AppPresenter({
  pointsListContainer: pointsListWrapper,
  pointModel
});

pointModel.init();
filterPresenter.init();
appPresenter.init();
