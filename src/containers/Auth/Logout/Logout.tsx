import { TDispatch } from "../../../store/store";
import * as actions from "../../../store/actions/index";
import { FunctionComponent, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Logout: FunctionComponent<mapDispatchToPropsType> = (props) => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Navigate to="/" />;
};

type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
