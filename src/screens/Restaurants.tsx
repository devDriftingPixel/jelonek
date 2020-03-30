import {NavigationStackProp} from 'react-navigation-stack';
import {ScreenShops} from './Shops';
import {ExternalDataService} from '../services/ExternalDataService';

import App from '../../App';
import {ListItem} from '../model/ListItem';
type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenRestaurants extends ScreenShops {
  protected allItems: ListItem[];

  constructor(props: Props) {
    super(props);
    this.allItems = [];
  }

  getItems() {
    this.allItems = ExternalDataService.getInstance().getRestaurants();
    this.setState({
      items: this.allItems.sort((a: ListItem, b: ListItem) =>
        a.isFavorite ? (this.state.items.length > 0 ? 0 : -1) : 0,
      ),
      progressBarVisible: false,
    });
  }

  render() {
    return super.render();
  }
}
