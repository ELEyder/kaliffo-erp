import React from "react";
import { Form, Modal, Input, InputNumber, Row } from "antd";

import { addAlmacenProductos } from "@AL/AlmacenProductos";

const AddAlmacenProductosModals = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      getContainer={false}
      title={"Nuevo Almacen"}
      open={openModal}
      onCancel={closeModal}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={400}
    >
      <Form
        style={{ margin: "0 auto" }}
        size="large"
        form={form}
        labelAlign="center"
        id="formulariocrear"
        layout="vertical"
        onFinish={async (values) =>{
            await addAlmacenProductos(values)
            form.resetFields()
            reload()
            closeModal()
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre_almacen"
          label="Nombre del Almacen"
          rules={[
            {
              required: true,
              message: "Nombre requerido",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginTop: 20 }}
          name="direccion"
          label="Direccion del Almacen"
          rules={[
            {
              required: true,
              message: "Direccion requerido",
            },
          ]}
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default AddAlmacenProductosModals;
