import { remove, render, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointsListItemView from '../view/points-list-item-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType, BLANK_POINT } from '../const.js';

export default class NewPointPresenter {
  #pointsListComponent = null;
  #pointsListItemComponent = new PointsListItemView();
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  #offers = [];
  #destinations = [];

  constructor({ pointsListComponent, onDataChange, onDestroy }) {
    this.#pointsListComponent = pointsListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(offers, destinations) {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointEditComponent = new PointEditView({
      point: BLANK_POINT,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onDeleteClick: this.#handleDeleteClick,
      isEditView: false,
    });

    render(this.#pointsListItemComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);
    render(this.#pointEditComponent, this.#pointsListItemComponent.element);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointsListItemComponent);
    remove(this.#pointEditComponent);

    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleFormClose = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
