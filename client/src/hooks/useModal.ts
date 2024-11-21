// react
import { useContext } from 'react';

// local imports
// components
import { ModalContext } from '@components/providers/ModalProvider';

const useModal = () => {
  const { closeModal, openModal } = useContext(ModalContext);

  return { closeModal, openModal };
};

export default useModal;
