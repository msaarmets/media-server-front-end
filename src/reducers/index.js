import {combineReducers} from 'redux';
import FilesReducer from './reducer_files_list';
import SettingsReducer from './reducer_settings';

const rootReducer = combineReducers({
    fileslist: FilesReducer,
    settings: SettingsReducer
  });
  
  export default rootReducer;