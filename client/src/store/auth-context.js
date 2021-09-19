import React, { createContext, useState,useCallback,useEffect } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedin: false,
  login: (token) => {},
  logout: () => {},
  setData:()=>{},
  subjects:[],
  studentId: "",
});
let timer;
export const AuthContextProvider = (props) => {
  // const intialToken = localStorage.getItem("token");
  // const intialStudentId = localStorage.getItem("studentId");
  const [token, setToken] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [isLoggedin,setIsLoggedIn] = useState(false);
  const [expiration,setExpiration] = useState();
 
  const [subjects,setSubjects]=useState();
  const loginHandler = useCallback((token,id,expirationTime) => {
    setToken(token);
    setStudentId(id);
    setIsLoggedIn(true);
    const expirationToken = expirationTime || new Date(new Date().getTime() + 1000*60*60);
    setExpiration(expirationToken);
    localStorage.setItem("token", token);
    localStorage.setItem("studentId", id);
    localStorage.setItem("expirationToken",expirationToken.toISOString());
    
  },[]);
  const logoutHandler = useCallback(() => {
    // console.log("called ")
    setToken(null);
    setStudentId(null);
    setIsLoggedIn(false);
    setExpiration(null)
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    localStorage.removeItem('expirationToken');
  },[]);
  const setData=(subjects)=>{
    let revSubjects = subjects.reverse()
    setSubjects(revSubjects);
  }
  useEffect(()=>{
    const intialToken = localStorage.getItem("token");
    const intialStudentId = localStorage.getItem("studentId");
    const expirationTime = localStorage.getItem("expirationToken")

    if(intialToken && intialStudentId && new Date(expirationTime)> new Date())
    {
      loginHandler(intialToken,intialStudentId,new Date(expirationTime));
    }else{
      logoutHandler()
    }
  
  // eslint-disable-next-line
    },[loginHandler])


    useEffect(()=>{
     
      if(token && expiration)
      {
        
        // console.log(expiration.getTime() -new Date().getTime());

          timer = setTimeout(logoutHandler,expiration.getTime() -new Date().getTime())
      }
      else{
        clearTimeout(timer);
      }
    },[token,expiration,logoutHandler])


  const contextValue = {
    token,
    isLoggedin,
    login: loginHandler,
    logout: logoutHandler,
    setData:setData,
    subjects:subjects,
    studentId: studentId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
