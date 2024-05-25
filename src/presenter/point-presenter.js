import { render, replace, remove } from '../framework/render.js';
import PointsListItemView from '../view/points-list-item-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #pointsListItemComponent = null;
  #pointEditComponent = null;
  #pointComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];

  constructor({ pointsListContainer, onDataChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointsListItemComponent = new PointsListItemView();

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointsListItemComponent, this.#pointsListContainer);
      render(this.#pointComponent, this.#pointsListItemComponent.element);

      return;
    }

    if (this.#pointsListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointsListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };
}
