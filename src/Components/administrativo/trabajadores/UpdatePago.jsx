import React, { useEffect } from "react";
import { Form, Input, Modal, Select } from "antd";
import { updateIncidenciaById } from "@AA/Incidencia";

const { Option } = Select;

const UpdatePago = ({
  ModalEditarAbierto, // Estado que controla si el modal está abierto
  setModalEditarAbierto, // Función para cerrar el modal
  tipo_trabajador, // Tipo del trabajador (e.g., ventas, administrativo)
  reload, // Referencia o estado para recargar los datos
  setReload, // Función para actualizar el estado de recarga
  values, // Valores iniciales del formulario
}) => {
  const [form] = Form.useForm(); // Inicialización del formulario

  // Efecto para rellenar los campos del formulario con los valores iniciales
  useEffect(() => {
    form.setFieldsValue({
      descripcion: values.descripcion, // Establece el valor de la descripción
      tipo: values.tipo + '', // Convierte el tipo a string para el Select
    });
  }, [values]);

  return (
    <Modal
      getContainer={false} // Renderiza el modal en el DOM actual
      title={`Editar Trabajador de ${tipo_trabajador}`} // Título dinámico del modal
      open={ModalEditarAbierto} // Estado que controla si el modal está abierto
      onCancel={() => setModalEditarAbierto(false)} // Cierra el modal al cancelar
      okText="Guardar" // Texto del botón de confirmación
      onOk={form.submit} // Envía el formulario al confirmar
      style={{ textTransform: "uppercase" }} // Estilo de texto en mayúsculas
      centered={true} // Centra el modal en la pantalla
      width={500} // Ancho del modal
    >
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }} // Centra el formulario dentro del modal
        size="large" // Tamaño grande de los campos
        form={form} // Vincula el formulario a la instancia
        layout="vertical" // Organización vertical de los campos
        labelAlign="center" // Alineación centrada de las etiquetas
        id="formularioeditar" // ID del formulario
        onFinish={async () => {
          // Lógica al enviar el formulario
          await updateIncidenciaById(values.incidencia_id, form.getFieldsValue(), reload, setReload);
          setModalEditarAbierto(false); // Cierra el modal tras actualizar
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
            <Option value="1">Familiar</Option>
            <Option value="2">Salud</Option>
            <Option value="3">Personal</Option>
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

export default UpdatePago;
