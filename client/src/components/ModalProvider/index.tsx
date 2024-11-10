import React, { ReactNode, useCallback, useMemo, useState } from 'react';

export interface ModalComponentProps {
  handleClose: () => void;
  isOpen: boolean;
}

type IModalContextProps = {
  openModal: <T>(modal: React.FC<T>, modalProps?: Omit<T, keyof ModalComponentProps>) => void;
  closeModal: () => void;
};

const ModalContext = React.createContext<IModalContextProps>({
  closeModal: () => {},
  openModal: () => {},
});

type ModalProviderState = {
  modal: React.FC | null;
  isOpen: boolean;
  modalProps: any;
};

const initialState = {
  modal: null,
  isOpen: false,
  modalProps: null,
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModalProviderState>(initialState);
  const Component = state.modal ? state.modal : null;
  const openModal = useCallback(
    (modal: React.FC<any>, modalProps: any = {}) => {
      setState({
        isOpen: true,
        modal,
        modalProps,
      });
    },
    [setState],
  );

  const closeModal = useCallback(() => {
    setState(initialState);
  }, [setState]);

  const value = useMemo(() => ({
    openModal,
    closeModal,
  }), [openModal, closeModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {state.isOpen && Component && (
        <Component
          handleClose={closeModal}
          isOpen={state.isOpen}
          {...state.modalProps}
        />
      )}
    </ModalContext.Provider>
  );
};

export { ModalContext };
export default ModalProvider;
