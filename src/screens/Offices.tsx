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
import {ExtendedListItemComponent} from '../components/ExtendedListItemComponent';

type Props = {
  navigation?: NavigationStackProp;
};

export class ScreenOffices extends AbstractScreen {
  protected allItems: ListItem[];

  constructor(props: Props) {
    super(props);
    this.allItems = [];
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    ExternalDataService.getOffices()
      .then((offices: ListItem[]) => {
        this.allItems = offices;
        this.setState({
          items: this.allItems,
          progressBarVisible: false,
        });
      })
      .catch((error: any) => console.error(error));
  }

  protected pageContent = () => {
    return (
      <FlatList
        data={this.state.items as ListItem[]}
        renderItem={({item}) => (
          <Ripple
            rippleColor={Colors.ACCENT_DARK}
            onPress={() =>
              this.props.navigation!.navigate('ObjectDetails', {
                item: item,
                iconName: Utility.iconFromItemType(item.type, item.subType),
              })
            }>
            <ExtendedListItemComponent
              item={item as ListItem}
              paddingBottom={10}
            />
          </Ripple>
        )}
        keyExtractor={(item, index) => index.toString()}
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
              item => item.amenities.indexOf(selectedAmenities) != -1,
            ),
    });
  }

  render() {
    return super.render();
  }
}
