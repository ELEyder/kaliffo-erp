import { Form, Modal, Input, InputNumber, Row, Col } from "antd";
import React from "react";
import { addTelas  } from "../../API/Tela";

const AddProductoModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      getContainer={false}
      title={"Nuevo Producto"}
      open={openModal}
      onCancel={() => closeModal(false)}
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
        onFinish={async (values) => {
          await addTela(values)
          form.resetFields()
          reload()
          closeModal()
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="tipoTela"
          label="Tipo de Tela"
          rules={[
            {
              required: true,
              message: "Tipo de tela requerida",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="metraje"
          label="Metraje"
          rules={[
            {
              required: true,
              message: "Metraje requerido",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="articulo"
          label="Artículo"
          rules={[
            {
              required: true,
              message: "Artículo requerido",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="empresa"
          label="Empresa de Compra"
          rules={[
            {
              required: true,
              message: "Empresa requerida",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductoModal;
