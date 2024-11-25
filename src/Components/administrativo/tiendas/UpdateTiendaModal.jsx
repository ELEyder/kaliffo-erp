import React, { useEffect } from "react";
import { updateTienda } from "@AA/Tienda";
import { Form, Modal, Input } from "antd";

const UpdateProductoModal = ({ openModal, closeModal, id, reload, values }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      nombre: values.tienda,
      direccion: values.direccion,
      telefono: values.telefono,
    });
  }, [values]);

  return (
    <Modal
    forceRender
      getContainer={false}
      title={"EDITAR TIENDA"}
      styles={{header:{textAlign:"center"}}}
      open={openModal}
      onCancel={closeModal}
      okText="Confirmar"
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
          label="Tienda"
          rules={[
            {
              required: true,
              message: "Nombre de la tienda requerida",
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
