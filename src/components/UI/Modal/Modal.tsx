import { Component } from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxx/Auxx'
import Backdrop from '../Backdrop/Backdrop'
interface Props {
    children?: React.ReactNode
    show: boolean
    modalClosed: () => void
}



class Modal extends Component<Props> {
    shouldComponentUpdate(nextProps: Props) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {
                        this.props.children
                    }
                </div>
            </Aux>
        )
    }
}

export default Modal