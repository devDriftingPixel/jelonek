import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {FlatList} from 'react-native-gesture-handler';
import {ExternalDataService} from '../services/ExternalDataService';
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
    this.setState({
      items: ExternalDataService.getInstance().getMessages(),
      progressBarVisible: false,
    });
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
