import {NavigationStackProp} from 'react-navigation-stack';
import {ScreenShops} from './Shops';
import {ExternalDataService} from '../services/ExternalDataService';

import App from '../../App';
import {ListItem} from '../model/ListItem';
import RestService from '../services/RestService';
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
    });

    if (
      Date.now() -
        ExternalDataService.getInstance()
          .getRestaurantsLastUpdate()
          .getTime() <
      60 * 60 * 1000
    ) {
      this.setState({progressBarVisible: false});
      return;
    }

    RestService.getInstance()
      .updateRestaurants()
      .then((response: Response) => {
        return response.text();
      })
      .then((textUpdateData: string) => {
        const lastUpdateDbDate = new Date(textUpdateData);
        const lastUpdateLocalDate = ExternalDataService.getInstance()
          .getRestaurantsLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          return RestService.getInstance().getRestaurants();
        } else {
          ExternalDataService.getInstance().updateRestaurantsLastUpdate();
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        return response.text();
      })
      .then((jsonItemsData: string) => {
        const newItemData = JSON.parse(jsonItemsData) as ListItem[];
        ExternalDataService.getInstance().updateRestaurants(newItemData);
        this.getItems();
      })
      .catch((error: any) => {
        console.error(error);
        this.setState({progressBarVisible: false});
      });
  }

  render() {
    return super.render();
  }
}
