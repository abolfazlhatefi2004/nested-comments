import MuiModal from '@mui/material/Modal';
import { ReactElement } from 'react';
import { useModal } from '../context/ModalContext';


export default function Modal({ children }: { children: ReactElement }) {
  const { isOpen, handleClose } = useModal()

  return (
    <MuiModal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        {children}
      </div>
    </MuiModal>
  );
}

