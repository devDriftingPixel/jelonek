import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from '../model/ListItem';
import {FlatList} from 'react-native-gesture-handler';
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';
import * as Colors from '../utility/Colors';
import {Phone} from '../model/Phone';
import RestService from '../services/RestService';
import NetworkService from '../services/NetworkService';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenPhones extends AbstractScreen {
  protected allItems: Phone[];

  constructor(props: Props) {
    super(props);
    this.allItems = [];
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    this.allItems = ExternalDataService.getInstance().getPhones();
    this.setState({
      items: this.allItems,
    });

    if (!NetworkService.getInstance().isConnected()) {
      this.setState({progressBarVisible: false});
      return;
    }

    if (
      Date.now() -
        ExternalDataService.getInstance()
          .getPhonesLastUpdate()
          .getTime() <
      60 * 60 * 1000
    ) {
      this.setState({progressBarVisible: false});
      return;
    }

    RestService.getInstance()
      .updatePhones()
      .then((response: Response) => {
        return response.text();
      })
      .then((textUpdateData: string) => {
        const lastUpdateDbDate = new Date(textUpdateData);
        const lastUpdateLocalDate = ExternalDataService.getInstance()
          .getPhonesLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          return RestService.getInstance().getPhones();
        } else {
          ExternalDataService.getInstance().updatePhonesLastUpdate();
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        return response.text();
      })
      .then((jsonItemsData: string) => {
        const newItemData = JSON.parse(jsonItemsData);
        ExternalDataService.getInstance().updatePhones(newItemData);
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
        data={this.state.items as Phone[]}
        renderItem={({item}) => (
          <ExtendedListItemComponent
            item={(item as unknown) as ListItem}
            maxLines={4}
            fontSize={18}
            onFavoriteSelected={(item: ListItem) =>
              this.onFavoriteSelected(item)
            }
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
