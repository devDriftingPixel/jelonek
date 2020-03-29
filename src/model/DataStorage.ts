import {ListItem} from './ListItem';
import {Message} from './Message';
import {Phone} from './Phone';
import {AppState} from './AppState';

export interface DataStorage {
  objects: ListItem[];
  messages: Message[];
  phones: Phone[];
  appState: AppState;
}
