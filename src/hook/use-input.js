import { useState, useReducer } from 'react';

/** useReducer solution - no need of useReducer here */

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      // should not be true if the user still types
      // instead we use the old state
      isTouched: state.isTouched,
    };
  }

  if (action.type === 'BLUR') {
    return {
      value: state.value, // existing value
      isTouched: true,
    };
  }

  if (action.type === 'RESET') {
    return initialInputState;
  }

  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = inputState.isTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    dispatchInput({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: 'BLUR' });
  };

  const reset = () => {
    dispatchInput({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    isTouched: inputState.isTouched,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;

// const useInput = (validateValue) => {
//   // manage the value, touch and isValid state
//   const [enteredValue, setEnteredValue] = useState('');
//   const [isTouched, setIsTouched] = useState(false);

//   const valueIsValid = validateValue(enteredValue);
//   const hasError = isTouched && !valueIsValid;

//   const valueChangeHandler = (event) => {
//     setEnteredValue(event.target.value);
//   };

//   const inputBlurHandler = () => {
//     setIsTouched(true);
//   };

//   const reset = () => {
//     setEnteredValue('');
//     setIsTouched(false);
//   };

//   return {
//     value: enteredValue,
//     isValid: valueIsValid,
//     isTouched,
//     hasError,
//     valueChangeHandler,
//     inputBlurHandler,
//     reset,
//   };
// };

// export default useInput;
