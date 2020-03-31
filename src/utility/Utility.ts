import {DataItemTypes, DataItemSubtypes} from '../model/Enums';
import App from '../../App';
import {Linking} from 'react-native';
import * as Enums from '../model/Enums';
import Analytics from 'appcenter-analytics';
import Toast from 'react-native-root-toast';

export class Utility {
  public static iconFromItemType(
    type: DataItemTypes,
    subType?: DataItemSubtypes,
  ) {
    switch (type) {
      case DataItemTypes.CHEMIST:
        return 'briefcase-medical';
      case DataItemTypes.RESTAURANTS:
        return 'utensils';
      case DataItemTypes.SHOPS:
        switch (subType) {
          default:
            return 'shopping-basket';
          case DataItemSubtypes.BUILDING:
            return 'tools';
          case DataItemSubtypes.VEGETABLES:
            return 'carrot';
          case DataItemSubtypes.FOOD:
            return 'shopping-basket';
          case DataItemSubtypes.DRUGSTORE:
            return 'spray-can';
          case DataItemSubtypes.ELECTRONICS: {
            return 'blender-phone';
          }
        }
      case DataItemTypes.MEDIC:
        switch (subType) {
          case DataItemSubtypes.HOSPITAL: {
            return 'hospital';
          }
          case DataItemSubtypes.AMBULATORIES: {
            return 'clinic-medical';
          }
          default:
            return 'clinic-medical';
        }
      case DataItemTypes.OFFICE:
        switch (subType) {
          default:
            return 'building';
        }
    }
  }

  public static getNameOfMonth(monthIndex: number): string {
    const monthNames = [
      App.translate('January'),
      App.translate('February'),
      App.translate('March'),
      App.translate('April'),
      App.translate('May'),
      App.translate('June'),
      App.translate('July'),
      App.translate('August'),
      App.translate('September'),
      App.translate('October'),
      App.translate('November'),
      App.translate('December'),
    ];

    return monthNames[monthIndex];
  }

  public static getNameOfDay(dayIndex: number): string {
    const dayNames = [
      App.translate('Monday'),
      App.translate('Tuesday'),
      App.translate('Wednesday'),
      App.translate('Thursday'),
      App.translate('Friday'),
      App.translate('Saturday'),
      App.translate('Sunday'),
    ];

    return dayNames[dayIndex];
  }

  public static getShortNameOfDay(dayIndex: number): string {
    const dayNames = [
      App.translate('ShortMonday'),
      App.translate('ShortTuesday'),
      App.translate('ShortWednesday'),
      App.translate('ShortThursday'),
      App.translate('ShortFriday'),
      App.translate('ShortSaturday'),
      App.translate('ShortSunday'),
    ];

    return dayNames[dayIndex];
  }

  public static getHour(hour: string): string {
    switch (hour.length) {
      case 1:
        return `0${hour}:00`;
      case 2:
        return `${hour}:00`;
      case 4:
        return `0${hour}`;
      default:
        return hour;
    }
  }

  public static openLink(url: string) {
    const containsHttpPrefix = url.indexOf('http') > -1;
    Linking.canOpenURL(containsHttpPrefix ? url : `http://${url}`).then(
      (supported: boolean) => {
        if (supported) {
          Analytics.trackEvent(`Open external link: ${url}`, {
            Category: Enums.AnalyticsCategories.NAVIGATION,
          });
          Linking.openURL(containsHttpPrefix ? url : `http://${url}`);
        } else {
          Analytics.trackEvent(`Problem during opening link: ${url}`, {
            Category: Enums.AnalyticsCategories.FAIL,
          });
        }
      },
    );
  }

  static callNumber(phone: string): void {
    Linking.canOpenURL(`tel:${phone}`)
      .then((supported: boolean) => {
        if (supported) {
          Analytics.trackEvent(`Call phone number: ${phone}`, {
            Category: Enums.AnalyticsCategories.NAVIGATION,
          });
          Linking.openURL(`tel:${phone}`);
        } else {
          Linking.openURL(`tel:${phone}`).catch(error => {
            Toast.show(App.translate('callProblem') + phone, {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });

            Analytics.trackEvent(`Problem during phone calling: ${phone}`, {
              Category: Enums.AnalyticsCategories.FAIL,
            });
          });
        }
      })
      .catch(error => console.log(error));
  }
}
