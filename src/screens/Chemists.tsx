import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from '../model/ListItem';
import {FlatList} from 'react-native-gesture-handler';
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';
import RestService from '../services/RestService';
import NetworkService from '../services/NetworkService';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenChemists extends AbstractScreen {
  protected allItems: ListItem[];

  constructor(props: Props) {
    super(props);
    this.allItems = [];
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    this.allItems = ExternalDataService.getInstance().getChemists();
    this.setState({
      items: this.allItems.sort((a: ListItem, b: ListItem) =>
        a.isFavorite ? (this.state.items.length > 0 ? 0 : -1) : 0,
      ),
    });

    if (!NetworkService.getInstance().isConnected()) {
      this.setState({progressBarVisible: false});
      return;
    }

    if (
      Date.now() -
        ExternalDataService.getInstance()
          .getChemistLastUpdate()
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
          .getChemistLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          return RestService.getInstance().getChemists();
        } else {
          ExternalDataService.getInstance().updateChemistLastUpdate();
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        return response.text();
      })
      .then((jsonItemsData: string) => {
        const newItemData = JSON.parse(jsonItemsData);
        ExternalDataService.getInstance().updateChemist(newItemData);
        this.getItems();
      })
      .catch((error: any) => {
        console.error(error);
        this.setState({progressBarVisible: false});
      });
  }

  protected pageContent = () => {
    return (
      <FlatList
        data={this.state.items as ListItem[]}
        renderItem={({item}) => (
          <ExtendedListItemComponent
            item={item as ListItem}
            onFavoriteSelected={(item: ListItem) =>
              this.onFavoriteSelected(item)
            }
            paddingBottom={20}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  render() {
    return super.render();
  }
}
