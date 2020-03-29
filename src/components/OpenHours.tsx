import React from 'react';
import * as Colors from '../utility/Colors';
import {Icon} from 'material-bread';
import {View, Text} from 'react-native';
import {Hours} from '../model/Hours';
import {Utility} from '../utility/Utility';
import App from '../../App';

interface Props {
  hours: Hours[];
}

export class OpenHours extends React.Component<Props> {
  private hourItems: string[];

  constructor(props: Props) {
    super(props);
    this.hourItems = [];

    if (this.props.hours.length == 0)
      this.hourItems.push(`${App.translate('24hours')}`);
    else
      this.props.hours.forEach((dayHours: Hours) => {
        console.log(dayHours);
        if (dayHours.startDay == null)
          this.hourItems.push(
            `${Utility.getHour(dayHours.hours[0])}-${Utility.getHour(
              dayHours.hours[1],
            )} ${App.translate('allWeek')}`,
          );
        else if (dayHours.startDay != undefined && dayHours.endDay == undefined)
          this.hourItems.push(
            `${Utility.getHour(dayHours.hours[0])}-${Utility.getHour(
              dayHours.hours[1],
            )} ${Utility.getNameOfDay(dayHours.startDay)}`,
          );
        else
          this.hourItems.push(
            `${Utility.getHour(dayHours.hours[0])}-${Utility.getHour(
              dayHours.hours[1],
            )} ${Utility.getShortNameOfDay(
              dayHours.startDay,
            )}-${Utility.getShortNameOfDay(dayHours.endDay)}`,
          );
      });
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginHorizontal: 20,
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Icon
          name={'access-time'}
          size={40}
          color={Colors.PRIMARY}
          style={{width: 40, height: 43, marginRight: 10}}
        />
        <View style={{marginLeft: 5}}>
          {this.hourItems.map((item, index) => (
            <Text
              key={index}
              style={{color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 16}}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}
