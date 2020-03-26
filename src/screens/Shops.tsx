import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {View, Text} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';

import * as Colors from '../utility/Colors';
import {Utility} from '../utility/Utility';
import {ListItem} from '../model/ListItem';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItemComponent} from '../components/ListItemComponent';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenShops extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    ExternalDataService.getShops()
      .then((shops: ListItem[]) =>
        this.setState({
          items: shops.sort((a: ListItem, b: ListItem) =>
            a.isFavorite ? (this.state.items.length > 0 ? 0 : -1) : 0,
          ),
        }),
      )
      .catch((error: any) => console.error(error));
  }

  protected pageContent = () => {
    return (
      <FlatList
        data={this.state.items}
        renderItem={({item}) => (
          <ListItemComponent
            item={item}
            onFavoriteSelected={(item: ListItem) =>
              this.onFavoriteSelected(item)
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}></FlatList>
    );
  };

  render() {
    return super.render();
  }
}
