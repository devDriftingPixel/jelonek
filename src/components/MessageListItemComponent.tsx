import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {Card, CardHeader, CardMedia, Ripple} from 'material-bread';
import * as Styles from '../utility/UtilityStyles';

import {Message} from '../model/Message';
import {Utility} from '../utility/Utility';
import * as Colors from '../utility/Colors';
import {NavigationStackProp} from 'react-navigation-stack';

interface Props {
  item: Message;
  navigation?: NavigationStackProp;
}

export class MessageListItemComponent extends Component<Props> {
  public render() {
    const editDate = new Date(this.props.item.editDate);
    const createDate = new Date(this.props.item.createDate);
    const date = editDate > createDate ? editDate : createDate;
    return (
      <Card style={[Styles.styles.shadow, {margin: 10, borderRadius: 15}]}>
        <Ripple
          rippleColor={Colors.PRIMARY}
          onPress={() =>
            this.props.navigation!.navigate('MessageDetails', {
              item: this.props.item,
            })
          }>
          <CardHeader title={this.props.item.title} style={{fontSize: 18}} />
          {this.props.item.imageUrl ? (
            <CardMedia
              image={
                <Image
                  style={{flex: 1, width: '100%'}}
                  source={{uri: this.props.item.imageUrl}}
                  resizeMode="cover"
                />
              }
            />
          ) : null}
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <View style={{width: 50, marginLeft: 20, alignItems: 'center'}}>
              <Text style={{color: Colors.PRIMARY, fontSize: 35}}>
                {date.getDate()}
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  fontSize: 21,
                  marginTop: -14,
                  fontWeight: '700',
                }}>
                {Utility.getNameOfMonth(date.getMonth())
                  .substr(0, 3)
                  .toUpperCase()}
              </Text>
              <Text
                style={{color: Colors.PRIMARY, fontSize: 17, marginTop: -10}}>
                {date.getFullYear()}
              </Text>
            </View>
            <Text
              style={{flex: 1, marginLeft: 10, marginRight: 15, fontSize: 15}}>
              {this.props.item.short}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row-reverse',
              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'right',

                height: 20,
                paddingRight: 10,
                color: Colors.PRIMARY,
              }}>
              {`${date.getHours()}:${
                date.getMinutes() < 10 ? '0' : ''
              }${date.getMinutes()}`}
            </Text>
            {this.props.item.source ? (
              <Text
                style={{
                  color: Colors.DARK_TEXT,
                  fontStyle: 'italic',
                  marginRight: 10,
                }}>
                {this.props.item.source}
              </Text>
            ) : null}
          </View>
        </Ripple>
      </Card>
    );
  }
}
