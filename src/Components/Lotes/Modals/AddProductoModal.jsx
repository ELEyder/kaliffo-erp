import { Form, Modal, Input, InputNumber, Row, Col } from "antd";
import React from "react";
import { addProducto } from "../../../Shared/api/Producto";

const AddProductoModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();
  
  return (
    <Modal
      getContainer={false}
      title={"Nuevo Producto"}
      open={openModal}
      onCancel={()=>closeModal(false)}
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
            await addProducto(values)
            form.resetFields()
            reload()
            closeModal(false)
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "Contraseña requerido",
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
