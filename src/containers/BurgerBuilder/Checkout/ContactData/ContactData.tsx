import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../../../components/UI/Button/Button";
import { ICheckoutState, IStringObject } from "../../../../Interfaces";
import classes from "./ContactData.module.css";
import { useEffect, useState } from "react";
import { axiosOrders } from "../../../../axios-orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";

type IValidation = { valid: boolean, required: boolean }


interface InputElement {
  elementType: string;
  elementConfig: {
    // [key: string]: string,
    placeholder?: string
    type?: string
    options?: IStringObject[]
  };
  value: string;
  validation: IValidation
}


interface IOrderForm {
  [key: string]: InputElement;
}

interface IOrderFormArray {
  id: string;
  config: InputElement;
}

interface IContactData {
  orderForm: IOrderForm;
  loading: boolean;
}

const ContactData = () => {
  const initContactData: IContactData = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
          valid: false
        }
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
          valid: false
        }
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Post Code",
        },
        value: "",
        validation: {
          required: true,
          valid: false
        }
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
          valid: false
        }
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          valid: false
        }
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        validation: {
          required: false,
          valid: true
        }
      },
    },
    loading: false,
  };

  const navigate = useNavigate();
  const checkoutState = useOutletContext<ICheckoutState>();
  let formData = {} as IStringObject
  const [orderData, setOrderData] = useState(initContactData);

  const formElementsArray = [] as IOrderFormArray[];

  for (let key in orderData.orderForm) {
    formElementsArray.push({
      id: key,
      config: orderData.orderForm[key],
    });
  }
  const checkValidity = (value: string, required: boolean): boolean => {
    let isValid = false;
    if (required) {
      isValid = value.trim() !== ''
    } else {
      isValid = true
    }
    return isValid
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, identifier: string) => {
    const updatedForm = { ...orderData.orderForm }
    const updatedFormElemement = { ...updatedForm[identifier] }
    const updatedValidation = { ...updatedFormElemement.validation }
    updatedFormElemement.validation = updatedValidation
    console.log(checkValidity(e.target.value, updatedValidation.required))
    updatedFormElemement.value = e.target.value
    updatedValidation.valid = checkValidity(e.target.value, updatedValidation.required)



    setOrderData(pr => ({ ...pr, orderForm: updatedForm }))
  }

  const orderHandler = () => {
    setOrderData((prev) => ({ ...prev, loading: true }));


    const simplifyStateForm = (orderform: IOrderForm): IStringObject => {
      let simplifiedForm = {} as IStringObject
      for (let formKey in orderform) {
        simplifiedForm[formKey] = orderform[formKey].value
      }
      return simplifiedForm
    }

    formData = simplifyStateForm(orderData.orderForm)




    const order = {
      ingredients: checkoutState.ingredients,
      price: checkoutState.price,
      orderData: formData,
      deliveryMethod: "fastest",
    };

    axiosOrders
      .addOrder(order)
      .then((response) => {
        setOrderData((prev) => ({ ...prev, loading: false }));
        navigate("/");
      })
      .catch((err) => {
        setOrderData((prev) => ({ ...prev, loading: false }));
        navigate("/");
      });
  };
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          value={formElement.config.value}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          changed={e => { inputChangeHandler(e, formElement.id) }}
        />
      ))}
      <Button btnType="Success" clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  );
  if (orderData.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
