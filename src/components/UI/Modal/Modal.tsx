import React from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxx/Auxx'
import Backdrop from '../Backdrop/Backdrop'

interface Props {
    children?: React.ReactNode
    show: boolean
    modalClosed: () => void
}

type modalMemo = ((prevProps: Readonly<Props>, nextProps: Readonly<Props>) => boolean)

const modalMemoDiff: modalMemo = (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.show
}

const Modal: React.FC<Props> = props => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {
                    props.children
                }
            </div>
        </Aux>
    )

}

export default React.memo(Modal, modalMemoDiff) 