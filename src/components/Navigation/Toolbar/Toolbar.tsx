import Logo from "../../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";

interface Props {
  openSidedrawer: () => void;
  isAuth: boolean;
}

const Toolbar: React.FC<Props> = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle open={props.openSidedrawer} />
    <Logo />
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default Toolbar;
