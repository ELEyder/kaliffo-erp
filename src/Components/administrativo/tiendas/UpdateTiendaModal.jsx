import React, { useEffect } from "react"; // Importar React y el hook useEffect
import { updateTienda } from "@AA/Tienda"; // Función para actualizar los detalles de la tienda
import { Form, Modal, Input } from "antd"; // Componentes de Ant Design para formularios y modales

const UpdateTiendaModal = ({ openModal, closeModal, id, reload, values }) => {
  const [form] = Form.useForm(); // Crear una instancia del formulario de Ant Design para gestionar los datos del formulario

  // Establecer los valores iniciales del formulario cuando cambian las propiedades `values`
  useEffect(() => {
    form.setFieldsValue({
      nombre: values.tienda, // Establecer el nombre de la tienda
      direccion: values.direccion, // Establecer la dirección de la tienda
      telefono: values.telefono, // Establecer el número de teléfono de la tienda
    });
  }, [values]); // Disparar cuando las propiedades `values` cambian

  return (
    <Modal
      forceRender // Fuerza el renderizado del modal incluso si no está visible
      getContainer={false} // Evita que el modal se adjunte al elemento body
      title={"EDITAR TIENDA"} // Título del modal
      style={{ header: { textAlign: "center" } }} // Centrar el texto del encabezado
      open={openModal} // Controlar la visibilidad del modal
      onCancel={closeModal} // Cerrar el modal cuando el usuario haga clic en el botón de cancelación
      okText="Confirmar" // Texto para el botón de confirmación
      onOk={form.submit} // Disparar la sumisión del formulario al hacer clic en confirmar
      centered={true} // Centrar el modal en la vista
      width={400} // Establecer el ancho del modal
    >
      {/* Formulario para editar los detalles de la tienda */}
      <Form
        style={{ margin: "0 auto" }}
        size="large" // Establecer el tamaño del formulario
        form={form} // Enlazar la instancia del formulario
        labelAlign="center" // Alinear las etiquetas al centro
        id="formulariocrear" // ID del formulario
        layout="vertical" // Disposición de los ítems del formulario en forma vertical
        onFinish={async (values) => {
          await updateTienda(id, values); // Actualizar los detalles de la tienda llamando a la API
          reload(); // Recargar los datos de las tiendas después de la actualización
          closeModal(false); // Cerrar el modal después de la sumisión
        }}
      >
        {/* Campo de entrada para el nombre de la tienda */}
        <Form.Item
          name="nombre"
          label="Tienda" // Etiqueta para el campo del nombre de la tienda
          rules={[{
            required: true, // El nombre de la tienda es obligatorio
            message: "Nombre de la tienda requerida", // Mensaje de error
          }]}
        >
          <Input /> {/* Campo de entrada para el nombre de la tienda */}
        </Form.Item>

        {/* Campo de entrada para la dirección de la tienda */}
        <Form.Item
          name="direccion"
          label="Direccion" // Etiqueta para el campo de la dirección
          rules={[{
            type: "text",
            required: true, // La dirección es obligatoria
            message: "Direccion requerida", // Mensaje de error
          }]}
        >
          <Input /> {/* Campo de entrada para la dirección de la tienda */}
        </Form.Item>

        {/* Campo de entrada para el número de teléfono de la tienda */}
        <Form.Item
          name="telefono"
          label="Telefono" // Etiqueta para el campo del teléfono
          rules={[{
            required: true, // El teléfono es obligatorio
            message: "Telefono requerido", // Mensaje de error
          }]}
        >
          <Input maxLength={9} /> {/* Campo de entrada para el teléfono con un máximo de 9 caracteres */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTiendaModal; // Exportar el componente UpdateTiendaModal
