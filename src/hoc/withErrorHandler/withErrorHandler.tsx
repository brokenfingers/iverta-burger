
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxx/Auxx'
import {BurgerBuilder} from '../../containers/BurgerBuilder/BurgerBuilder'
import {IBurgerBuilder} from '../../Interfaces'
import {Component} from 'react'
import { AxiosInstance } from 'axios'

interface Props{

}


const withErrorHandler = (WrappedComponent: typeof BurgerBuilder, axios:AxiosInstance) => {

    return class extends Component<Props> {
        state:{error: null | {message:string}}= {
            error:null
            }

        // constructor(props:Props) {
        //     super(props)
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: false})
        //         return req
        //     })
        //     axios.interceptors.response.use(res=>res, error => {
        //         this.setState({error: error})
        //     })
        // }    

        componentDidMount() {
        axios.interceptors.request.use(req => {
            this.setState({error: false})
            return req
        })
        axios.interceptors.response.use(res=>res, error => {
            this.setState({error: error})
        })
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



// const withErrorHandler = (WrappedComponent: typeof BurgerBuilder) => {

//     return ((props: Props) => {
//         return (
//             <Aux>
//                 <Modal show modalClosed={() => { }}>
//                     Something didn't work!
//                 </Modal>
//                 <WrappedComponent {...props} />
//             </Aux>
//         )
//     }
//     )

// }


export default withErrorHandler