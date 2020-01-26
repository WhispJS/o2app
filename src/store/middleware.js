import { applyMiddleware } from "redux";
import navigationMiddleware from "./navigation/navigation.middleware";
import themesMiddleware from "./themes/themes.middleware";

const rootMiddleware = () =>
  applyMiddleware(navigationMiddleware, themesMiddleware);

export default rootMiddleware;
