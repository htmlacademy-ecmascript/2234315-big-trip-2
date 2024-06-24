import AppPresenter from './presenter/app-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import AppModel from './model/app-model.js';
import FilterModel from './model/filter-model.js';
import AppApiService from './app-api-service.js';

const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic Bt19OpY33lBAq78m';

const headerWrapper = document.querySelector('.trip-main');
const filterWrapper = document.querySelector('.trip-controls__filters');
const pointsListWrapper = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const appModel = new AppModel({
  appApiService: new AppApiService(END_POINT, AUTHORIZATION)
});
const headerPresenter = new HeaderPresenter({
  headerWrapper,
  appModel
});
const filterPresenter = new FilterPresenter({
  filterContainer: filterWrapper,
  filterModel,
  appModel
});
const appPresenter = new AppPresenter({
  pointsListContainer: pointsListWrapper,
  headerWrapper,
  appModel,
  filterModel,
});

appModel.init();
headerPresenter.init();
filterPresenter.init();
appPresenter.init();
