import { useState, useRef } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if (enteredName.trim() !== '') {
      setEnteredNameIsValid(true);
      return;
    }
  };

  const nameInputBlurHandler = () => {
    setEnteredNameIsTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }
  };

  const formSubmittionHandler = (event) => {
    event.preventDefault();

    setEnteredNameIsTouched(true);

    if (enteredName.trim() == '') {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredName('');
  };

  const nameInputIsInvalid = enteredNameIsTouched && !enteredNameIsValid;

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';
  return (
    <form onSubmit={formSubmittionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name: {enteredName}</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Name should not be empty!</p>
        )}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
