import React, { useRef, useContext } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./SubjectForm.module.css";
import useHttp from "../../hooks/use-http";
import {  useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
const SubjectForm = (props) => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const studentId = params.studentId;

  const nameRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_URL2}/${studentId}/addSubject`,
        "POST",
        JSON.stringify({ name: nameRef.current.value }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      authCtx.setData(data.subjects);
      // history.replace(`/dashboard/${authCtx.studentId}`);
      props.closeModal();
    } catch (err) {}
  };

  return (
    <Modal onHideModal={props.closeModal}>
      {isLoading && !isError && <LoadingSpinner />}
      {isError && !isLoading && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <form onSubmit={submitHandler} className={styles.form}>
        <h2>Add a new subject</h2>
        <div className={styles.controls}>
          <label>Enter Subject name : </label>
          <input
            type="text"
            autoComplete="off"
            id="subjectName"
            name="subjectName"
            ref={nameRef}
          />
        </div>
        <div className={styles.actions}>
          <button type="submit">Add</button>
          <button type="button" onClick={props.closeModal}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SubjectForm;
