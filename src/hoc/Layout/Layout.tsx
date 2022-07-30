import { useState } from "react";
import Auxx from "../Auxx/Auxx";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import { connect } from "react-redux";
import { RootState } from "../../store/store";

type Props = {
  children: React.ReactNode;
} & mapStateToPropsType;


const Layout: React.FC<Props> = (props) => {

  const initState = {
    showSideDrawer: false,
  };
  const [state, setState] = useState(initState)


  const sideDrawerClosedHandler = () => {
    setState({ showSideDrawer: false });
  };

  const sideDrawerOpenHandler = () => {
    setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };


  return (
    <Auxx>
      <Toolbar
        isAuth={props.isAuthenticated}
        openSidedrawer={sideDrawerOpenHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={state.showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxx>
  );

}

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
