import React, {Component} from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '../model/ListItem';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItemComponent} from '../components/ListItemComponent';
import {BottomNavigation} from '../components/BottonNavigation';
import * as Constants from '../utility/Constants';
import App from '../../App';
import {Amenities, AnaliticsCategories} from '../model/Enums';
import Analytics from 'appcenter-analytics';
import {Ripple} from 'material-bread';
import * as Colors from '../utility/Colors';
import {Utility} from '../utility/Utility';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenShops extends AbstractScreen {
  protected allItems: ListItem[];

  constructor(props: Props) {
    super(props);
    this.allItems = [];
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    ExternalDataService.getShops()
      .then((shops: ListItem[]) => {
        this.allItems = shops;
        this.setState({
          items: this.allItems.sort((a: ListItem, b: ListItem) =>
            a.isFavorite ? (this.state.items.length > 0 ? 0 : -1) : 0,
          ),
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
          <Ripple
            rippleColor={Colors.ACCENT_DARK}
            onPress={() =>
              this.props.navigation!.navigate('ObjectDetails', {
                item: item,
                iconName: Utility.iconFromItemType(item.type, item.subType),
              })
            }>
            <ListItemComponent
              item={item}
              onFavoriteSelected={(item: ListItem) =>
                this.onFavoriteSelected(item)
              }
            />
          </Ripple>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  protected handleChange(value: number) {
    this.setState({value});
  }

  protected footerContent = () => {
    return (
      <BottomNavigation
        actions={[
          {
            iconName: Constants.icons.amenitiesTransport,
            name: App.translate('transportIconTooltip'),
            returnData: Amenities.TRANSPORT,
            onPress: () => {},
          },
          {
            iconName: Constants.icons.amenitiesPickup,
            name: App.translate('pickupIconTooltip'),
            returnData: Amenities.PICKUP,
            onPress: () => {},
          },
          {
            iconName: Constants.icons.amenitiesInPlace,
            name: App.translate('inPlaceIconTooltip'),
            returnData: Amenities.IN_PLACE,
            onPress: () => {},
          },
        ]}
        onSelectionChange={(selectedAmenities: Amenities) =>
          this.onSelectionChange(selectedAmenities)
        }
      />
    );
  };

  onSelectionChange(selectedAmenities: Amenities) {
    Analytics.trackEvent(`Filter items by amenities: ${selectedAmenities}`, {
      Category: AnaliticsCategories.USER_EXPERIENCE,
    });

    this.setState({
      items:
        selectedAmenities == undefined
          ? this.allItems
          : this.allItems.filter(
              item => item.amenities.indexOf(selectedAmenities) != -1,
            ),
    });
  }

  render() {
    return super.render();
  }
}
