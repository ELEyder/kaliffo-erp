import { Form, Modal, Input } from "antd";
import React from "react";
import { addTienda } from "@AA/Tienda";

const AddTiendaModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      getContainer={false}
      title={"Nueva Tienda"}
      open={openModal}
      onCancel={closeModal}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={500}
    >
      <Form
        style={{ maxWidth: 600, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formulariocrear"
        onFinish={async (values) =>{
            await addTienda(values)
            form.resetFields()
            closeModal()
            reload()
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="tienda"
          label="Nombre de la Tienda"
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
          label="Direccion de la Tienda"
          rules={[
            {
              required: true,
              message: "Direccion requerida",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="telefono"
          label="Telefono"
          rules={[
            {
              required: true,
              message: "Telefono Requerido",
            },
            {
              pattern: /^[0-9]{9}$/,
              message: 'Debe ser un número de exactamente 9 dígitos.',
            },
          ]}
        >
          <Input
            maxLength={9}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTiendaModal;
