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
}
