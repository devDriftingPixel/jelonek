import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleProp} from 'react-native';
import * as Colors from '../utility/Colors';

interface RoundedBlockProps {
  height?: number;
  color?: string;
  style?: any;
}

export class RoundedBlock extends Component<RoundedBlockProps> {
  public render() {
    return (
      <View
        style={[
          {
            width: '94%',
            padding: 10,
            marginLeft: '3%',
            marginRight: '3%',
            marginBottom: 10,
            height: this.props.height ? this.props.height : 80,
            alignItems: 'center',
            backgroundColor: this.props.color ? this.props.color : '#FFFFFF ',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          },
          this.props.style,
        ]}>
        {this.props.children}
      </View>
    );
  }
}
