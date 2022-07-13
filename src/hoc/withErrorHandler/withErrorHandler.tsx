
import React, { ClassicComponent, ClassicComponentClass, FC, FunctionComponent } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxx/Auxx'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'

interface Props {
    [key: string]: string
}



const withErrorHandler = (WrappedComponent: React.FC) => {

    return ((props: Props) => {
        return (
            <Aux>
                <Modal show modalClosed={() => { }}>
                    Something didn't work!
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
    )

}


export default withErrorHandler