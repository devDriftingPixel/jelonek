import React from 'react';
import {NavigationStackProp} from 'react-navigation-stack';
import {AbstractScreen} from './AbstractScreen';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '../model/ListItem';
import {ExternalDataService} from '../services/ExternalDataService';
import {ListItemComponent} from '../components/ListItemComponent';
import {BottomNavigation} from '../components/BottonNavigation';
import * as Constants from '../utility/Constants';
import App from '../../App';
import {Amenities, AnalyticsCategories} from '../model/Enums';
import Analytics from 'appcenter-analytics';
import {Ripple} from 'material-bread';
import * as Colors from '../utility/Colors';
import {Utility} from '../utility/Utility';
import RestService from '../services/RestService';
import {View, Text} from 'react-native';
import NetworkService from '../services/NetworkService';

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
    this.allItems = ExternalDataService.getInstance().getShops();
    this.setState({
      items: this.allItems.sort((a: ListItem, b: ListItem) =>
        a.isFavorite ? (this.state.items.length > 0 ? 0 : -1) : 0,
      ),
    });

    if (!NetworkService.getInstance().isConnected()) {
      this.setState({progressBarVisible: false});
      return;
    }

    if (
      Date.now() -
        ExternalDataService.getInstance()
          .getShopsLastUpdate()
          .getTime() <
      60 * 60 * 1000
    ) {
      this.setState({progressBarVisible: false});
      return;
    }

    RestService.getInstance()
      .updateShops()
      .then((response: Response) => {
        return response.text();
      })
      .then((textUpdateData: string) => {
        const lastUpdateDbDate = new Date(textUpdateData);
        const lastUpdateLocalDate = ExternalDataService.getInstance()
          .getShopsLastUpdate()
          .getTime();

        const difference = lastUpdateDbDate.getTime() - lastUpdateLocalDate;
        if (difference > 0) {
          return RestService.getInstance().getShops();
        } else {
          ExternalDataService.getInstance().updateShopsLastUpdate();
          this.setState({progressBarVisible: false});
          return {then: () => {}};
        }
      })
      .then((response: Response) => {
        return response.text();
      })
      .then((jsonShopsData: string) => {
        const newshopData = JSON.parse(jsonShopsData) as ListItem[];

        ExternalDataService.getInstance().updateShops(newshopData);
        this.getItems();
      })
      .catch((error: any) => {
        console.error(error);
        this.setState({progressBarVisible: false});
      });
  }

  protected pageContent = () => {
    return (
      <>
        <FlatList
          data={this.state.items}
          renderItem={({item}) => (
            <Ripple
              rippleColor={Colors.ACCENT}
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
      </>
    );
  };

  protected footerContent = () => {
    return (
      <BottomNavigation
        style={{height: 60}}
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
      Category: AnalyticsCategories.USER_EXPERIENCE,
    });

    this.setState({
      items:
        selectedAmenities == undefined
          ? this.allItems
          : this.allItems.filter(
              item =>
                item.amenities &&
                item.amenities.indexOf(selectedAmenities) != -1,
            ),
    });
  }

  render() {
    return super.render();
  }
}
