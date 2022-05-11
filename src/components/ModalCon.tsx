import React, { useState, useEffect, useRef } from 'react';
import Logo from '@con/images/logo.svg';
import Web from '@con/components/common/Web';
import Modal, { ModalHandle } from './common/Modal';
import Button from './common/Button';

const ModalCon: React.ComponentType = () => {
  const modalRef1 = useRef<ModalHandle>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    let timeout;
    if (!localStorage.getItem('modal-con')) {
      setShowModal(true);

      timeout = setTimeout(() => {
        if (!modalRef1?.current) return;
        modalRef1.current.openModal();
        localStorage.setItem('modal-con', Date.now().toString());
      }, 4000);
    }

    return () => timeout && clearTimeout(timeout);
  }, [setShowModal]);

  return showModal ? (
    <Modal ref={modalRef1} className="modal__con">
      <div className="modal-con__header">
        <Web className="modal-con__web con__web" isVisible animated />
        <span className="modal-con__date">Sep 15 - 16, 2022 | Lille & online</span>
        <img src={Logo} alt="Api Platform Conference" width="400" />
      </div>
      <div className="modal-con__content">
        <p className="content__overtitle">What&apos;s new?</p>
        <p className="content__title h2-like">
          API Platform conference: our 2-days event dedicated to API Platform and its ecosystem.
        </p>
        <p>
          At the heart of these 2 days, API Platform 3. From its new abstractions to its implementation on production
          projects, you will learn a lot more on the D-day!
        </p>
        <Button text="Discover the program" className="content__button small" link="/con/2022" />
      </div>
    </Modal>
  ) : null;
};

export default ModalCon;
