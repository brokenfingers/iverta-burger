import Button from "../../../../components/UI/Button/Button";
import { InputTypes, IOrder, IStringObject } from "../../../../Interfaces";
import classes from "./ContactData.module.css";
import { useState } from "react";
import axios from "../../../../axios-orders";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { RootState } from "../../../../store/store";

import * as actions from "../../../../store/actions";
import { checkValidity, updateObject } from "../../../../shared/utility";

interface IValidRules {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
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
  formIsValid: boolean;
}

const ContactData = (props: mapStateToPropsType & mapDispatchToPropsType) => {
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
            // email validation disabled while in dev mode
            isEmail: false,
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
        value: "fastest",
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
  };

  let formData = {} as IStringObject;
  const [orderData, setOrderData] = useState(initContactData);

  const formElementsArray = [] as IOrderFormArray[];

  for (let key in orderData.orderForm) {
    formElementsArray.push({
      id: key,
      config: orderData.orderForm[key],
    });
  }


  const inputChangeHandler = (
    e: React.ChangeEvent<InputTypes>,
    identifier: string
  ) => {
    let orderForm = { ...orderData.orderForm };
    const selectedElement = updateObject(orderForm[identifier], {
      value: e.target.value,
      touched: true,
      validation: updateObject(orderForm[identifier].validation, { valid: checkValidity(e.target.value, orderForm[identifier].validation.rules) })
    })
    orderForm = updateObject(orderData.orderForm, { [identifier]: selectedElement });
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
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
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

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (
  state: RootState & { loading: boolean; orders: IOrder[] }
) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

type mapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onOrderBurger: (orderData: IOrder, token: string | null = "") => {
      dispatch(actions.purchaseBurger(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
