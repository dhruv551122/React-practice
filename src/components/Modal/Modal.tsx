import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

function Modal({
  children,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      {createPortal(
        <dialog
          ref={modalRef}
          closedby="any"
          className={classes.modal}
          onClose={() => setIsOpen(false)}
        >
          {children}
        </dialog>,
        document.getElementById("modal")!
      )}
    </>
  );
}

export default Modal;
