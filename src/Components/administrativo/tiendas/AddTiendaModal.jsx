import React, { useEffect, useState } from "react"; // Importaciones de React
import { Form, Modal, Select } from "antd"; // Componentes de Ant Design
import { Link } from "react-router-dom"; // Para navegación
import { updateTrabajadorTienda, getTrabajadoresDiferentes } from "@AA/Usuario"; // Funciones para manejar trabajadores

const AddPersonalModal = ({
  openModal, // Propiedad para controlar la visibilidad del modal
  closeModal, // Propiedad para cerrar el modal
  id, // ID de la tienda
  reload // Función para recargar los datos de la tienda
}) => {
  const [form] = Form.useForm(); // Instancia del formulario para manejar su estado

  const [Trabajadores, setTrabajadores] = useState([]); // Estado para almacenar la lista de trabajadores disponibles

  // Obtener la lista de trabajadores que no están asignados a la tienda
  useEffect(() => {
    getTrabajadoresDiferentes(id, setTrabajadores); // Llamada a la API para obtener los trabajadores disponibles
  }, [id]); // Obtener los trabajadores cuando cambia el ID de la tienda

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Añadir nuevo trabajador`} // Título del modal
      open={openModal} // Controlar la visibilidad del modal
      onCancel={closeModal} // Cerrar el modal cuando el usuario hace clic en cancelar
      style={{ textTransform: "uppercase" }} // Estilo para el encabezado del modal
      onOk={form.submit} // Enviar el formulario cuando se hace clic en el botón de "Guardar"
      okText="Guardar" // Texto para el botón de acción
      centered={true} // Centrar el modal en la pantalla
      width={500} // Establecer el ancho del modal
    >

      <Form
        style={{ maxWidth: 500, margin: "0 auto" }} // Centrar el formulario
        size="large"
        form={form} // Vincular el formulario con su estado
        layout="vertical" // Estilo de diseño del formulario
        labelAlign="center" // Alinear las etiquetas al centro
        id="formulariaddpersonal"
        onFinish={async (values) => {
          // Cuando el formulario es enviado
          await updateTrabajadorTienda(id, values); // Actualizar la tienda con el trabajador seleccionado
          reload(); // Recargar los datos de la tienda
          closeModal(); // Cerrar el modal
        }}
      >

        {/* Selección de Personal */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="personal"
          label="Personal" // Etiqueta para el campo
          rules={[{
            required: true, // El campo es obligatorio
            message: "Personal Requerido", // Mensaje de error si la validación falla
          }]}
        >
          <Select
            showSearch
            placeholder="Seleccionar Un personal" // Texto de sugerencia
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) // Filtrar trabajadores según el texto de búsqueda
            }
            options={Trabajadores.map((trabajador) => ({
              value: trabajador.usuario_id, // El valor será el ID del trabajador
              label: trabajador.nombre + " " + trabajador.ap_paterno + " " + trabajador.ap_materno, // Mostrar el nombre completo
              key: trabajador.usuario_id, // Establecer la clave como el ID del trabajador
            }))}
          />
        </Form.Item>

      </Form>

      {/* Enlace para crear un trabajador nuevo */}
      <Link to="/trabajadores/tipo/ventas" style={{ textDecoration: "none" }}>
        ¿Trabajador Nuevo? {/* Texto que enlaza a la página de creación de trabajadores */}
      </Link>
    </Modal>
  );
};

export default AddPersonalModal; // Exportar el componente
