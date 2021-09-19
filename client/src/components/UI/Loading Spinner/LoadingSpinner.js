import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import styles from "./LoadingSpinner.module.css";
import ModalLoading from "./ModalLoading";

const LoadingSpinner = () => {
  const container = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../assets/loading.json"),
    });
  }, []);
  return (
    <ModalLoading>
      <div className={styles.spinner} ref={container}></div>
    </ModalLoading>
  );
};
export default LoadingSpinner;
