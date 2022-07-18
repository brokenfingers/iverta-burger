import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

interface Props {
  children: React.ReactNode;
  link: string;
  active: boolean;
}

const NavigationItem = (props: Props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        end
        to={props.link}
        className={props.active ? classes.active : undefined}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
