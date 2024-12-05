import React from "react";
import { Form, Input, Modal } from "antd";

import { deleteProductoById } from "@AA/Producto";

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
        id="deleteProductoModal"
        onFinish={async (values) => {
          await deleteProductoById(id, values);
          closeModal();
          reload()
        }}
      >
            <Form.Item
              name="campo"
              label="Escribe ACEPTO para continuar"
              rules={[
                {
                  required: true,
                  message: "Campo requerido",
                },
              ]}>
              <Input/>
            </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUsuarioModal;
