import React from 'react';
import {Text} from 'react-native';
import {ListItem} from '../model/ListItem';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {ListItemComponent} from './ListItemComponent';
import App from '../../App';
import * as Colors from '../utility/Colors';

interface Props {}

export class AboutApp extends React.Component<Props> {
  render() {
    return (
      <>
        <Text
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            color: Colors.PRIMARY,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {App.translate('aboutAppTitle')}
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            textAlign: 'justify',
            fontSize: 16,
          }}>
          {App.translate('aboutAppContent')}
        </Text>
      </>
    );
  }
}
