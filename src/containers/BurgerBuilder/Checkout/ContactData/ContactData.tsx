import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../../../components/UI/Button/Button";
import { ICheckoutState } from "../../../../Interfaces";
import classes from "./ContactData.module.css";
import { useEffect, useState } from "react";
import { axiosOrders } from "../../../../axios-orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";


interface IStringObject {
  [key: string]: string;
}

interface InputElement {
  elementType: string;
  elementConfig: {
    // [key: string]: string,
    placeholder?: string
    type?: string
    options?: IStringObject[]
  };
  value: string;
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
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Post Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
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
      },
    },
    loading: false,
  };

  const navigate = useNavigate();
  const checkoutState = useOutletContext<ICheckoutState>();

  const [orderData, setOrderData] = useState(initContactData);

  const formElementsArray = [] as IOrderFormArray[];

  for (let key in orderData.orderForm) {
    formElementsArray.push({
      id: key,
      config: orderData.orderForm[key],
    });
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, identifier: string) => {
    const updatedForm = { ...orderData.orderForm }
    const updatedFormElememnt = { ...updatedForm[identifier] }
    updatedFormElememnt.value = e.target.value
    updatedForm[identifier] = updatedFormElememnt

    setOrderData(pr => ({ ...pr, orderForm: updatedForm }))
  }

  const orderHandler = () => {
    setOrderData((prev) => ({ ...prev, loading: true }));
    const order = {
      ingredients: checkoutState.ingredients,
      price: checkoutState.price,
      customer: {
        name: "Stasys",
        address: {
          street: "Procincijos 21",
          postCode: "lt61321",
          country: "Lithuania",
        },
        email: "baranku20@gmail.com",
      },
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
    <form>
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
