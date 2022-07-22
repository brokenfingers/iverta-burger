import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../../../components/UI/Button/Button";
import {
  ICheckoutState,
  Ingredients,
  InputTypes,
  IStringObject,
} from "../../../../Interfaces";
import classes from "./ContactData.module.css";
import { useState } from "react";
import { axiosOrders } from "../../../../axios-orders";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { RootState } from "../../../../store/store";


interface IValidRules {
  required: boolean;
  minLength?: number;
  maxLength?: number;
}

type IValidation = {
  valid: boolean;
  rules: IValidRules;
};

interface InputElement {
  elementType: string;
  elementConfig: {
    placeholder?: string;
    type?: string;
    options?: IStringObject[];
  };
  touched: boolean;
  value: string;
  validation: IValidation;
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
  formIsValid: boolean;
}

const ContactData = (props: { ing: Ingredients; price: number }) => {
  const initContactData: IContactData = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        touched: false,
        validation: {
          rules: {
            required: true,
          },
          valid: false,
        },
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        touched: false,
        validation: {
          rules: {
            required: true,
          },
          valid: false,
        },
      },
      postCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Post Code",
        },
        value: "",
        touched: false,
        validation: {
          rules: {
            required: true,
            minLength: 5,
            maxLength: 5,
          },
          valid: false,
        },
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        touched: false,
        validation: {
          rules: {
            required: true,
          },
          valid: false,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        touched: false,
        validation: {
          rules: {
            required: true,
          },
          valid: false,
        },
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
        touched: false,
        validation: {
          rules: {
            required: true,
          },
          valid: true,
        },
      },
    },
    formIsValid: true,
    loading: false,
  };

  const navigate = useNavigate();
  const checkoutState = useOutletContext<ICheckoutState>();
  let formData = {} as IStringObject;
  const [orderData, setOrderData] = useState(initContactData);

  const formElementsArray = [] as IOrderFormArray[];

  for (let key in orderData.orderForm) {
    formElementsArray.push({
      id: key,
      config: orderData.orderForm[key],
    });
  }
  const checkValidity = (value: string, rules: IValidRules): boolean => {
    let isValid = true;
    if (!rules.required) return isValid;
    if (rules.required) isValid = value.trim() !== "";
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<InputTypes>,
    identifier: string
  ) => {
    let orderForm = { ...orderData.orderForm };
    const selectedElement = { ...orderForm[identifier] };
    selectedElement.value = e.target.value;
    selectedElement.touched = true;
    selectedElement.validation = {
      ...selectedElement.validation,
      valid: checkValidity(e.target.value, selectedElement.validation.rules),
    };
    orderForm = { ...orderData.orderForm, [identifier]: selectedElement };
    setOrderData((pr) => ({ ...pr, orderForm: orderForm }));
    if (!formInputsAreValid(orderData.orderForm)) {
      setOrderData((pr) => ({ ...pr, formIsValid: true }));
    }
  };

  const formInputsAreValid = (orderForm: IOrderForm): boolean => {
    let isValid = true;
    for (let form in orderForm) {
      if (!orderForm[form].validation.valid) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const touchAllInputs = (ContData: IContactData): IOrderForm => {
    let orderForm = { ...ContData.orderForm };
    for (let form in orderForm) {
      const elementData = orderForm[form];
      elementData.touched = true;
      orderForm = { ...orderForm, [form]: elementData };
    }
    return orderForm;
  };

  const orderHandler = () => {
    if (!formInputsAreValid(orderData.orderForm)) {
      setOrderData((prev) => ({
        ...prev,
        formIsValid: false,
        orderForm: touchAllInputs(prev),
      }));
      return;
    } else {
      setOrderData((prev) => ({ ...prev, formIsValid: true }));
    }

    setOrderData((prev) => ({ ...prev, loading: true }));

    const simplifyStateForm = (orderform: IOrderForm): IStringObject => {
      let simplifiedForm = {} as IStringObject;
      for (let formKey in orderform) {
        simplifiedForm[formKey] = orderform[formKey].value;
      }
      return simplifiedForm;
    };

    formData = simplifyStateForm(orderData.orderForm);

    const order = {
      ingredients: props.ing,
      price: props.price,
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
          touched={formElement.config.touched}
          invalid={!formElement.config.validation.valid}
          key={formElement.id}
          value={formElement.config.value}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          changed={(e) => {
            inputChangeHandler(e, formElement.id);
          }}
        />
      ))}
      <Button
        disabled={!orderData.formIsValid}
        btnType="Success"
        clicked={orderHandler}
      >
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

const mapStateToProps = (state: RootState) => {
  return {
    ing: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(ContactData);

