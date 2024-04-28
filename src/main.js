import FilterView from './view/filter-view.js';
import AppPresenter from './presenter/app-presenter.js';
import PointModel from './model/point-model.js';
import { render } from './render.js';

const filterWrapper = document.querySelector('.trip-controls__filters');
const pointsListWrapper = document.querySelector('.trip-events');

const pointModel = new PointModel();
const appPresenter = new AppPresenter({
  pointsListContainer: pointsListWrapper,
  pointModel
});

render(new FilterView, filterWrapper);
pointModel.init();
appPresenter.init();
