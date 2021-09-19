import styles from "./Auth.module.css";
import useInputValidator from "../../hooks/auth-form";
import useHttp from "../../hooks/use-http";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import defaultImage from "../../assets/default-profile-picture1.jpg";
const SignUp = (props) => {
  const authCtx = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [file, setFile] = useState(null);

  const imageRef = useRef();
  const imageChangeHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageUrl(fileReader.result);
        setFile(event.target.files[0]);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

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
  const {
    enteredInput: cpassword,
    inputIsInvalid: cpasswordIsInvalid,
    enteredInputIsValid: enteredCpasswordIsValid,
    reset: cpasswordReset,
    inputChangeHandler: cpasswordChangeHandler,
    inputBlurHandler: cpasswordBlurHandler,
  } = useInputValidator((input) => input === password);

  const {
    enteredInput: name,
    inputIsInvalid: nameIsInvalid,
    enteredInputIsValid: enteredNameIsValid,
    reset: nameReset,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInputValidator((input) => input.trim() !== "");

  const {
    enteredInput: collegeName,
    reset: collegeNameReset,
    inputChangeHandler: collegeNameChangeHandler,
    inputBlurHandler: collegeNameBlurHandler,
  } = useInputValidator((input) => input.trim() !== "");
  const {
    enteredInput: dob,
    reset: dobReset,
    inputChangeHandler: dobChangeHandler,
    inputBlurHandler: dobBlurHandler,
  } = useInputValidator((input) => input.trim() !== "");

  let formIsInvalid = true;
  if (
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredNameIsValid &&
    enteredCpasswordIsValid
    // && !!imageUrl
  ) {
    formIsInvalid = false;
  }

  const stylesEmail = emailIsInValid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const stylesPassword = passwordIsInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const stylesCpassword = cpasswordIsInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;
  const stylesName = nameIsInvalid
    ? `${styles.control} ${styles.invalid}`
    : styles.control;

  const singUpStyles = `${styles.auth} ${styles.signUp}`;

  const openImageUpload = () => {
    imageRef.current.click();
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("college", collegeName || "Not-Set");
    formData.append("image", file);
    formData.append("confirmPassword", cpassword);
    formData.append("dob", dob || "Not-Set");
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_URL1}/signup`,
        "POST",
        formData
      );
      authCtx.login(data.token, data.id);
    } catch (error) {
      nameReset();
      emailReset();
      passwordReset();
      cpasswordReset();
      collegeNameReset();
      dobReset();
    }
  };
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  return (
    <section className={singUpStyles}>
      {isLoading && <LoadingSpinner />}
      {isError && !isLoading && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <h1>Sign Up</h1>
      <form onSubmit={submitHandler}>
        <div className={stylesName}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameIsInvalid && (
            <p className={styles["error-text"]}>Please Enter a valid name.</p>
          )}
        </div>
        <div className={stylesEmail}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailIsInValid && (
            <p className={styles["error-text"]}>Please Enter a valid email.</p>
          )}
        </div>
        <div className={stylesPassword}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordIsInvalid && (
            <p className={styles["error-text"]}>
              Please try a strong password.
            </p>
          )}
        </div>
        <div className={stylesCpassword}>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            required
            value={cpassword}
            onChange={cpasswordChangeHandler}
            onBlur={cpasswordBlurHandler}
          />
          {cpasswordIsInvalid && (
            <p className={styles["error-text"]}>Passwords Did not Match.</p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="collegeName">College name</label>
          <input
            type="text"
            id="collegeName"
            value={collegeName}
            onBlur={collegeNameBlurHandler}
            onChange={collegeNameChangeHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="Dob">Date of Birth</label>
          <input
            type="date"
            id="Dob"
            max={today}
            min="1950-01-01"
            value={dob}
            onBlur={dobBlurHandler}
            onChange={dobChangeHandler}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="image">Upload Photo</label>
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            accept=".jpg,.png,.jpeg"
            ref={imageRef}
            onChange={imageChangeHandler}
          />

          {imageUrl && (
            <div className={styles.dekha}>
              <img src={imageUrl} alt="Preview" />
            </div>
          )}
          {!imageUrl && <p>please select an image</p>}
          <div className={styles.actions}>
            <button type="button" onClick={openImageUpload}>
              Pick An Image
            </button>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" disabled={formIsInvalid}>
            Sign Up
          </button>
          <button onClick={props.forLogIn}>Log in with existing account</button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
