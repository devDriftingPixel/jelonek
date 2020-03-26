import {DataItemTypes, DataItemSubtypes} from '../model/Enums';

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
}
