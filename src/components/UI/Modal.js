import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { Fragment } from "react";
//backdrop to prevent customer interact with the element behind the modal
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const Modal = (props) => {
    return <Fragment>
        {
            ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, document.getElementById('overlays'))
        }
        {
            // props.children --  it’s mounted in the DOM tree as the child of the nearest parent Node
            // this.props.children  is used to display whatever you include between the opening and closing tags when invoking a component.
            ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlays'))
        }
    </Fragment>
};
export default Modal;
