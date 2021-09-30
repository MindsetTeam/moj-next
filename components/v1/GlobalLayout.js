import { useContext } from "react";
import { Layout as LayoutAnt, notification } from "antd";

import { AlertContext, AlertDispatch } from "contexts/alert.context";

const GlobalLayout = ({ children }) => {
  const state = useContext(AlertContext);
  const dispatch = useContext(AlertDispatch);

  const openNotification = () => {
    duration: 2,
      notification.config({
        placemeknt: "topRight",
      });
    switch (state.type) {
      case "success":
        return notification.success({
          message: state.message,
          description: state.description,
          onClose: () => dispatch({ type: "RESET" }),
        });
      case "error":
        return notification.error({
          message: state.message,
          description: state.description,
          onClose: () => dispatch({ type: "RESET" }),
        });
    }
  };

  return (
    <LayoutAnt style={{ minHeight: "99.9vh" }}>
      {state?.show && openNotification()}
      {children}
    </LayoutAnt>
  );
};

export default GlobalLayout;
