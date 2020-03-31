import React from 'react';
import {Text, Dimensions} from 'react-native';
import {ListItem} from '../model/ListItem';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {ListItemComponent} from './ListItemComponent';
import {Ripple} from 'material-bread';
import {Utility} from '../utility/Utility';
import * as Colors from '../utility/Colors';
import {NavigationStackProp} from 'react-navigation-stack';

interface Props {
  data: ListItem[];
  onUnFavoriteItem: Function;
  navigation?: NavigationStackProp;
}

export class FavoritesList extends React.Component<Props> {
  render() {
    return (
      <ScrollView style={{height: Dimensions.get('window').height}}>
        {this.props.data.map((item, index) => (
          <Ripple
            key={index}
            rippleColor={Colors.ACCENT_DARK}
            onPress={() =>
              this.props.navigation!.navigate('ObjectDetails', {
                item: item,
                iconName: Utility.iconFromItemType(item.type, item.subType),
              })
            }>
            <ListItemComponent
              style={{
                marginBottom: index == this.props.data.length - 1 ? 80 : 0,
              }}
              item={item}
              numberOfLines={3}
              onFavoriteSelected={(item: ListItem) =>
                this.props.onUnFavoriteItem(item)
              }
            />
          </Ripple>
        ))}
      </ScrollView>
    );
  }
}
