import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxx/Auxx";

import { useEffect, useState } from "react";
import { AxiosInstance } from "axios";

const withErrorHandler = <T extends Function, P>(
  WrappedComponent: T,
  axios: AxiosInstance
) => {
  return (props: P) => {
    const initState: { error: null | { message: null | string } } = { error: null };
    const [state, setState] = useState(initState)


    let resInterceptor: number | null = null;
    let reqInterceptor: number | null = null;


    useEffect(() => {

      return () => {
        reqInterceptor &&
          axios.interceptors.request.eject(reqInterceptor);
        resInterceptor &&
          axios.interceptors.response.eject(resInterceptor);
      }

    }, [reqInterceptor, resInterceptor])


    reqInterceptor = axios.interceptors.request.use((req) => {
      setState(prev => ({ ...prev, error: null }));
      return req;
    });

    resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setState(prev => ({ ...prev, error: error }));
      }
    );


    const errorConfirmedHandler = () => {
      setState(prev => ({ ...prev, error: null }));
    };

    return (
      <Aux>
        <Modal
          show={state.error ? true : false}
          modalClosed={errorConfirmedHandler}
        >
          {state.error && state.error.message}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
};

export default withErrorHandler;
