import Modal from "../UI/Modal/Modal";
import styles from "./SubjectForm.module.css";
import useInputValidator from "../../hooks/auth-form";
const UpdateAttendanceForm = (props) => {
  const {
    enteredInput: status,
    inputIsInvalid: statusIsInvalid,
    enteredInputIsValid: statusIsValid,
    inputChangeHandler: statusChangeHandler,
    inputBlurHandler: statusBlurHandler,
  } = useInputValidator((input) => input.trim() !== "");
  const clickHandler = () => {
    props.updateHandler(status);
  };
  let formIsInvalid = true;
  if (statusIsValid) {
    formIsInvalid = false;
  }
  return (
    <Modal onHideModal={props.closeModal}>
      <form className={styles.form}>
        <h2>Update attendance</h2>
        <div className={styles.controls}>
          <label>Date: {props.text.date}</label>
          <label>Status: {props.text.status}</label>
          <label>Update Attendance:</label>
          <select
            value={status}
            // ref={statusRef}
            onChange={statusChangeHandler}
            onBlur={statusBlurHandler}
          >
            <option  >Select Attendance Type</option>
            <option value="ATTENDED">Attended</option>
            <option value="UNATTENDED">Unattended</option>
            <option value="CANCELLED">Class Canceled</option>
          </select>
          {statusIsInvalid && (
            <p className={styles.error}>
              Please select a valid attedance status.
            </p>
          )}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={props.closeModal}>
            Close
          </button>
          <button type="button" disabled={formIsInvalid} onClick={clickHandler}>
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default UpdateAttendanceForm;
