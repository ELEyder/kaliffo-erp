import React from "react"; // Importaciones de React
import { Form, Modal, Input } from "antd"; // Componentes de Ant Design
import { addTienda } from "@AA/Tienda"; // Funciones para manejar trabajadores
import {
  onlyNumberKey,
  onlyNumberInput,
  preventPaste,
} from "../../../Shared/Tools"; // Funciones de utilidad para validación

const AddTiendaModal = ({
  openModal, // Propiedad para controlar la visibilidad del modal
  closeModal, // Propiedad para cerrar el modal
  reload, // Función para recargar los datos de la tienda
}) => {
  const [form] = Form.useForm(); // Instancia del formulario para manejar su estado

  return (
    <Modal
      getContainer={false}
      title={"NUEVA TIENDA"}
      styles={{ header: { textAlign: "center" } }}
      open={openModal}
      onCancel={closeModal}
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
        onFinish={async (values) => {
          await addTienda(values);
          form.resetFields();
          closeModal();
          reload();
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
            {
              pattern: /^[0-9]{9}$/,
              message: "Debe ser un número de exactamente 9 dígitos.",
            },
          ]}
        >
          <Input
            maxLength={9}
            onPaste={preventPaste}
            onKeyDown={onlyNumberKey} // Permitir solo números
            onInput={onlyNumberInput} // Permitir solo números en la entrada
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTiendaModal; // Exportar el componente
