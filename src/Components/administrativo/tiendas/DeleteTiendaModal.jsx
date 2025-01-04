import { Form, Input, Modal } from "antd"; // Importar los componentes necesarios de Ant Design
import React from "react"; // Importar React
import { deleteTiendaById } from "@AA/Tienda"; // Importar la función para eliminar la tienda

const DeleteTiendaModal = ({
  openModal, // Propiedad para controlar la visibilidad del modal
  closeModal, // Propiedad para cerrar el modal
  id, // ID de la tienda a eliminar
  reload, // Función para recargar los datos después de la eliminación
}) => {

  const [form] = Form.useForm(); // Inicializar la instancia del formulario para manejar su estado

  return (
    <Modal
      forceRender
      getContainer={false} // Evitar que el modal se renderice fuera del cuerpo del documento
      title={`Eliminar Producto`} // Título del modal
      open={openModal} // La visibilidad del modal se controla con la propiedad openModal
      onCancel={closeModal} // Cerrar el modal cuando el usuario haga clic en cancelar
      style={{ textTransform: "uppercase" }} // Aplicar la transformación de texto a mayúsculas para el título
      onOk={form.submit} // Activar el envío del formulario cuando se haga clic en el botón OK
      okText="Eliminar" // Texto del botón OK
      okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }} // Estilo para el botón OK, color rojo
      centered={true} // Centrar el modal en la pantalla
      width={500} // Establecer el ancho del modal
    >
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }} // Centrar el formulario dentro del modal
        size="large" // Establecer el tamaño del formulario a grande
        form={form} // Vincular el estado del formulario a esta instancia
        layout="vertical" // Usar un diseño vertical para los elementos del formulario
        labelAlign="center" // Alinear las etiquetas al centro
        id="formularioeditar"
        onFinish={async (values) => {
          // Cuando el formulario se envía
          await deleteTiendaById(id, values); // Eliminar la tienda usando los valores del formulario (contraseña como autorización)
          closeModal(); // Cerrar el modal después de la eliminación
          reload(); // Recargar los datos después de la eliminación
        }}
      >
        <Form.Item
          name="username" // Nombre del campo de usuario
          style={{ display: 'none' }} // El campo se oculta visualmente
          aria-hidden="true" // Asegura que las tecnologías de asistencia lo ignoren si es necesario
        >
          <Input type="text" 
          autoComplete="username"
          />
        </Form.Item>
        {/* Campo de entrada para la contraseña como autorización */}
        <Form.Item
          name="password" // Nombre del campo en el formulario
          label="Password" // Etiqueta para el campo de contraseña
          rules={[{
            required: true, // El campo de contraseña es obligatorio
            message: "Contraseña Requerida", // Mensaje de error si la contraseña no es proporcionada
          }]}
        >
          <Input
            type="password"
            autoComplete="new-password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeleteTiendaModal; // Exportar el componente DeleteTiendaModal
