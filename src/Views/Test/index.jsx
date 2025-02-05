import React from "react";
import { Button, Space, Divider } from "antd";
import { useNotification } from "../../provider/NotificationProvider";

const App = () => {
  const openNotification = useNotification(); // Usa el hook para obtener la función `open`

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => openNotification("pong")}>
          Ping
        </Button>
      </Space>
    </>
  );
};

export default App;
