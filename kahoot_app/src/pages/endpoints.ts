import { notification } from "antd";

const openNotificationWithIcon = (
  type: "success" | "info" | "warning" | "error",
  title: string,
  message: string
) => {
  notification[type]({
    message: title,
    description: message,
    placement: "bottomRight",
  });
};

const endpoints = {
  url: "http://10.27.158.242:8001"
};

export default endpoints;
