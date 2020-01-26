import React from "react";
import { useSelector } from "react-redux";
import routes from "../config/routes";
import { getCurrentPage } from "../store/navigation/navigation.selectors";

const Home = props => {
  const currentPath = useSelector(getCurrentPage);
  return routes.map(
    (route, index) =>
      route.path === currentPath && <route.component key={index} {...props} />
  );
};

export default Home;
