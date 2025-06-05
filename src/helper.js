import { toast } from "react-toastify";
import { toastConst } from "./constant";
export const onSuccess = (message) => {
  toast.success(message, {
    ...toastConst,
  });
};

export const onError = (message) => {
  toast.error(message, {
    ...toastConst,
  });
};
