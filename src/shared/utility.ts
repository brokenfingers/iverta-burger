export const updateObject = <T, K>(oldObject: T, updatedProperties: K): T => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};


interface IValidRules {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}


export const checkValidity = (value: string, rules: IValidRules): boolean => {
  let isValid = true;
  if (!rules.required) return isValid;
  if (rules.required) isValid = value.trim() !== "";
  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }
  if (rules.isEmail) {
    isValid =
      /[a-zA-Z0-9.]*@[a-z]*[.a-z]*/.test(value) && isValid;
  }
  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }
  return isValid;
};