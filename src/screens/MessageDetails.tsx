import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import {Appbar, Card, CardHeader, CardMedia} from 'material-bread';
import * as Colors from '../utility/Colors';
import {Image} from 'react-native';
import App from '../../App';
import HTML from 'react-native-render-html';
import {Message} from '../model/Message';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenMessageDetails extends Component<Props> {
  private item: Message;

  constructor(props: Props) {
    super(props);
    const {params} = this.props.navigation!.state;
    this.item = params!.item;
  }

  render() {
    const editDate = new Date(this.item.editDate);
    const createDate = new Date(this.item.createDate);
    const date = editDate > createDate ? editDate : createDate;

    return (
      <SafeAreaView style={{flex: 1}}>
        <Appbar
          barType={'normal'}
          color={Colors.PRIMARY}
          title={App.translate('menu_messages')}
          navigation={'arrow-back'}
          onNavigation={() => this.props.navigation?.goBack()}
        />

        <Card style={{flex: 1, margin: 15, zIndex: 1}}>
          <ScrollView>
            <CardHeader title={this.item.title} style={{fontSize: 18}} />
            {this.item.imageUrl ? (
              <CardMedia
                image={
                  <Image
                    style={{flex: 1, width: '100%'}}
                    source={{uri: this.item.imageUrl}}
                    resizeMode="cover"
                  />
                }
              />
            ) : null}
            {this.item.content ? (
              <View style={{margin: 20}}>
                <HTML
                  html={this.item.content}
                  imagesMaxWidth={Dimensions.get('window').width}
                />
              </View>
            ) : null}
          </ScrollView>
          <View
            style={{
              width: '100%',
              flexDirection: 'row-reverse',
              marginVertical: 10,
            }}>
            <Text
              style={{
                textAlign: 'right',

                height: 20,
                paddingRight: 10,
                color: Colors.PRIMARY,
              }}>
              {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}  ${date.getHours()}:${
                date.getMinutes() < 10 ? '0' : ''
              }${date.getMinutes()}`}
            </Text>
            {this.item.source ? (
              <Text
                style={{
                  color: Colors.DARK_TEXT,
                  fontStyle: 'italic',
                  marginRight: 10,
                }}>
                {this.item.source}
              </Text>
            ) : null}
          </View>
        </Card>
      </SafeAreaView>
    );
  }
}
