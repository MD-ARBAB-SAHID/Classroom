import { Fragment, useState, useContext } from "react";
import SubjectForm from "../Forms/SubjectForm";
import styles from "./DashCard.module.css";
import SubjectData from "./SubjectData";
import BarChart from "../Dashboard/barChart";
import AuthContext from "../../store/auth-context";
import DeleteSubjectForm from "../Forms/DeleteSubjectForm";
const DashCard = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [deleteSubjectId, setDeleteSubjectId] = useState("");
  const authCtx = useContext(AuthContext);
  const showAddForm = () => {
    setShowForm((prevState) => !prevState);
  };
  const subjects = authCtx.subjects;
  const { name } = props;
  // console.log(subjects);

  const subjectHandler = (event) => {
    setSubjectId(event.target.value);
    // console.log(event.target.value);
  };
  // console.log(subjectId);
  let subject;
  if (deleteSubjectId) {
    const reqSubject = subjects.filter(
      (subject) => subject._id === deleteSubjectId
    );
    subject = reqSubject[0];
    // console.log(subject);
  }

  const deleteHandler = async (event) => {
    setDeleteSubjectId(event.target.value);
    setShowDeleteForm((prevState) => !prevState);
  };

  let subData = <BarChart />;
  const barShowHandler = () => {
    setSubjectId("");
  };

  // let subData = <SubjectData/>;
  if (subjectId) {
    const reqSubject = subjects.filter((subject) => subject._id === subjectId);
    subData = <SubjectData reqSubject={reqSubject} />;
  }
  // console.log(subjectName);
  return (
    <Fragment >
      {showDeleteForm && subject && (
        <DeleteSubjectForm
          closeModal={deleteHandler}
          subject={subject}
          showBar={barShowHandler}
        />
      )}
      <div className={styles.header}>
        <h2>Welcome on board, {name}.</h2>
      </div>
      <div className={styles.subject}>
        <div className={styles.listItems}>
          <h1 onClick={barShowHandler}>SUBJECTS</h1>
          {subjects && subjects.length === 0 && (
            <h2>No subjects.Add some...</h2>
          )}
          <button
            type="button"
            onClick={showAddForm}
            className={styles.subButton}
          >
            +
          </button>
          {subjects &&
            subjects.map((item) => (
              <div
                key={item._id}
                className={
                  item._id === subjectId
                    ? `${styles.active} ${styles.subButton}`
                    : styles.subButton
                }
                value={item._id}
              >
                <button
                  className={
                    item._id === subjectId
                      ? `${styles.active} ${styles.subButton}`
                      : styles.subButton
                  }
                  value={item._id}
                  onClick={subjectHandler}
                  href="#subjectData"
                >
                  {item.subjectName}
                </button>
                
                <button
                  className={styles.icon}
                  onClick={deleteHandler}
                  value={item._id}
                >
                  |
                </button>
              </div>
            ))}
        </div>
        {showForm && <SubjectForm closeModal={showAddForm} />}
        <div className={styles.subjectData} id="subjectData">
          <h1>Subject data</h1>
          {subjects && subjects.length === 0 && (
            <h2>No subjects .Please add one ...</h2>
          )}
          {subjects && subjects.length !== 0 && subData}
        </div>
      </div>
    </Fragment>
  );
};
export default DashCard;
