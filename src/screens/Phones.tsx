import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItem} from '../model/ListItem';
import {FlatList} from 'react-native-gesture-handler';
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';
import * as Colors from '../utility/Colors';
import {Phone} from '../model/Phone';

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
    ExternalDataService.getPhones()
      .then((phones: Phone[]) => {
        this.allItems = phones;
        this.setState({
          items: phones,
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
            item={(item as unknown) as ListItem}
            maxLines={4}
            fontSize={18}
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
