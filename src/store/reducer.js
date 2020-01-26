import { combineReducers } from "redux";
import navigationReducer from "./navigation/navigation.reducer";
import themeReducer from "./themes/themes.reducer";

const rootReducer = () =>
  combineReducers({ navigation: navigationReducer, themes: themeReducer });

export default rootReducer;
