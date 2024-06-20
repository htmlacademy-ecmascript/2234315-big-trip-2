import AppPresenter from './presenter/app-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import AppModel from './model/app-model.js';
import FilterModel from './model/filter-model.js';

const tripInfoWrapper = document.querySelector('.trip-main');
const filterWrapper = document.querySelector('.trip-controls__filters');
const pointsListWrapper = document.querySelector('.trip-events');

const appModel = new AppModel();
const filterModel = new FilterModel();
const appPresenter = new AppPresenter({
  pointsListContainer: pointsListWrapper,
  tripInfoWrapper,
  appModel,
  filterModel,
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterWrapper,
  filterModel,
  appModel
});

appModel.init();
filterPresenter.init();
appPresenter.init();
