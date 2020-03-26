import {
  Districts,
  DataItemTypes,
  DataItemSubtypes,
  Amenities,
} from '../model/Enums';

export interface ListItem {
  name: string;
  fullName: string;
  district: Districts;
  type: DataItemTypes;
  subType?: DataItemSubtypes;
  isFavorite: boolean;
  amenities: Amenities[];
  email: [string];
  telephone: string[];
  additionalInfo: string;
  hours: [][];
  www: string;
  facebook: string;
}
