import { Form, Modal, Input, InputNumber, Row, Col } from "antd";
import React from "react";
import { addProducto } from "../../../Shared/Funciones/Producto";

const Modal_añadir = ({ ModalAñadirAbierto, closeModalAñadir,añadidoexitoso }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      getContainer={false}
      title={"Nuevo Producto"}
      open={ModalAñadirAbierto}
      onCancel={closeModalAñadir}
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
            añadidoexitoso()
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

        <Row gutter={16} style={{gap : "20px"}}>
          <Form.Item
            style={{ marginLeft: 10 }}
            name="precio"
            label="Precio"
            rules={[
              {
                type:"number",
                required: true,
                message: "Precio requerido",
              },
            ]}
          >
            <InputNumber placeholder="S/"/>
          </Form.Item>
          <Form.Item
            name="descuento"
            label="Descuento"
            rules={[
              {
                type:"number",
                required: true,
                message: "Descuento requerido",
              },
            ]}
          >
            <InputNumber placeholder="%" />
          </Form.Item>
  
        </Row>
      </Form>
    </Modal>
  );
};

export default Modal_añadir;
