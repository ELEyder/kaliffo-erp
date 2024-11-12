import React, { useEffect } from "react";
import { updateProducto } from "@A/admi/Producto";
import { setUpdateUsuario } from "@A/admi/Producto";
import { Form, Modal, Input, InputNumber, Row, Col } from "antd";

const UpdateProductoModal = ({ openModal, closeModal, id, reload }) => {
  const [form] = Form.useForm();

  useEffect(()=>{
    setUpdateUsuario(id,form)
  },[id])

  return (
    <Modal
    forceRender
      getContainer={false}
      title={"Actualizar Producto"}
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
            await updateProducto(id, values)
            form.resetFields()
            reload()
            closeModal(false)
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
            name="precioBase"
            label="Precio Base"
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

export default UpdateProductoModal;
