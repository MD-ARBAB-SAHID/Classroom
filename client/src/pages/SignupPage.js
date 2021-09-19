import { useHistory } from "react-router-dom";
import SignUp from "../components/Auth/SignUp";
import MetaTags from "react-meta-tags"
const SingupPage = () => {
  const history = useHistory();
  const showLoginPage = () => {
    history.push("/login");
  };
  return (
    <>
    <MetaTags>
        <title>SignUp | Classroom</title>
        <meta id="meta-description" name="description" content="SignUp to Classroom to record attendance of all your subjects" />
        </MetaTags>
    <SignUp forLogIn={showLoginPage} />
    </>
  )
  
  
};

export default SingupPage;
