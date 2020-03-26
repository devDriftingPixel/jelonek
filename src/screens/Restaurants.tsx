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
    ExternalDataService.getRestaurants()
      .then((restaurants: ListItem[]) => {
        this.allItems = restaurants;
        this.setState({
          items: this.allItems.sort((a: ListItem, b: ListItem) =>
            a.isFavorite ? (this.state.items.length > 0 ? 0 : -1) : 0,
          ),
        });
      })
      .catch((error: any) => console.error(error));
  }

  render() {
    return super.render();
  }
}
