import React, { useEffect } from "react";
import { updateProducto } from "@AA/Producto";
import { setUpdateProducto } from "@AA/Producto";
import { Form, Modal, Input, InputNumber, Row, Col } from "antd";

const UpdateProductoModal = ({ openModal, closeModal, id, reload }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    setUpdateProducto(id, form);
  }, [id, reload]);

  return (
    <Modal
      forceRender
      getContainer={false}
      styles={{ header: { textAlign: "center" } }}
      title={"ACTUALIZAR PRODUCTO"}
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
          await updateProducto(id, values);
          form.resetFields();
          reload();
          closeModal(false);
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
                  required: true,
                  message: "Precio requerido",
                },
              ]}
            >
              <InputNumber
                formatter={(value) => `S/. ${value || ""}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value?.replace(/[^\d.-]/g, "")}
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

export default UpdateProductoModal;
