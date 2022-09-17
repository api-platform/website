// Source code from https://levelup.gitconnected.com/accessible-modals-in-gatsby-using-portals-1e80e33a8a2
/* eslint-disable react/require-default-props */
import React, { MutableRefObject, forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import classNames from 'classnames';

interface ModalProps {
  className?: string;
  ref: MutableRefObject<ModalHandle>;
  children: React.ReactNode;
}

export type ModalHandle = {
  openModal: () => void;
  closeModal: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>((props, ref) => {
  const { children, className } = props;
  const [display, setDisplay] = useState(false);
  const handleOpen = () => {
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleOpen(),
      closeModal: () => handleClose(),
    };
  });

  useEffect(() => {
    if (display) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [display]);

  return (
    <div
      className={classNames('modal__overlay', {
        open: display,
      })}
      role="presentation"
      onClick={handleClose}
    >
      <div
        role="presentation"
        className={classNames('modal__dialog', { [className]: !!className })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__close" role="button" tabIndex={0} onClick={handleClose}>
          <div className="cross" />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
});

export default Modal;
