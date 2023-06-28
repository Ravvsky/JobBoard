import { createPortal } from "react-dom";
import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

const Modal = ({
  isOpen,
  children,
  closeModal,
  className,
  childrenClassName,
}) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      event.target.closest(".modal-container") === null
    ) {
      closeModal();
    }
  };

  return createPortal(
    isOpen && (
      <div
        className={twMerge(
          "absolute left-0 top-0 z-[9999] flex h-screen w-full bg-light-gray bg-opacity-50",
          className
        )}
        onClick={handleClickOutside}
      >
        <div ref={modalRef} className={childrenClassName + " modal-container"}>
          {children}
        </div>
      </div>
    ),
    document.body
  );
};

export default Modal;
