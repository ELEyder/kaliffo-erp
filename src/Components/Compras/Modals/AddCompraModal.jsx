import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  InputNumber,
} from "antd";
import {
  onlyDecimalKey,
  onlyNumberKey,
  onlyLettersKey,
  onlyDecimalInput,
  onlyNumberInput,
  onlyLettersInput,
  preventPaste,
} from "../../../Shared/Tools";

const AddCompraModal = ({ openModal, closeModal, reload, setReload }) => {
  
    const [form] = Form.useForm();

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Añadir nueva compra`}
      open={openModal}
      onCancel={() => closeModal(false)}
      style={{ textTransform: "uppercase" }}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={500}
    >
      <Form
        autoComplete={"false"}
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formulariocrear"
        onFinish={async (values) => {
          //   await addUsuario(tipoTrabajador, values);
          //   setReload(!reload);
          //   closeModal(false);
          //   form.resetFields();
          console.log(values);
        }}
      >
      </Form>
    </Modal>
  );
};

export default AddCompraModal;