import React, { Suspense, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthContext from "./store/auth-context";

import MainHeader from "./components/MainHeader/MainHeader";
import HomePage from "./pages/HomePage";

import Footer from "./components/MainHeader/Footer";
import LoadingSpinner from "./components/UI/Loading Spinner/LoadingSpinner";
// import Error from "./components/UI/Error/Error";

// import SingupPage from "./pages/SignupPage";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import LoginPage from "./pages/LoginPage";
// const HomePage = React.lazy(()=>import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SingupPage = React.lazy(() => import("./pages/SignupPage"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Error404 = React.lazy(() => import("./pages/Error404"));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <header>
        <MainHeader />
      </header>
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route path="/" exact>
              {!authCtx.isLoggedin && <HomePage />}
              {authCtx.isLoggedin && (
                <Redirect to={`/dashboard/${authCtx.studentId}`} />
              )}
            </Route>
            <Route path="/login" exact>
              {!authCtx.isLoggedin && <LoginPage />}
              {authCtx.isLoggedin && (
                <Redirect to={`/dashboard/${authCtx.studentId}`} />
              )}
            </Route>
            <Route path="/signup" exact>
              {!authCtx.isLoggedin && <SingupPage />}
              {authCtx.isLoggedin && (
                <Redirect to={`/dashboard/${authCtx.studentId}`} />
              )}
            </Route>
            <Route path="/profile" exact>
              {authCtx.isLoggedin && <Profile />}
              {!authCtx.isLoggedin && <HomePage />}
            </Route>
            <Route path="/dashboard/:studentId" exact>
              {authCtx.isLoggedin && <Dashboard />}
              {!authCtx.isLoggedin && <Redirect to="/" />}
            </Route>
            <Route path="*" exact>
              <Error404 />
            </Route>
          </Switch>
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
