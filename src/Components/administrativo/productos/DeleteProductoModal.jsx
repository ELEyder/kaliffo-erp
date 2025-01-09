import React from "react";
import { Form, Input, Modal } from "antd";
import { deleteProductoById } from "@AA/Producto"; // Importa la función para eliminar un producto

const DeleteProductoModal = ({
  openModal, // Propiedad para controlar si el modal está abierto o no
  closeModal, // Propiedad para cerrar el modal
  id, // ID del producto que se desea eliminar
  reload, // Función para recargar la lista de productos después de eliminar
}) => {

  // Inicializa el formulario de Ant Design
  const [form] = Form.useForm();

  return (
    <Modal
      forceRender // Renderiza el modal incluso si está oculto (útil para control de estado)
      getContainer={false} // El modal no se inserta en el contenedor por defecto
      title={`Eliminar Producto`} // Título del modal
      open={openModal} // Controla la visibilidad del modal
      onCancel={closeModal} // Función para cerrar el modal cuando se hace clic fuera de él o en el botón de cancelar
      style={{ textTransform: "uppercase" }} // Aplica un estilo de texto en mayúsculas
      onOk={form.submit} // Dispara el envío del formulario cuando se hace clic en "Eliminar"
      okText="Eliminar" // Texto del botón de acción
      okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }} // Estilo del botón "Eliminar"
      centered={true} // Centra el modal en la pantalla
      width={500} // Define el ancho del modal
    >
      {/* Formulario de Ant Design */}
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }} // Estilos para el formulario
        size="large" // Define el tamaño del formulario
        form={form} // Asocia el formulario con el estado de la instancia `form`
        layout="vertical" // Muestra las etiquetas sobre los campos de entrada
        labelAlign="center" // Alinea las etiquetas al centro
        id="deleteProductoModal" // ID del formulario
        onFinish={async (values) => { // Llama a esta función cuando el formulario se envía
          await deleteProductoById(id, values); // Llama a la función para eliminar el producto usando su ID
          closeModal(); // Cierra el modal después de la eliminación
          reload(); // Recarga la lista de productos para reflejar los cambios
        }}
      >
        {/* Campo de entrada donde el usuario debe escribir "ACEPTO" para confirmar la eliminación */}
        <Form.Item
          name="campo"
          label="Escribe ACEPTO para continuar" // Etiqueta del campo
          rules={[
            {
              required: true, // El campo es obligatorio
              message: "Campo requerido", // Mensaje que se muestra si el campo está vacío
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeleteProductoModal;
