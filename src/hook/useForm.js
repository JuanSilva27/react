import { useState } from "react";

export const useForm = (initailState, refForm) => {
  const [state, setState] = useState(initailState);

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const reset = () => {
    setState(initailState);
    refForm.current?.reset();
  };
  return [state, setState, handleChange, reset];
};
