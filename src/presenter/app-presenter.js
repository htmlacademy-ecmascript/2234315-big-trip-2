import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointsListItemView from '../view/points-list-item-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';

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
    const pointsListItemComponent = new PointsListItemView();

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      offers,
      destinations,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointsListItemComponent, this.#pointsListComponent.element);
    render(pointComponent, pointsListItemComponent.element);
  }

  #renderApp() {
    render(new SortView, this.#pointsListContainer);
    render(this.#pointsListComponent, this.#pointsListContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point, this.#pointModel.offers, this.#pointModel.destinations);
    });
  }
}
