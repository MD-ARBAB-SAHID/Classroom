import { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../components/UI/Loading Spinner/LoadingSpinner";
import Error from "../components/UI/Error/Error";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";
import Card from "../components/UI/Card/Card";
import Styles from "./Profile.module.css";
import MetaTags from "react-meta-tags";
const Profile = () => {
  const [profileData, setProfileData] = useState();
  const authCtx = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_URL1}/profile/${authCtx.studentId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${authCtx.token}`,
          }
        );
        console.log(data);
        setProfileData(data);
      } catch (err) {}
    };
    getProfileData();
    // eslint-disable-next-line
  }, [sendRequest, authCtx.id, authCtx.token]);
  return (
    <>
      <MetaTags>
        <title>Profile | Classroom</title>
        <meta
          id="meta-description"
          name="description"
          content="This is My Profile Page"
        />
      </MetaTags>
      {isLoading && <LoadingSpinner />}
      {!isLoading && isError && (
        <Error errorText={isError} clearError={clearError} />
      )}
      {!isError && profileData && (
        <Card>
          <div className={Styles.profile}>
            <div className={Styles["details-data"]}>
              <h1>Profile</h1>
            </div>
            <div className={Styles["details-img"]}>
              <img src={`${process.env.REACT_APP_URL3}/${profileData.image}`} alt="ProfilePicture" />
            </div>
            <div className={Styles["details-data"]}>
              <div className={Styles.details}>
                <span className={Styles["details-left"]}>Name : </span>
                <span>{profileData.name}</span>
              </div>
              <div className={Styles.details}>
                <span className={Styles["details-left"]}>Email : </span>
                <span>{profileData.email}</span>
              </div>
              <div className={Styles.details}>
                <span className={Styles["details-left"]}>College : </span>
                <span>{profileData.college}</span>
              </div>
              <div className={Styles.details}>
                <span className={Styles["details-left"]}>Date Of Birth : </span>
                <span>{profileData.dob}</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
export default Profile;
