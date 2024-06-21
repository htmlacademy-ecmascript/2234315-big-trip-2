import AppPresenter from './presenter/app-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import AppModel from './model/app-model.js';
import FilterModel from './model/filter-model.js';
import AppApiService from './app-api-service.js';

const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic Bt10OpY93lBAq78m';

const tripInfoWrapper = document.querySelector('.trip-main');
const filterWrapper = document.querySelector('.trip-controls__filters');
const pointsListWrapper = document.querySelector('.trip-events');

const appModel = new AppModel({
  appApiService: new AppApiService(END_POINT, AUTHORIZATION)
});
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
