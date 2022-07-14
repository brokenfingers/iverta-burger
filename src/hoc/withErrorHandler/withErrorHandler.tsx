
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxx/Auxx'
import {BurgerBuilder} from '../../containers/BurgerBuilder/BurgerBuilder'
// import {IBurgerBuilder} from '../../Interfaces'
import {Component} from 'react'
import {AxiosInstance} from 'axios'

interface Props{

}


const withErrorHandler = (WrappedComponent: typeof BurgerBuilder, axios:AxiosInstance) => {

    return class extends Component<Props> {
       
        state:{error: null | {message:string}}
        resInterceptor:number
        reqInterceptor:number

        constructor(props:Props ) {
            super(props)
        
            // this.setState({error:{}})
            this.state = {
                error: {
                    message: 'labas'
                }
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                // this.setState({error: null})
                return req
            })

            this.resInterceptor = axios.interceptors.response.use(res=>res, error => {
                console.log(error)
                this.setState({error: error})
                // this.state = {error :error}
                console.log(this.state)
            })

            

        }
        
     
        componentWillUnmount() {
            console.log(this.state, 'sdfdf')
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }



        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render() {
             return (
            <Aux>
                <Modal show={this.state.error ? true : false} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error && this.state.error.message}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
        )
        }
    }
}





export default withErrorHandler