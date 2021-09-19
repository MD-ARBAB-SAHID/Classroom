import Modal from "../UI/Modal/Modal";
import styles from "./SubjectForm.module.css";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { Fragment, useContext } from "react";
import Error from "../UI/Error/Error";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import useInputValidator from "../../hooks/auth-form";
const AddAttendance = (props) => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const {
    enteredInput: status,
    inputIsInvalid: statusIsInvalid,
    enteredInputIsValid: statusIsValid,
    reset: statusReset,
    inputChangeHandler: statusChangeHandler,
    inputBlurHandler: statusBlurHandler,
  } = useInputValidator((input) => input.trim() !== "");
  const {
    enteredInput: date,
    inputIsInvalid: dateIsInvalid,
    enteredInputIsValid: dateIsValid,
    reset: dateReset,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInputValidator((input) => input.trim() !== "");
  const submitHandler = async (event) => {
    event.preventDefault();
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_URL2}/${props.subjectId}/addAttendance`,
        "POST",
        JSON.stringify({
          date: date,
          studentId: authCtx.studentId,
          attendanceType: status,
        }),
        {
          "content-type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      authCtx.setData(data.subjects);
      props.closeModal();
    } catch (error) {
      dateReset();
      statusReset();
    }
  };
  if (isError) {
    return <Error errorText={isError} clearError={clearError} />;
  }
  const maxDate = new Date().toLocaleDateString("en-CA");
  let formIsInvalid = true;
  if (statusIsValid && dateIsValid) {
    formIsInvalid = false;
  }

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Modal onHideModal={props.closeModal}>
        <form onSubmit={submitHandler} className={styles.form}>
          <h2>Add attendance</h2>
          <div className={styles.controls}>
            <label>Choose Date: </label>
            <input
              type="date"
              autoComplete="off"
              id="date"
              name="date"
              value={date}
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
              max={maxDate}
            />
            {dateIsInvalid && (
              <p className={styles.error}>
                Please enter a valid date.
              </p>
            )}
            <label>Attendance Status:</label>
            <select
              value={status}
              onChange={statusChangeHandler}
              onBlur={statusBlurHandler}
            >
              <option value="" >Select Attendance Type</option>
              <option value="ATTENDED">Attended</option>
              <option value="UNATTENDED">Unattended</option>
              <option value="CANCELLED">Class Canceled</option>
            </select>
            {statusIsInvalid && (
              <p className={styles.error}>
                Please select a valid attendance status.
              </p>
            )}
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={props.closeModal}>
              Close
            </button>
            <button type="submit" disabled={formIsInvalid}>Add</button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};
export default AddAttendance;
