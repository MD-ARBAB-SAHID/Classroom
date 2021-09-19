import React, { useState, useEffect, useContext } from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/Loading Spinner/LoadingSpinner";
import Error from "../components/UI/Error/Error";
import DashCard from "../components/Dashboard/DashCard";
import MetaTags from "react-meta-tags"
const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  const params = useParams();
  const studentId = params.studentId;

  const [name, setName] = useState();
  useEffect(() => {
    const sendData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_URL2}/${studentId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${authCtx.token}`,
          }
        );
        setName(data.name);
        authCtx.setData(data.subjects);
        console.log(data);
      } catch (err) {}
    };
    sendData();
    // eslint-disable-next-line
  }, [sendRequest, studentId]);

  return (
    <>
     <MetaTags>
        <title>DashBoard | Classroom</title>
        <meta id="meta-description" name="description" content="Check attendance of all your subjects with chart visualization and details" />
        </MetaTags>
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      <DashCard name={name} />
    </div>
    </>
  );
};

export default Dashboard;
