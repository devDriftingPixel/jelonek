import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from '../model/ListItem';
import {FlatList} from 'react-native-gesture-handler';
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';

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
      progressBarVisible: false,
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
