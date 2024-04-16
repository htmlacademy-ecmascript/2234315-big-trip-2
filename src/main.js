import FilterView from './view/filter-view.js';
import AppPresenter from './presenter/app-presenter.js';
import {render} from './render.js';

const filterWrapper = document.querySelector('.trip-controls__filters');
const appPresenter = new AppPresenter();

render(new FilterView(), filterWrapper);
appPresenter.init();
