import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointsListItemView from '../view/points-list-item-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

const filterWrapper = document.querySelector('.trip-controls__filters');

export default class AppPresenter {
  pointsListComponent = new PointsListView();
  pointEditFormComponent = new PointsListItemView();

  constructor({pointsListContainer, pointModel}) {
    this.pointsListContainer = pointsListContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.points = [...this.pointModel.getPoints()];

    render(new FilterView, filterWrapper);
    render(new SortView, this.pointsListContainer);
    render(this.pointsListComponent, this.pointsListContainer);
    render(this.pointEditFormComponent, this.pointsListComponent.getElement());
    render(new PointEditView, this.pointEditFormComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      const pointsListItemComponent = new PointsListItemView();
      render(pointsListItemComponent, this.pointsListComponent.getElement());
      render(new PointView ({point: this.points[i]}), pointsListItemComponent.getElement());
    }
  }
}
