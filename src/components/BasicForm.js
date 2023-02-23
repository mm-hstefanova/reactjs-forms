import useInput from '../hook/use-input';

const BasicForm = (props) => {
  /** First Name field */
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    isTouched: firstNameIsTouched,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim() != '');

  const firstNameInputClasses = firstNameHasError
    ? 'form-control invalid'
    : 'form-control';

  /** Last Name field */

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    isTouched: lastNameIsTouched,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() != '');

  const lastNameInputClasses = lastNameHasError
    ? 'form-control invalid'
    : 'form-control';

  /** Email Name field */

  const {
    value: emailValue,
    isValid: emailIsValid,
    isTouched: emailIsTouched,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );

  const emailInputClasses = emailHasError
    ? 'form-control invalid'
    : 'form-control';

  /** Form Submit */
  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (firstNameHasError || lastNameHasError || emailHasError) {
      return;
    }
    firstNameReset();
    lastNameReset();
    emailReset();
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />

          {firstNameHasError && (
            <p className='error-text'> The field should not be empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />

          {lastNameHasError && (
            <p className='error-text'> The field should not be empty</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='email'
          id='name'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />

        {emailHasError && (
          <p className='error-text'> The email is not correct</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
