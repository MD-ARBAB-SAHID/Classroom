import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalLoading.module.css";

const Backdrop = (props) => {
return <div className={styles.backdrop}>{props.children}</div>;
};


const ModalLoading = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop>{props.children}</Backdrop>,
        portalElement
      )}
    </Fragment>
  );
};

export default ModalLoading;
