import {ListItem} from './ListItem';
import {Message} from './Message';

export interface DataStorage {
  objects: ListItem[];
  messages: Message[];
  phones: Phone[];
}
