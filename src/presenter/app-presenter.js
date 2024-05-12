import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointsListItemView from '../view/points-list-item-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render } from '../framework/render.js';

export default class AppPresenter {
  #pointsListContainer = null;
  #pointModel = null;

  #pointsListComponent = new PointsListView();
  #pointEditFormComponent = new PointsListItemView();

  #points = [];
  #offers = [];
  #destinations = [];

  constructor({ pointsListContainer, pointModel }) {
    this.#pointsListContainer = pointsListContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];

    render(new SortView, this.#pointsListContainer);
    render(this.#pointsListComponent, this.#pointsListContainer);
    render(this.#pointEditFormComponent, this.#pointsListComponent.element);
    render(new PointEditView({
      point: this.#points[0],
      offers: this.#offers,
      destinations: this.#destinations
    }), this.#pointEditFormComponent.element);

    for (let i = 1; i < this.#points.length; i++) {
      const pointsListItemComponent = new PointsListItemView();

      render(pointsListItemComponent, this.#pointsListComponent.element);
      render(new PointView({
        point: this.#points[i],
        offers: this.#offers,
        destinations: this.#destinations
      }), pointsListItemComponent.element);
    }
  }
}
