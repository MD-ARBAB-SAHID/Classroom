import styles from "./Banner.module.css";
import lottie from "lottie-web";
import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Services from "./Services";
import AuthContext from '../../store/auth-context';
const Banner = () => {
  const container = useRef(null);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  let userLoggedin = authCtx.isLoggedin;
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/data.json"),
    });
  }, []);
  const clickHandler = () => {
    history.push("/signup");
  };
  return (
    <div>
      <section className={styles.container}>
        <div className={styles.wave}></div>
        <div className={styles.banner}>
          <div className={styles.content}>
            <h2>
              Join Us ! <br />
              Keep track of all your attendance
            </h2>
            <div className={styles.actions}>
              {!userLoggedin && <button type='button' onClick={clickHandler}>
                <span></span>Sign Up
              </button>}
            </div>
          </div>
          <div className={styles.animation} ref={container}></div>
        </div>
      </section>
      <div className={styles.whole}>
        <Services  />
      </div>
    </div>
  );
};
export default Banner;
