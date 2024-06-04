import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import { render } from '../framework/render.js';
import { NoPointText, SortType } from '../const.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/sorter.js';

export default class AppPresenter {
  #pointsListContainer = null;
  #pointModel = null;
  #sortComponent = null;
  #pointsListComponent = new PointsListView();
  #points = [];
  #pointPresenters = new Map();

  constructor({ pointsListContainer, pointModel }) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#sortPoints(SortType.DAY);
    this.#renderApp();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#pointModel.offers, this.#pointModel.destinations);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    render(new NoPointsView({ message: NoPointText.EVERYTHING }), this.#pointsListContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointList() {
    render(this.#pointsListComponent, this.#pointsListContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point, this.#pointModel.offers, this.#pointModel.destinations);
    });
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        throw new Error(`Unhandled sort type: '${sortType}'!`);
    }
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#pointsListContainer);
  }

  #renderApp() {
    if (this.#points.length === 0) {
      this.#renderNoPoints();

      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
