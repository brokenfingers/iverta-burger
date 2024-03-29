import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Aux from "../../../hoc/Auxx/Auxx";
import Backdrop from "../../UI/Backdrop/Backdrop";

interface Props {
  closed: () => void;
  open: boolean;
  isAuth: boolean;
}

const SideDrawer = (props: Props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
