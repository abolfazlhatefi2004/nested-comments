import { createContext, useContext, useState, ReactNode } from "react";


interface ModalContextType {
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void,
}


const ModalContext = createContext<ModalContextType | undefined>(undefined);


export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);


    return (
        <ModalContext.Provider value={{isOpen , handleOpen, handleClose }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useComments must be used within a ModalProvider");
    return context;
};