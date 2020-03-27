import React from 'react';
import {Text} from 'react-native';
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
      <ScrollView style={{marginBottom: 80}}>
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
              item={item}
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
