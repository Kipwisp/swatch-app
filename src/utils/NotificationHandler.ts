import { useToast, POSITION } from "vue-toastification";

export const errorFetch = "Error! Could not fetch image!";
export const errorUpload = "Error! Failed to upload image!";
export const errorType = "Error! Incorrect file type!";

export const successUpload = "Success! Processing finished!";

export const notifyError = (message: string): void => {
  const toast = useToast();
  toast.error(message, {
    position: POSITION.TOP_CENTER,
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
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
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
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
