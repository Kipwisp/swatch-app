import { useToast, POSITION } from "vue-toastification";

export const errorFetch = "Error! Could not fetch image!";
export const errorUpload = "Error! Failed to upload image!";
export const errorType = "Error! Incorrect file type!";

export const successUpload = "Processing finished!";

export const notifyError = (message: string): void => {
  const toast = useToast();
  toast.error(message, {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
};

export const notifySuccess = (message: string): void => {
  const toast = useToast();
  toast.success(message, {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
};
