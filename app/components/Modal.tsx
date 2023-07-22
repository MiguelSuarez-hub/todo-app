interface ModalProps {
  openModal: boolean,
  setOpenModal: (open: boolean) => boolean | void,
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({openModal, setOpenModal, children}) => {
  return (
    <dialog className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setOpenModal(false)}>
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
