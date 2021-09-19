import styles from "./Services.module.css";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
const Services = () => {
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: box1.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/box1.json"),
    });
    lottie.loadAnimation({
      container: box2.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/box2.json"),
    });
    lottie.loadAnimation({
      container: box3.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/box3.json"),
    });
  }, []);
  return (
    <div className={styles.poster} id='servicesmooth'>
      <h1>Services</h1>
      <div className={styles.box}>
        <div className={styles.box1}>
          <div className={styles.animate} ref={box1}></div>
          <h2>Data Representation</h2>
        </div>
        <div className={styles.box1}>
          <div className={styles.animate} ref={box2}></div>
          <h2>Faster Storage and retrival</h2>
        </div>
        <div className={styles.box1}>
          <div className={styles.animate} ref={box3}></div>
          <h2>User freindly and Secure</h2>
        </div>
      </div>
    </div>
  );
};
export default Services;
