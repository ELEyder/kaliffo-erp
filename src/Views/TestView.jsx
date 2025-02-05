import React from "react";
import { Button, Space, Divider } from "antd";
import { useNotification } from "../provider/NotificationProvider";

const App = () => {
  const openNotification = useNotification(); // Usa el hook para obtener la función `open`

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => openNotification("topLeft")}>
          topLeft
        </Button>
        <Button type="primary" onClick={() => openNotification("topRight")}>
          topRight
        </Button>
      </Space>
      <Divider />
      <Space>
        <Button type="primary" onClick={() => openNotification("bottomLeft")}>
          bottomLeft
        </Button>
        <Button type="primary" onClick={() => openNotification("bottomRight")}>
          bottomRight
        </Button>
      </Space>
    </>
  );
};

export default App;
