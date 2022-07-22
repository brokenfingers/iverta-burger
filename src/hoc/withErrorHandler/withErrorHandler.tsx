import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxx/Auxx";

import { ClassType, Component } from "react";
import { AxiosInstance } from "axios";
import { BurgerBuilderPropsType } from "../../containers/BurgerBuilder/BurgerBuilder";
import { ClassExpression } from "typescript";

const withErrorHandler = <T extends Function, P>(
  WrappedComponent: T,
  axios: AxiosInstance
) => {
  return class extends Component<P> {
    state: { error: null | { message: string } };

    resInterceptor: number | null = null;
    reqInterceptor: number | null = null;

    constructor(props: P) {
      super(props);

      this.state = {
        error: null,
      };
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      this.reqInterceptor &&
        axios.interceptors.request.eject(this.reqInterceptor);
      this.resInterceptor &&
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error ? true : false}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
