import Modal from "../UI/Modal/Modal";
import styles from "./ShowHistory.module.css";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { useContext, useState } from "react";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import Error from "../UI/Error/Error";
import DeleteAttendanceForm from "./DeleteAttendanceForm";
import UpdateAttendanceForm from "./UpdateAttendanceForm";
const reqData = (attendanceArray, attendanceId) => {
  const reqArray = attendanceArray.filter((item) => item._id === attendanceId);
  return {
    date:reqArray[0].date,
    status:reqArray[0].attendanceType
  }
};
const ShowHistory = (props) => {
  const [showDeleteForm, setShowDeleteForm] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState();
  const [attendanceId, setAttendanceId] = useState();
  const { reqSubject } = props;
  const reqAttendance = reqSubject.attendance;
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const updateHandler = async (attendanceType) => {
    setAttendanceId();
    setShowUpdateForm();
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_URL2}/updateAttendance/${attendanceId}`,
        "PATCH",
        JSON.stringify({
          studentId: authCtx.studentId,
          subjectId: reqSubject._id,
          attendanceType:attendanceType,
        }),
        {
          "content-type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      authCtx.setData(data.subjects)
    } catch (error) {}
  };
  const deleteClickHandler = (event) => {
    setAttendanceId(event.target.value);
    setShowDeleteForm((prevState) => !prevState);
  };
  const updateClickHandler = (event) => {
    setAttendanceId(event.target.value);
    setShowUpdateForm((prevState) => !prevState);
  };
  const deleteHandler = async () => {
    setShowDeleteForm();
    setAttendanceId();
    let data;
    try {
      data = await sendRequest(
        `${process.env.REACT_APP_URL2}/deleteAttendance/${attendanceId}`,
        "DELETE",
        JSON.stringify({
          studentId: authCtx.studentId,
          subjectId: reqSubject._id,
        }),
        {
          "content-type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      authCtx.setData(data.subjects);
    } catch (error) {}

  };
  if (attendanceId && showDeleteForm) {
    const recData = reqData(reqAttendance, attendanceId);
    const text = `${recData.date}(${recData.status})`
    return (
      <DeleteAttendanceForm
        closeModal={deleteClickHandler}
        deleteHandler={deleteHandler}
        text={text}
      />
    );
  }
  if (attendanceId && showUpdateForm) {
    const text = reqData(reqAttendance, attendanceId);
    return (
      <UpdateAttendanceForm
        closeModal={deleteClickHandler}
        updateHandler={updateHandler}
        text={text}
      />
    );
  }
  return (
    <Modal onHideModal={props.closeModal}>
      {isLoading && <LoadingSpinner />}
      {isError && !isLoading && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <div className={styles.history}>
        <h2>Attendance History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {reqAttendance.map((item) => (
              <tr key={item._id}>
                <th>{item.date}</th>
                <th>{item.attendanceType}</th>
                <th>
                  <button onClick={updateClickHandler} value={item._id}>
                    o
                  </button>
                  |
                  <button onClick={deleteClickHandler} value={item._id}>
                    -
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.actions}>
          <button onClick={props.closeModal}>Close</button>
        </div>
      </div>
    </Modal>
  );
};
export default ShowHistory;
