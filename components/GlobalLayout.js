import { useContext, useEffect } from "react";
import { Layout as LayoutAnt, notification } from "antd";

import { AlertContext, AlertDispatch } from "contexts/alert.context";

const GlobalLayout = ({ children }) => {
  const state = useContext(AlertContext);
  const dispatch = useContext(AlertDispatch);

  const openNotification = () => {
    duration: 2,
      notification.config({
        placement: "topRight",
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

  useEffect(() => {
    if (state.show) openNotification();
  }, [state.show]);

  return (
    <LayoutAnt style={{ minHeight: "99.9vh", minWidth: "1300px" }}>
      {children}
    </LayoutAnt>
  );
};

export default GlobalLayout;
