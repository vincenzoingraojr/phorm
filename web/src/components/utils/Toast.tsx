import { FunctionComponent, useEffect } from "react";
import styled from "styled-components";
import { PageBlock } from "../../styles/global";
import { devices } from "../../styles/devices";

interface ToastProps {
    message: string;
    onClose: () => void;
}

const ToastWrapper = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 16px;
    background-color: #ff5c00;
    color: #ffffff;
`;

const ToastOuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: fixed;
    top: unset;
    bottom: 80px;
    left: 24px;
    right: 24px;
    transform: unset;
    z-index: 1000;
    
    @media ${devices.mobileL} {
        left: 50%;
        right: unset;
        transform: translateX(-50%);
    }
`;

const Toast: FunctionComponent<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 4000);
    
        return () => clearTimeout(timeoutId);
    }, [onClose]);

    return (
        <ToastWrapper
            onClick={onClose}
        >
            <PageBlock>
                {message}
            </PageBlock>
        </ToastWrapper>
    );
}

interface ToastContainerProps {
    toasts: { id: number; message: string }[];
    removeToast: (id: number) => void;
}
  
const ToastContainer: FunctionComponent<ToastContainerProps> = ({ toasts, removeToast }) => {
    return (
        <ToastOuterContainer>
            {toasts.map((toast) => (
                <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
            ))}
        </ToastOuterContainer>
    );
};
  
export default ToastContainer;