import { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import { useLocation } from "react-router-dom";

interface IActiveLinks {
  currentLocation: string;
  active: { [key: string]: boolean };
}

const NavigationItems = () => {
  const currentUrl = useLocation();

  const initActiveLinks = {
    currentLocation: "/",
    active: {
      "/": true,
      "/orders": false,
    },
  };
  const [activeLinks, setActiveLinks] = useState<IActiveLinks>(initActiveLinks);

  const setCurrentLinkTrue = (path: string) => {
    setActiveLinks((old) => ({
      ...old,
      active: { [path]: true },
    }));
  };

  const setAllLinksfalse = () => {
    setActiveLinks((old) => ({
      ...old,
      active: { ["/"]: false, ["/orders"]: false },
    }));
  };

  if (activeLinks.currentLocation !== currentUrl.pathname) {
    setActiveLinks((old) => ({ ...old, currentLocation: currentUrl.pathname }));
    setAllLinksfalse();
    if (currentUrl.pathname === "/") {
      setCurrentLinkTrue("/");
    } else {
      setCurrentLinkTrue("/orders");
    }
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem active={activeLinks.active["/"]} link="/">
        Burger Builder
      </NavigationItem>
      <NavigationItem active={activeLinks.active["/orders"]} link="/orders">
        Orders
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
