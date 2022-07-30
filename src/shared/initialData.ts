import { IStringObject } from "../Interfaces";

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv Auth vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

export const initAuthState = {
    controls: {
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Mail Address",
            },
            value: "",
            touched: false,
            validation: {
                rules: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
            },
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Password",
            },
            value: "",
            touched: false,
            validation: {
                rules: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
            },
        },
    },
    isSignUp: true,
};

//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM Auth MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv ContactData vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv


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

export interface IOrderForm {
    [key: string]: InputElement;
}

export interface IOrderFormArray {
    id: string;
    config: InputElement;
}

export interface IContactData {
    orderForm: IOrderForm;
    formIsValid: boolean;
}
export const initContactData: IContactData = {
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


//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM ContactData MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM