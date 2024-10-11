import React, { useEffect } from "react";
import { updateTienda, setUpdateTienda } from "../../../Shared/api/Tienda";
import { Form, Modal, Input, InputNumber, Row, Col } from "antd";

const UpdateProductoModal = ({ openModal, closeModal, id, reload }) => {
  const [form] = Form.useForm();

  useEffect(()=>{
    setUpdateTienda(id,form)
  },[id])

  return (
    <Modal
    forceRender
      getContainer={false}
      title={"Actualizar Tienda"}
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
            await updateTienda(id, values)
            reload()
            closeModal(false)
        }}
      >
        <Form.Item
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
          <Form.Item
            name="direccion"
            label="Direccion"
            rules={[
              {
                type:"text",
                required: true,
                message: "Direccion requerida",
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Telefono"
            rules={[
              {
                required: true,
                message: "Descuento requerido",
              },
            ]}
          >
            <Input maxLength={9}/>
          </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductoModal;
