import React from 'react';
import {Text} from 'react-native';
import {ListItem} from '../model/ListItem';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {ListItemComponent} from './ListItemComponent';

interface Props {
  data: ListItem[];
}

export class FavoritesList extends React.Component<Props> {
  render() {
    return (
      <ScrollView style={{marginBottom: 80}}>
        {this.props.data.map((item, index) => (
          <ListItemComponent
            key={index}
            item={item}
            onFavoriteSelected={() => {}}
          />
        ))}
      </ScrollView>
    );
  }
}
