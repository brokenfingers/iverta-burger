import Button from "../../../../components/UI/Button/Button"
import classes from './ContactData.module.css'

const ContactData = () => {


    const initData = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your name' />
                <input className={classes.Input} type='email' name='email' placeholder='Your email' />
                <input className={classes.Input} type='text' name='street' placeholder='Your street' />
                <input className={classes.Input} type='text' name='postal' placeholder='Postal code' />
                <Button btnType="Success" clicked={() => { }}>ORDER</Button>
            </form>
        </div>
    )

}

export default ContactData