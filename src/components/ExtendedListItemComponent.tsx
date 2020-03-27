import React, {Component} from 'react';
import {Text, View, Linking} from 'react-native';
import * as Colors from '../utility/Colors';
import * as Images from '../utility/Images';
import {Ripple, Icon, Card} from 'material-bread';
import App from '../../App';
import * as Enums from '../model/Enums';
import * as Styles from '../utility/UstilityStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Utility} from '../utility/Utility';
import {ListItem} from '../model/ListItem';
import * as Costants from '../utility/Constants';
import {OpenHours} from './OpenHours';

interface Props {
  item: ListItem;
  onFavoriteSelected: Function;
}

export class ExtendedListItemComponent extends Component<Props> {
  public render() {
    return (
      <Card
        style={[Styles.styles.shadow, Styles.styles.itemList, {height: 320}]}>
        <View
          style={{
            height: 35,
            width: '100%',
            flexDirection: 'row-reverse',
          }}>
          <Ripple
            rippleContainerBorderRadius={20}
            rippleColor={Colors.PRIMARY}
            onPress={() => {
              this.props.onFavoriteSelected(this.props.item);
            }}
            style={{
              width: 40,
              height: 40,
              marginRight: 7,
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={this.props.item.isFavorite ? 'heart' : 'heart-o'}
              size={32}
              color={Colors.PRIMARY}
              style={{width: 32, height: 32}}
              iconComponent={FontAwesome}
            />
          </Ripple>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={Utility.iconFromItemType(
              this.props.item.type,
              this.props.item.subType,
            )}
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
              fontWeight: '700',
              textAlign: 'center',
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {this.props.item.name.toUpperCase()}
          </Text>
          {/**Place holder for Icon balancing */}
          <View style={{width: 62, height: 40}} />
        </View>
        <Ripple
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.ACCENT,
            height: 50,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}
          rippleColor={Colors.PRIMARY}
          onPress={() => {
            Linking.openURL(`tel:${this.props.item.telephone[0]}`);
          }}>
          <Icon
            name={'phone'}
            size={30}
            color={Colors.PRIMARY}
            style={{width: 30, height: 30, marginRight: 20, marginLeft: 20}}
            iconComponent={FontAwesome5}
          />
          <Text style={{color: Colors.PRIMARY, fontSize: 30}}>
            {this.props.item.telephone[0]}
          </Text>
        </Ripple>
        <View style={{marginLeft: 40}}>
          <OpenHours hours={this.props.item.hours} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginLeft: 51,
          }}>
          <Icon
            name={'location'}
            size={55}
            color={Colors.PRIMARY}
            style={{width: 45, height: 45, marginRight: 20}}
            iconComponent={EvilIcons}
          />
          <Text style={{color: Colors.PRIMARY, fontSize: 16}}>
            {this.props.item.address}
          </Text>
        </View>
        <View
          style={{
            height: 30,
            width: '100%',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{width: 10, height: 10}} />
          {this.props.item.amenities &&
          this.props.item.amenities.indexOf(Enums.Amenities.TRANSPORT) > -1 ? (
            <Icon
              name={Costants.icons.amenitiesTransport}
              size={17}
              color={Colors.PRIMARY}
              style={{width: 20, height: 20, marginRight: 5}}
              iconComponent={FontAwesome5}
            />
          ) : null}
          {this.props.item.amenities &&
          this.props.item.amenities.indexOf(Enums.Amenities.PICKUP) > -1 ? (
            <Icon
              name={Costants.icons.amenitiesPickup}
              size={17}
              color={Colors.PRIMARY}
              style={{width: 24, height: 20, marginRight: 5}}
              iconComponent={FontAwesome5}
            />
          ) : null}
          {this.props.item.amenities &&
          this.props.item.amenities.indexOf(Enums.Amenities.FULL24) > -1 ? (
            <Icon
              name={Costants.icons.amenitiesFull24}
              size={19}
              color={Colors.PRIMARY}
              style={{width: 20, height: 20, marginRight: 5}}
              iconComponent={Entypo}
            />
          ) : null}
          {this.props.item.amenities &&
          this.props.item.amenities.indexOf(Enums.Amenities.IN_PLACE) > -1 ? (
            <Icon
              name={Costants.icons.amenitiesInPlace}
              size={17}
              color={Colors.PRIMARY}
              style={{width: 20, height: 20, marginRight: 5}}
              iconComponent={FontAwesome5}
            />
          ) : null}
          {this.props.item.amenities &&
          this.props.item.amenities.indexOf(
            Enums.Amenities.NO_CONTACT_DELIVERY,
          ) > -1 ? (
            <Icon
              name={Costants.icons.amenitiesNoContactDelivery}
              size={17}
              color={Colors.PRIMARY}
              style={{width: 20, height: 20, marginRight: 5}}
              iconComponent={FontAwesome5}
            />
          ) : null}

          {this.props.item.district ? (
            <Text
              style={{
                flex: 1,
                color: Colors.PRIMARY,
                fontSize: 12,
                textAlign: 'center',
              }}>
              {this.props.item.district.toUpperCase()}
            </Text>
          ) : null}
          <View
            style={{
              width: this.props.item.amenities
                ? this.props.item.amenities.length * 29
                : 0,
            }}></View>
        </View>
      </Card>
    );
  }
}
