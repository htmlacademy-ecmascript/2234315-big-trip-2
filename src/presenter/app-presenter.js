import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import { render } from '../framework/render.js';
import { NoPointText } from '../const.js';
import PointPresenter from './point-presenter.js';

export default class AppPresenter {
  #pointsListContainer = null;
  #pointModel = null;
  #pointsListComponent = new PointsListView();
  #points = [];

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
    });

    pointPresenter.init(point, offers, destinations);
  }

  #renderNoPoints() {
    render(new NoPointsView(NoPointText.EVERYTHING), this.#pointsListContainer);
  }

  #renderSort() {
    render(new SortView, this.#pointsListContainer);
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
