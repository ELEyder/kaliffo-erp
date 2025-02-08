import React, { useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";
import { updateIncidenciaById } from "@AA/Incidencia";

const { Option } = Select;

const UpdateIncidenciaModal = ({
  openModal,    // Controla si el modal está abierto o cerrado
  closeModal,   // Función para cerrar el modal
  reload,       // Referencia para recargar la información después de actualizar
  values,       // Valores iniciales para rellenar el formulario
}) => {
  const [form] = Form.useForm(); // Instancia del formulario de Ant Design

  // Efecto para establecer los valores iniciales del formulario al recibirlos
  useEffect(() => {
    form.setFieldsValue({
      descripcion: values.descripcion,
      tipo: values.tipo,
    });
  }, [values]);

  return (
    <Modal
      forceRender // Asegura que el modal se renderice incluso si está cerrado inicialmente
      getContainer={false} // Renderiza el modal en el DOM actual
      title="Editar Incidencia" // Título del modal
      open={openModal} // Estado de apertura del modal
      onCancel={closeModal} // Cierra el modal al cancelar
      okText="Guardar" // Texto del botón "OK"
      onOk={form.submit} // Envía el formulario al hacer clic en "OK"
      style={{ textTransform: "uppercase" }} // Estilo en mayúsculas
      centered={true} // Centra el modal en la pantalla
      width={500} // Ancho del modal
    >
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }} // Estilo para centrar el formulario
        size="large" // Tamaño grande de los campos del formulario
        form={form} // Instancia del formulario
        layout="vertical" // Layout vertical de los campos
        labelAlign="center" // Etiquetas centradas
        id="formularioeditar" // ID para referencia
        onFinish={async () => {
          // Lógica al enviar el formulario
          await updateIncidenciaById(values.incidencia_id, form.getFieldsValue());
          reload();// Marca para recargar los datos
          closeModal(); // Cierra el modal
        }}
      >
        {/* Campo de descripción */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="descripcion"
          label="Descripción"
          rules={[
            {
              required: true,
              message: "Descripción requerida",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Campo de tipo */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="tipo"
          label="Tipo"
          rules={[
            {
              required: true,
              message: "Tipo requerido",
            },
          ]}
        >
          <Select placeholder="Selecciona una opción">
            <Option value={1}>Familiar</Option>
            <Option value={2}>Salud</Option>
            <Option value={3}>Personal</Option>
          </Select>
        </Form.Item>

        {/* Campo oculto para el ID del usuario */}
        <Form.Item name="usuario_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateIncidenciaModal;
