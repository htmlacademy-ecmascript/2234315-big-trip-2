import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { render, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sorter.js';

export default class AppPresenter {
  #pointsListContainer = null;
  #tripInfoWrapper = null;
  #sortComponent = null;
  #noPointsComponent = null;
  #pointsListComponent = new PointsListView();
  #newPointButtonComponent = null;

  #appModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ pointsListContainer, tripInfoWrapper, appModel, filterModel }) {
    this.#pointsListContainer = pointsListContainer;
    this.#tripInfoWrapper = tripInfoWrapper;
    this.#appModel = appModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointsListComponent: this.#pointsListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointFormClose
    });

    this.#appModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#appModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      default:
        throw new Error(`Unhandled sort type: '${this.#currentSortType}'!`);
    }
  }

  init() {
    this.#renderNewPointButton();
    this.#renderApp();
  }

  #createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.#appModel.offers, this.#appModel.destinations);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#appModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#appModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#appModel.deletePoint(updateType, update);
        break;
      default:
        throw new Error(`Unknown user action: '${actionType}'!`);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#appModel.offers, this.#appModel.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearApp();
        this.#renderApp();
        break;
      case UpdateType.MAJOR:
        this.#clearApp({ resetSortType: true });
        this.#renderApp();
        break;
      default:
        throw new Error(`Unknown update type: '${updateType}'!`);
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter.destroy();
  };

  #renderNewPointButton() {
    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick
    });

    render(this.#newPointButtonComponent, this.#tripInfoWrapper);
  }

  #handleNewPointButtonClick = () => {
    this.#createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#pointsListContainer);
  }

  #renderPointList() {
    render(this.#pointsListComponent, this.#pointsListContainer);

    this.points.forEach((point) => {
      this.#renderPoint(point, this.#appModel.offers, this.#appModel.destinations);
    });
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearApp();
    this.#renderApp();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#pointsListContainer);
  }

  #clearApp({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderApp() {
    if (this.points.length === 0) {
      this.#renderNoPoints();

      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
