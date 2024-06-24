import { render, replace, remove, RenderPosition } from '../framework/render.js';
import HeaderView from '../view/header-view.js';
import { sortByDay } from '../utils/sorter.js';

export default class HeaderPresenter {
  #headerWrapper = null;
  #headerComponent = null;
  #appModel = null;

  constructor({ headerWrapper, appModel }) {
    this.#headerWrapper = headerWrapper;
    this.#appModel = appModel;

    this.#appModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#appModel.points;

    return points.sort(sortByDay);
  }

  get offers() {
    return this.#appModel.offers;
  }

  get destinations() {
    return this.#appModel.destinations;
  }

  init() {
    if (this.points.length === 0) {
      remove(this.#headerComponent);
      this.#headerComponent = null;

      return;
    }

    const prevHeaderComponent = this.#headerComponent;

    this.#headerComponent = new HeaderView({
      points: this.points,
      offers: this.offers,
      destinations: this.destinations,
    });

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#headerWrapper, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
