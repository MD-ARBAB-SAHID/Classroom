import styles from "./Footer.module.css";
import { IoLocationSharp, IoCallSharp, IoMailOpenSharp } from "react-icons/io5";
const Footer = () => {
  return (
    <div className={styles.footer} id="footer">
      <div className={styles.banner}>
        <div className={styles.about}>
          <h2>Classroom</h2>
          <div className={styles.contact}>
            <p>
              <IoLocationSharp className={styles.icon} /> D-6/7, 2nd Flr, Parsn
              Comml Cp,Mount Road,Chennai,Tamil Nadu
            </p>
            <p>
              <IoCallSharp className={styles.icon} /> (+91)-8908085666
            </p>
            <p>
              <IoMailOpenSharp className={styles.icon} /> hello@classroom.com
            </p>
          </div>
        </div>
        <div className={styles.extra}>
          <div className={styles.box}>
            <h3>ABOUT</h3>
            <p>Our Story</p>
            <p>Benfits</p>
            <p>Teams</p>
            <p>Career</p>
            <p>Placement</p>
          </div>
          <div className={styles.box}>
            <h3>LEGAL</h3>
            <p>T & C</p>
            <p>Privacy policy</p>
            <p>Terms of use</p>
          </div>
          <div className={styles.box}>
            <h3>SPONSERS</h3>
            <p>TSF</p>
            <p>Mark&co</p>
            <p>BCCI</p>
            <p>Madiee </p>
            <p>Udaan</p>
          </div>
        </div>
        <div className={styles.form}>
          <h2>Subscribe Now</h2>
          <form>
            <input type="text" id="namefooter" autoComplete="off" required></input>
            <label htmlFor="namefooter" className={styles.labelName}>
              <span className={styles.contentName}>Email</span>
            </label>
          </form>
          <div className={styles.actions}>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className={styles.copyrigth}> &#9400; All rights reserved | 2021-2022</div>
    </div>
  );
};
export default Footer;
