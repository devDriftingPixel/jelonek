import React from 'react';
import {Text} from 'react-native';
import {ListItem} from '../model/ListItem';

interface Props {
  data: ListItem[];
}

export class FavoritesList extends React.Component<Props> {
  render() {
    return (
      <>
        <Text> Lista</Text>
      </>
    );
  }
}
