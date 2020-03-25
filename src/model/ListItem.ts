import {
  Districts,
  DataItemTypes,
  DataItemSubtypes,
  Amenities,
} from '../model/Enums';

export interface ListItem {
  name: string;
  district: Districts;
  type: DataItemTypes;
  subType?: DataItemSubtypes;
  isFavorite: boolean;
  amenities: Amenities[];
}
