import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Card} from 'material-bread';
import * as Styles from '../utility/UtilityStyles';

import {Message} from '../model/Message';
import {Utility} from '../utility/Utility';
import * as Colors from '../utility/Colors';

interface Props {
  item: Message;
}

export class MessageListItemComponent extends Component<Props> {
  public render() {
    const editDate = new Date(this.props.item.editDate);
    const createDate = new Date(this.props.item.createDate);
    const date = editDate > createDate ? editDate : createDate;
    return (
      <Card style={[Styles.styles.shadow, Styles.styles.itemList]}>
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <View style={{width: 50, marginLeft: 20}}>
            <Text style={{color: Colors.PRIMARY, fontSize: 35}}>
              {date.getDate()}
            </Text>
            <Text
              style={{
                color: Colors.PRIMARY,
                fontSize: 21,
                marginTop: -15,
                fontWeight: '700',
              }}>
              {Utility.getNameOfMonth(date.getMonth())
                .substr(0, 3)
                .toUpperCase()}
            </Text>
            <Text style={{color: Colors.PRIMARY, fontSize: 17, marginTop: -10}}>
              {date.getFullYear()}
            </Text>
          </View>
          <Text style={{flex: 1, marginLeft: 10, fontSize: 18}}>
            {this.props.item.title}
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'right',
            width: '100%',
            height: 20,
            paddingRight: 10,
            color: Colors.PRIMARY,
          }}>
          {`${date.getHours()}:${date.getMinutes()}`}
        </Text>
      </Card>
    );
  }
}
