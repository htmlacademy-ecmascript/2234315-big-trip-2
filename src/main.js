import AppPresenter from './presenter/app-presenter.js';
import PointModel from './model/point-model.js';

const pointsListWrapper = document.querySelector('.trip-events');

const pointModel = new PointModel();
const appPresenter = new AppPresenter({
  pointsListContainer: pointsListWrapper,
  pointModel
});

pointModel.init();
appPresenter.init();
