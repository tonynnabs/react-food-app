import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDom from "react-dom";

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portElement = document.getElementById('overlays');
const Modal = props => {
    return <Fragment>
        {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portElement)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portElement)}
    </Fragment>
}

export default Modal;
