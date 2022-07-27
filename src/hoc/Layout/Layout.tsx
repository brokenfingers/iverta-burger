import { Component } from "react";
import Auxx from "../Auxx/Auxx";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import { connect } from "react-redux";
import { RootState } from "../../store/store";

type Props = {
  children: React.ReactNode;
} & mapStateToPropsType;

interface State {
  showSideDrawer: boolean;
}

class Layout extends Component<Props, State> {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Auxx>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openSidedrawer={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <div>Toolbar, SideBar, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxx>
    );
  }
}

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
