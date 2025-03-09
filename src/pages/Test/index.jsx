import React from "react";
import { Button, Space, Divider } from "antd";
import { useNotification } from "../../provider/NotificationProvider";
import AddPersonalModal from "../../modules/administrativo/components/Modals/AddPersonalModal";

const App = () => {

  return (
    <>
      <AddPersonalModal
        openModal={true}
        closeModal={() => {
          console.log("XD");
        }}
        id={1}
      />
    </>
  );
};

export default App;
