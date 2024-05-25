import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import { render } from '../framework/render.js';
import { NoPointText } from '../const.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class AppPresenter {
  #pointsListContainer = null;
  #pointModel = null;
  #pointsListComponent = new PointsListView();
  #points = [];
  #pointPresenters = new Map();

  constructor({ pointsListContainer, pointModel }) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];

    this.#renderApp();
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      onDataChange: this.#handlePointChange
    });

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#pointModel.offers, this.#pointModel.destinations);
  };

  #renderNoPoints() {
    render(new NoPointsView(NoPointText.EVERYTHING), this.#pointsListContainer);
  }

  #renderSort() {
    render(new SortView, this.#pointsListContainer);
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

  #renderApp() {

    if (this.#points.length === 0) {
      this.#renderNoPoints();

      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
