import React from "react";
import { Form, Modal, Input, InputNumber, Row, Col } from "antd";

import { addProducto } from "@AA/Producto";

const AddProductoModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      getContainer={false}
      styles={{header:{textAlign:"center"}}}
      title={"NUEVO PRODUCTO"}
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
        onFinish={async (values) => {
          await addProducto(values);
          form.resetFields();
          reload();
          closeModal();
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombre del Producto"
          rules={[
            {
              required: true,
              message: "Nombre requerido",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="precioBase"
              label="Precio Base"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Precio requerido",
                },
              ]}
            >
              <InputNumber
                min={1}
                formatter={
                  (value) =>
                    `S/. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                }
                parser={
                  (value) => value?.replace(/S\/.\s?|,/g, "") 
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="descuento"
              label="Descuento"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Descuento requerido",
                },
              ]}
            >
              <InputNumber
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace("%", "")}
                min={1}
                max={40}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddProductoModal;
