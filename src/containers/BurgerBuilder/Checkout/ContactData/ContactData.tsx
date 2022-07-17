import { useNavigate, useOutletContext } from "react-router-dom"
import Button from "../../../../components/UI/Button/Button"
import { ICheckoutState } from "../../../../Interfaces"
import classes from './ContactData.module.css'
import { useEffect, useState } from "react"
import { axiosOrders } from '../../../../axios-orders'
import Spinner from "../../../../components/UI/Spinner/Spinner"

const ContactData = () => {


    const navigate = useNavigate()
    const checkoutState = useOutletContext<ICheckoutState>()


    const initData = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    const [orderData, setOrderData] = useState(initData)


    const orderHandler = () => {

        setOrderData(prev => ({ ...prev, loading: true }))
        const order = {
            ingredients: checkoutState.ingredients,
            price: checkoutState.price,
            customer: {
                name: 'Stasys',
                address: {
                    street: 'Procincijos 21',
                    postCode: 'lt61321',
                    country: 'Lithuania'
                },
                email: 'baranku20@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axiosOrders.addOrder(order)
            .then(response => {
                setOrderData(prev => ({ ...prev, loading: false }))
                navigate('/')
            })
            .catch(err => {
                setOrderData(prev => ({ ...prev, loading: false }))
                navigate('/')
            })

    }
    let form = (
        <form>
            <input className={classes.Input} type='text' name='name' placeholder='Your name' />
            <input className={classes.Input} type='email' name='email' placeholder='Your email' />
            <input className={classes.Input} type='text' name='street' placeholder='Your street' />
            <input className={classes.Input} type='text' name='postal' placeholder='Postal code' />
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>

        </form>
    )
    if (orderData.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )

}

export default ContactData