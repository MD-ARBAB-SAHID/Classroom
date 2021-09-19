import useHttp from "../../hooks/use-http";
import styles from "./Auth.module.css";
import useInputValidator from "../../hooks/auth-form";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
const Login = (props) => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);

  const {
    enteredInput: email,
    inputIsInvalid: emailIsInValid,
    enteredInputIsValid: enteredEmailIsValid,
    reset: emailReset,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInputValidator((input) => input.includes("@"));
  const {
    enteredInput: password,
    inputIsInvalid: passwordIsInvalid,
    enteredInputIsValid: enteredPasswordIsValid,
    reset: passwordReset,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInputValidator((input) => input.trim().length > 7);

  const submitHandler = async (event) => {
    event.preventDefault();
    const logInData = {
      email,
      password,
    };
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_URL1}/login`,
        "POST",
        JSON.stringify(logInData),
        { "content-type": "application/json" }
      );
      authCtx.login(data.token,data.id);
      // console.log(data);
    } catch (error) {
      emailReset();
      passwordReset();
    }
  };
  let formIsInvalid = true;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsInvalid = false;
  }

  const stylesEmail = emailIsInValid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const stylesPassword = passwordIsInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  return (
    <section className={styles.auth}>
      {isLoading && <LoadingSpinner />}
      {isError && !isLoading && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <h1>Log In</h1>
      <form onSubmit={submitHandler}>
        <div className={stylesEmail}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailIsInValid && (
            <p className={styles["error-text"]}>Please Enter a valid email.</p>
          )}
        </div>
        <div className={stylesPassword}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
          />
          {passwordIsInvalid && (
            <p className={styles["error-text"]}>
              Please use the correct password.
            </p>
          )}
        </div>
        <div className={styles.actions}>
          <button type="submit" disabled={formIsInvalid}>
            Log in
          </button>
          <button onClick={props.forSignUp}>Sign Up for new account</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
