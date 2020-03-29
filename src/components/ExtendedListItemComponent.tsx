import React, {Component} from 'react';
import {Text, View, Linking} from 'react-native';
import * as Colors from '../utility/Colors';
import {Ripple, Icon, Card} from 'material-bread';
import * as Enums from '../model/Enums';
import * as Styles from '../utility/UstilityStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Utility} from '../utility/Utility';
import {ListItem} from '../model/ListItem';
import * as Costants from '../utility/Constants';
import {OpenHours} from './OpenHours';
import {AddressComponent} from './AddressComponent';

interface Props {
  item: ListItem;
  onFavoriteSelected?: Function;
  fontSize?: number;
  maxLines?: number;
  paddingBottom?: number;
}

export class ExtendedListItemComponent extends Component<Props> {
  public render() {
    return (
      <Card style={[Styles.styles.shadow, Styles.styles.extendedItemList]}>
        <View
          style={{
            height: 35,
            width: '100%',
            flexDirection: 'row-reverse',
          }}>
          {this.props.onFavoriteSelected ? (
            <Ripple
              rippleContainerBorderRadius={20}
              rippleColor={Colors.PRIMARY}
              onPress={() => {
                this.props.onFavoriteSelected!(this.props.item);
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
          ) : null}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              fontSize: this.props.fontSize ? this.props.fontSize : 20,
              flex: 1,
              fontWeight: '700',
              textAlign: 'center',
            }}
            numberOfLines={this.props.maxLines ? this.props.maxLines : 1}
            ellipsizeMode="tail">
            {this.props.item.name.toUpperCase()}
          </Text>
          {/**Place holder for Icon balancing */}
          <View style={{width: 62, height: 40}} />
        </View>
        {this.props.item.phones && this.props.item.phones.length > 0 ? (
          <View style={{height: 20}} />
        ) : null}
        {this.props.item.phones
          ? this.props.item.phones.map((phone: string, index: number) => (
              <View key={index.toString()}>
                <View
                  style={{
                    height: index > 0 ? 1 : 0,
                    backgroundColor: Colors.PRIMARY,
                    width: '100%',
                  }}
                />
                <Ripple
                  style={{
                    flexDirection: 'row',
                    backgroundColor: Colors.ACCENT,
                    height: 50,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  rippleColor={Colors.PRIMARY}
                  onPress={() => {
                    Linking.openURL(`tel:${phone}`);
                  }}>
                  <Icon
                    name={'phone'}
                    size={30}
                    color={Colors.PRIMARY}
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 20,
                      marginLeft: 20,
                    }}
                    iconComponent={FontAwesome5}
                  />
                  <Text style={{color: Colors.PRIMARY, fontSize: 30}}>
                    {phone}
                  </Text>
                </Ripple>
              </View>
            ))
          : null}
        {this.props.item.hours ? (
          <View style={{marginLeft: 40}}>
            <OpenHours hours={this.props.item.hours} />
          </View>
        ) : null}
        {this.props.item.address ? (
          <AddressComponent item={this.props.item} />
        ) : null}
        {this.props.item.district && this.props.item.amenities ? (
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
            this.props.item.amenities.indexOf(Enums.Amenities.TRANSPORT) >
              -1 ? (
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
        ) : null}
        <View
          style={{
            height: this.props.paddingBottom ? this.props.paddingBottom : 0,
          }}
        />
      </Card>
    );
  }
}
