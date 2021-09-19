import styles from "./SubjectData.module.css";
import { useState } from "react";
import AddAttendance from "../Forms/AddAttendance";
import ShowHistory from "../Forms/ShowHistory";
import PieChart from "./pieChart";
const SubjectData = (props) => {
  const { reqSubject } = props;
  // console.log(reqSubject[0]);
  const [showAttendance, setShowAttendance] = useState();
  const [showHistory, setShowHistory] = useState();
  const attendanceHandler = (event) => {
    setShowAttendance((prevState) => !prevState);
    // console.log(event.target);
    // console.log('done2');
  };
  const historyHandler = () => {
    setShowHistory((prevState) => !prevState);
  };
  return (
    <div className={styles.subjectData}>
      {showAttendance && (
        <AddAttendance
          closeModal={attendanceHandler}
          subjectId={reqSubject[0]._id}
        />
      )}
      {showHistory && (
        <ShowHistory
          closeModal={historyHandler}
          reqSubject={reqSubject[0]}
        />
      )}
      <div className={styles.data}>
        {reqSubject[0] && <PieChart subject={reqSubject[0]}/>}
      </div>
      <div className={styles.actions}>
        <button onClick={attendanceHandler}>Add attendance</button>
        <button onClick={historyHandler}>History</button>
      </div>
    </div>
  );
};
export default SubjectData;
