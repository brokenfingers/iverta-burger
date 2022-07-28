export const updateObject = <T, K>(oldObject: T, updatedProperties: K): T => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
