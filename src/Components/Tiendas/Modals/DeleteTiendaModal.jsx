import { Form, Input, Modal } from "antd";
import React from "react";
import { deleteTiendaById } from "../../../Shared/api/Tienda";
const UpdateUsuarioModal = ({
  openModal,
  closeModal,
  id,
  reload,
}) => {

  const [form] = Form.useForm();

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Eliminar Producto`}
      open={openModal}
      onCancel={closeModal}
      style={{ textTransform: "uppercase" }}
      onOk={form.submit}
      okText="Eliminar"
      okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }}
      centered={true}
      width={500}
    >
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formularioeditar"
        onFinish={async (values) => {
          await deleteTiendaById(id, values);
          closeModal();
          reload()
        }}
      >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Contraseña Requerida",
                },
              ]}>
              <Input
              type="password"
              />
            </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUsuarioModal;
