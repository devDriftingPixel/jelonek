import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '../model/ListItem';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItemComponent} from '../components/ListItemComponent';
import * as Constants from '../utility/Constants';
import App from '../../App';
import {Amenities, AnalyticsCategories} from '../model/Enums';
import Analytics from 'appcenter-analytics';
import {Message} from '../model/Message';
import {View} from 'react-native';
import {MessageListItemComponent} from '../components/MessageListItemComponent';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenMessages extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    ExternalDataService.getMessages()
      .then((messages: Message[]) => {
        this.setState({
          items: messages,
          progressBarVisible: false,
        });
      })
      .catch((error: any) => console.error(error));
  }

  protected pageContent = () => {
    return (
      <FlatList
        data={this.state.items as Message[]}
        renderItem={({item}) => (
          <MessageListItemComponent item={item as Message} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  protected footerContent = () => {
    return <View />;
  };

  render() {
    return super.render();
  }
}
