import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from '../model/ListItem';
import {FlatList} from 'react-native-gesture-handler';
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';
import * as Colors from '../utility/Colors';

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
    ExternalDataService.getChemists()
      .then((chemists: ListItem[]) => {
        console.log(chemists);
        this.allItems = chemists;
        this.setState({
          items: this.allItems.sort((a: ListItem, b: ListItem) =>
            a.isFavorite ? (this.state.items.length > 0 ? 0 : -1) : 0,
          ),
          progressBarVisible: false,
        });
      })
      .catch((error: any) => console.error(error));
  }

  protected pageContent = () => {
    return (
      <FlatList
        data={this.state.items}
        renderItem={({item}) => (
          <ExtendedListItemComponent
            item={item}
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
