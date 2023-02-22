import { useState, useEffect } from 'react';
import useInput from '../hook/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    isTouched: nameInputIsTouched,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);
  let enteredEmailIsValid =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(enteredEmail);

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailIsTouched(true);
  };

  const formSubmittionHandler = (event) => {
    event.preventDefault();

    setEnteredEmailIsTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    resetNameInput();

    setEnteredEmail('');
    setEnteredEmailIsTouched(false);
    enteredEmailIsValid = false;
  };

  const emailInputIsInvalid = enteredEmailIsTouched && !enteredEmailIsValid;

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmittionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name: </label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className='error-text'>Name should not be empty!</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email:</label>
        <input
          type='email'
          id='email'
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className='error-text'>Name should not be empty!</p>
        )}
      </div>

      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
