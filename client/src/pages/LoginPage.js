
import { useHistory } from "react-router-dom";
import Login from "../components/Auth/Login";
import MetaTags from "react-meta-tags"
const LoginPage = () => {
  const history=useHistory();
  const showSingupPage=()=>{
    history.push('/signup');
  }
  return (
    <>
     <MetaTags>
        <title>Login | Classroom</title>
        <meta id="meta-description" name="description" content="Login to Classroom to record attendance of all your subjects" />
        </MetaTags>
    <Login forSignUp={showSingupPage}/>
    </>
    );
};
export default LoginPage;
