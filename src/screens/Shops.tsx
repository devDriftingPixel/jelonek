import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {View, Text} from 'react-native';
import * as Enums from '../model/Enums';
import * as Styles from '../utility/UstilityStyles';
import {FlatList} from 'react-native-gesture-handler';
import {Card, Icon} from 'material-bread';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Colors from '../utility/Colors';
import {Utility} from '../utility/Utility';
import {ListItem} from '../model/ListItem';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenShops extends AbstractScreen {
  constructor(props: Props) {
    super(props);
  }

  state = {
    shops: [] as ListItem[],
  };

  componentDidMount() {
    this.setState({
      shops: [
        {
          name:
            'Grande Roma dsfsdf sd fsdf sdifu iosdufosdaiuf sdoifu sdoifu oisduf oidfs',
          district: Enums.Districts.ZABOBRZE,
          type: Enums.DataItemTypes.RESTAURANTS,
          isFavorite: true,
          amenities: [
            Enums.Amenities.PICKUP,
            Enums.Amenities.TRANSPORT,
            Enums.Amenities.IN_PLACE,
          ],
        },
        {
          name: 'Castorama',
          district: Enums.Districts.CENTRUM,
          type: Enums.DataItemTypes.SHOPS,
          subType: Enums.DataItemSubtypes.BUILDING,
          isFavorite: true,
          amenities: [
            Enums.Amenities.PICKUP,
            Enums.Amenities.TRANSPORT,
            Enums.Amenities.IN_PLACE,
          ],
        },
        {
          name: 'Zielony Stragan',
          district: Enums.Districts.CIEPLICE,
          type: Enums.DataItemTypes.SHOPS,
          subType: Enums.DataItemSubtypes.VEGETABLES,
          isFavorite: false,
          amenities: [Enums.Amenities.TRANSPORT, Enums.Amenities.IN_PLACE],
        },
        {
          name: 'Zielony Stragan',
          district: Enums.Districts.CIEPLICE,
          type: Enums.DataItemTypes.SHOPS,
          subType: Enums.DataItemSubtypes.FOOD,
          isFavorite: false,
          amenities: [Enums.Amenities.TRANSPORT, Enums.Amenities.IN_PLACE],
        },
        {
          name: 'Apteka niezielona',
          district: Enums.Districts.CIEPLICE,
          type: Enums.DataItemTypes.CHEMIST,
          isFavorite: false,
          amenities: [
            Enums.Amenities.TRANSPORT,
            Enums.Amenities.IN_PLACE,
            Enums.Amenities.FULL24,
          ],
        },
      ] as ListItem[],
    });
  }

  protected pageContent = () => {
    return (
      <FlatList
        data={this.state.shops}
        renderItem={({item}) => (
          <Card style={[Styles.styles.shadow, Styles.styles.itemList]}>
            <View
              style={{
                height: 35,
                width: '100%',
                flexDirection: 'row-reverse',
              }}>
              <Icon
                name={'heart-o'}
                size={32}
                color={Colors.PRIMARY}
                style={{width: 32, height: 32, marginRight: 10, marginTop: 5}}
                iconComponent={FontAwesome}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name={Utility.iconFromItemType(item.type, item.subType)}
                size={38}
                color={Colors.PRIMARY}
                style={{width: 42, height: 40, marginLeft: 20}}
                iconComponent={FontAwesome5}
              />
              <Text
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  color: Colors.PRIMARY,
                  fontSize: 20,
                  flex: 1,
                  fontWeight: '500',
                  textAlign: 'center',
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name.toUpperCase()}
              </Text>
              {/**Place holder for Icon balancing */}
              <View style={{width: 62, height: 40}} />
            </View>
            <View
              style={{
                height: 30,
                width: '100%',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Icon
                name={'truck'}
                size={17}
                color={Colors.PRIMARY}
                style={{width: 20, height: 20, marginRight: 15}}
                iconComponent={FontAwesome5}
              />
              <Icon
                name={'hands'}
                size={17}
                color={Colors.PRIMARY}
                style={{width: 24, height: 20, marginRight: 5}}
                iconComponent={FontAwesome5}
              />
              <Icon
                name={'back-in-time'}
                size={19}
                color={Colors.PRIMARY}
                style={{width: 20, height: 20, marginRight: 5}}
                iconComponent={Entypo}
              />
              <Icon
                name={'shopping-cart'}
                size={17}
                color={Colors.PRIMARY}
                style={{width: 20, height: 20, marginRight: 5}}
                iconComponent={FontAwesome5}
              />
              <Text
                style={{
                  flex: 1,
                  color: Colors.PRIMARY,
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                {item.district}
              </Text>
              <View style={{width: 114}}></View>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}></FlatList>
    );
  };

  render() {
    return super.render();
  }
}
