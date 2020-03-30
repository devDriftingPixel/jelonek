import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {FlatList} from 'react-native-gesture-handler';
import {ExternalDataService} from '../services/ExternalDataService';
import {Message} from '../model/Message';
import {View} from 'react-native';
import {MessageListItemComponent} from '../components/MessageListItemComponent';
import {t} from 'i18n-js';
import RestService from '../services/RestService';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenMessages extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.getItems();
    ExternalDataService.getInstance().markAllMessagesAsRead();
  }

  getItems() {
    this.setState({
      items: ExternalDataService.getInstance()
        .getMessages()
        .sort(
          (a: Message, b: Message) =>
            new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
        ),
    });

    if (
      Date.now() -
        ExternalDataService.getInstance()
          .getMessagesLastUpdate()
          .getTime() <
      15 * 60 * 1000
    ) {
      this.setState({progressBarVisible: false});
      return;
    }

    RestService.getInstance()
      .updateMessages()
      .then((response: Response) => {
        console.log('Messages update response:' + JSON.stringify(response));
        return response.text();
      })
      .then((textUpdateData: string) => {
        const lastUpdateDbDate = new Date(textUpdateData);
        const lastUpdateLocalDate = ExternalDataService.getInstance()
          .getMessagesLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          console.log('Last update is earlier than bd');
          return RestService.getInstance().getMessages();
        } else {
          ExternalDataService.getInstance().updateMessagesLastUpdate();
          console.log('Last update is later than bd');
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        if (response == null)
          console.log('Messages items response:' + JSON.stringify(response));
        return response.text();
      })
      .then((jsonItemData: string) => {
        console.log('1232131231->', jsonItemData);
        const newItemData = JSON.parse(jsonItemData) as Message[];
        console.log('new messages list' + newItemData);
        ExternalDataService.getInstance().updateMessages(newItemData);
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
        data={this.state.items as Message[]}
        renderItem={({item}) => (
          <MessageListItemComponent
            item={item as Message}
            navigation={this.props.navigation}
          />
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
