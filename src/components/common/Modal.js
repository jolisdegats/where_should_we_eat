import React from 'react';
import {createPortal} from 'react-dom';
import styles from './Modal.module.scss'

const Modal = ({ isModalOpen, hide }) => {
    
    return isModalOpen ? createPortal(
  <>
    <div className={styles["modal-overlay"]}/>
    <div className={styles["modal-wrapper"]} aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className={styles["modal"]}>
        <div className={styles["modal-header"]}>
          <button type="button" className={styles["modal-close-button"]} data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          Hello, I'm a modal.
        </p>
      </div>
    </div>
  </>, document.body
) : null;}

export default Modal;