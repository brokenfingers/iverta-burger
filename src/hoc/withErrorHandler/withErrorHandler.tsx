import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxx/Auxx";
import useHttpErrorHandler from '../../hooks/httpErrorHandle'
import { AxiosInstance } from "axios";

const withErrorHandler = <T extends Function, P>(
  WrappedComponent: T,
  axios: AxiosInstance
) => {
  return (props: P) => {

    const [error, clearError] = useHttpErrorHandler(axios)

    return (
      <Aux>
        <Modal
          show={error ? true : false}
          modalClosed={clearError as () => void}
        >
          {error && error.toString()}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
};

export default withErrorHandler;
