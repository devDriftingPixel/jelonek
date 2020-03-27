import {DataItemTypes, DataItemSubtypes} from '../model/Enums';
import App from '../../App';

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
}
