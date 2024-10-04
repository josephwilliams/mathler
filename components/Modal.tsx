import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const ModalComponent = ({
  title,
  isOpen,
  onClickClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClickClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClickClose}
      contentLabel="Example Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          border: "1px solid #eaeaea",
          borderRadius: "0.5rem",
          padding: "1rem",
        },
      }}
    >
      <div className="flex justify-between items-center pb-2 border-b-[1px] border-gray-300 border-dotted">
        <h2>{title}</h2>
        <button onClick={onClickClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default ModalComponent;
