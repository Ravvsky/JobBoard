import { createPortal } from "react-dom";
import { useRef, ReactNode, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
  className?: string;
  childrenClassName?: string;
}

const Modal = ({
  isOpen,
  children,
  closeModal,
  className,
  childrenClassName,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return createPortal(
    isOpen && (
      <div
        className={twMerge(
          "fixed left-0 top-0 z-[9999] flex h-screen w-full bg-light-gray bg-opacity-50",
          className,
        )}
        onClick={handleClickOutside}
      >
        <div ref={modalRef} className={`${childrenClassName} `}>
          {children}
        </div>
      </div>
    ),
    document.body,
  );
};

export default Modal;
