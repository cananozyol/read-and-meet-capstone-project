import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: <button>x</button>,
        style: { background: '#b2dfdb', color: "black" },
    });
};

export const showInfoToast = (message: string) => {
    toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: <button>x</button>,
        className: 'custom-info-toast',
        style: { background: '#bbdefb', color: "black" },
    });
};

export const showWarningToast = (message: string) => {
    toast.warning(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: <button>x</button>,
        className: 'custom-warning-toast',
        style: { background: '#fff9c4', color: "black" },
    });
};