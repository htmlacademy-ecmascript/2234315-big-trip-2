import { render, replace, remove } from '../framework/render.js';
import PointsListItemView from '../view/points-list-item-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { PointMode, UserAction, UpdateType } from '../const.js';


export default class PointPresenter {
  #pointsListContainer = null;
  #pointsListItemComponent = null;
  #pointEditComponent = null;
  #pointComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = PointMode.DEFAULT;

  constructor({ pointsListContainer, onDataChange, onModeChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      onFormClose: this.#handleFormClose,
      onDeleteClick: this.#handleDeleteClick,
      isEditView: true,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointsListItemComponent, this.#pointsListContainer);
      render(this.#pointComponent, this.#pointsListItemComponent.element);

      return;
    }

    if (this.#mode === PointMode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === PointMode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointsListItemComponent);
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== PointMode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = PointMode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = PointMode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  #handleFormSubmit = (point) => {
    const isMinorUpdate =
      this.#point.dateFrom === point.dateFrom ||
      this.#point.dateTo === point.dateTo ||
      this.#point.basePrice === point.basePrice;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      point,
    );
    this.#replaceFormToPoint();
  };

  #handleFormClose = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
