import Modal from "../Modal/Modal";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import styles from "./Error.module.css";
const Error = (props) => {
  const container = useRef();

  const closeErrorHandler = () => {
    props.clearError();
  };
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../assets/error.json"),
    });
  }, []);
  return (
    props.errorText && (
      <Modal onHideModal={closeErrorHandler}>
        <div ref={container} className={styles.animation}></div>
        <div className={styles.actions}>
          <h2>{props.errorText}</h2>
          <button onClick={closeErrorHandler}>Close</button>
        </div>
      </Modal>
    )
  );
};
export default Error;
