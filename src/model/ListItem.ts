import {
  Districts,
  DataItemTypes,
  DataItemSubtypes,
  Amenities,
} from '../model/Enums';
import {Hours} from './Hours';

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
  hours: Hours[];
  www: string;
  facebook: string;
}
