import SorterView from '../view/sorter-view.js';
import PointsListView from '../view/points-list-view.js';
import PointsListItemView from '../view/points-list-item-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

const pointsListWrapper = document.querySelector('.trip-events');

export default class AppPresenter {
  pointsListComponent = new PointsListView();
  pointEditFormComponent = new PointsListItemView();

  init() {
    render(new SorterView, pointsListWrapper);
    render(this.pointsListComponent, pointsListWrapper);
    render(this.pointEditFormComponent, this.pointsListComponent.getElement());
    render(new PointEditView, this.pointEditFormComponent.getElement());

    for (let i = 0; i < 3; i++) {
      const pointsListItemComponent = new PointsListItemView();
      render(pointsListItemComponent, this.pointsListComponent.getElement());
      render(new PointView, pointsListItemComponent.getElement());
    }
  }
}
