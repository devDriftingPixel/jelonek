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
        console.log('Items update response:' + JSON.stringify(response));
        return response.text();
      })
      .then((textUpdateData: string) => {
        const lastUpdateDbDate = new Date(textUpdateData);
        const lastUpdateLocalDate = ExternalDataService.getInstance()
          .getRestaurantsLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          console.log('Last update is earlier than bd');
          return RestService.getInstance().getRestaurants();
        } else {
          ExternalDataService.getInstance().updateRestaurantsLastUpdate();
          console.log('Last update is later than bd');
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        console.log('Items items response:' + JSON.stringify(response));
        return response.text();
      })
      .then((jsonItemsData: string) => {
        console.log('1232131231->', jsonItemsData);
        const newItemData = JSON.parse(jsonItemsData) as ListItem[];
        console.log('new item list' + newItemData);
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
