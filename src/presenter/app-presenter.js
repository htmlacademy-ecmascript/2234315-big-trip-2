import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { render, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { SortType, UpdateType, UserAction, FilterType, Loading, TimeLimit } from '../const.js';
import { filter } from '../utils/filter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sorter.js';

export default class AppPresenter {
  #pointsListContainer = null;
  #headerWrapper = null;
  #sortComponent = null;
  #noPointsComponent = null;
  #pointsListComponent = new PointsListView();
  #newPointButtonComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #appModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #isLoading = true;

  constructor({ pointsListContainer, headerWrapper, appModel, filterModel }) {
    this.#pointsListContainer = pointsListContainer;
    this.#headerWrapper = headerWrapper;
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

  get offers() {
    return this.#appModel.offers;
  }

  get destinations() {
    return this.#appModel.destinations;
  }

  init() {
    this.#renderNewPointButton();
    this.#renderApp();
  }

  #createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.offers, this.destinations);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();

        try {
          await this.#appModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();

        try {
          await this.#appModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();

        try {
          await this.#appModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      default:
        throw new Error(`Unknown user action: '${actionType}'!`);
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearApp();
        this.#renderApp();
        break;
      case UpdateType.MAJOR:
        this.#clearApp({ resetSortType: true });
        this.#renderApp();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#noPointsComponent);
        this.#newPointButtonComponent.enable();
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

    render(this.#newPointButtonComponent, this.#headerWrapper);
  }

  #handleNewPointButtonClick = () => {
    if (this.points.length === 0) {
      remove(this.#noPointsComponent);
      render(this.#pointsListComponent, this.#pointsListContainer);
    }

    this.#createPoint();
    this.#newPointButtonComponent.disable();
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.enable();

    if (this.points.length === 0) {
      remove(this.#pointsListComponent);

      this.#renderNoPoints(this.#filterType);
    }
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

  #renderNoPoints(reason) {
    this.#noPointsComponent = new NoPointsView(reason);

    render(this.#noPointsComponent, this.#pointsListContainer);
  }

  #renderPointList() {
    render(this.#pointsListComponent, this.#pointsListContainer);

    this.points.forEach((point) => {
      this.#renderPoint(point, this.offers, this.destinations);
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
    if (this.#appModel.isServerUnavailable) {
      this.#renderNoPoints(Loading.ERROR);
      this.#newPointButtonComponent.disable();

      return;
    }

    if (this.#isLoading) {
      this.#renderNoPoints(Loading.IN_PROGRESS);
      this.#newPointButtonComponent.disable();

      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoints(this.#filterType);

      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
