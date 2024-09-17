import { Form, Modal, Input } from "antd";
import React from "react";
import { manejonumeros } from "../../../Shared/Funciones/Funciones_Fetch";
import { AñadirTienda } from "../../../Shared/Funciones/Funciones_Tiendas";

const Modal_añadir = ({ ModalAñadirAbierto, closeModalAñadir,añadidoexitoso }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      getContainer={false}
      title={"Nueva Tienda"}
      style={{textAlign:"center",textTransform:"uppercase"}}
      open={ModalAñadirAbierto}
      onCancel={closeModalAñadir}
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
            await AñadirTienda(values)
            form.resetFields()
            añadidoexitoso()
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
          ]}
        >
          <Input
            maxLength={9}
            showCount
            onChange={manejonumeros(form, "telefono")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Modal_añadir;
