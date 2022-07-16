import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary'

const Checkout = () => {

    const initState = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }
    const [checkoutState, setCheckoutState] = useState(initState)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        console.log(searchParams.toString())
    }, [])

    const navigate = useNavigate()
    return (
        <div>
            <CheckoutSummary
                ingredients={checkoutState.ingredients}
                checkoutCanceled={() => { navigate(-1) }}
                checkoutContinued={() => { navigate('checkout/contact-data') }}
            />
        </div>
    )


}

export default Checkout