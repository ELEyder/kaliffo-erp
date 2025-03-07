import React from "react";
import { Form, Modal, Input, InputNumber, Row } from "antd";
import { addAlmacenProductos } from "@AL/AlmacenProductos"; // Función para agregar el nuevo almacén de productos

const AddAlmacenProductosModals = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm(); // Hook para gestionar el formulario

  return (
    <Modal
      getContainer={false} // Modal no se coloca en un contenedor diferente
      title={"Nuevo Almacen"} // Título del modal
      open={openModal} // Controla la visibilidad del modal
      onCancel={closeModal} // Cierra el modal al cancelar
      okText="Añadir" // Texto del botón de confirmación
      onOk={form.submit} // Ejecuta el envío del formulario al hacer clic en "Añadir"
      centered={true} // Centra el modal en la pantalla
      width={400} // Ancho del modal
    >
      <Form
        style={{ margin: "0 auto" }} // Estilo para centrar el formulario
        size="large" // Tamaño del formulario
        form={form} // Asocia el formulario con el estado
        labelAlign="center" // Alineación de las etiquetas en el formulario
        id="formulariocrear" // ID del formulario
        layout="vertical" // Diseño vertical del formulario
        onFinish={async (values) =>{ // Al finalizar el formulario, ejecuta esta función
            await addAlmacenProductos(values); // Llama a la función para agregar el almacén
            form.resetFields(); // Limpia los campos del formulario
            reload(); // Recarga los datos para mostrar el nuevo almacén
            closeModal(); // Cierra el modal
        }}
      >
        {/* Campo para el nombre del almacén */}
        <Form.Item
          style={{ marginTop: 20 }} // Espacio superior
          name="nombre_almacen" // Nombre del campo (se usará en el objeto de datos)
          label="Nombre del Almacen" // Etiqueta del campo
          rules={[ // Reglas de validación
            {
              required: true, // Hace que este campo sea obligatorio
              message: "Nombre requerido", // Mensaje en caso de no llenarlo
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Campo para la dirección del almacén */}
        <Form.Item
          style={{ marginTop: 20 }} // Espacio superior
          name="direccion" // Nombre del campo
          label="Direccion del Almacen" // Etiqueta del campo
          rules={[ // Reglas de validación
            {
              required: true, // Hace que este campo sea obligatorio
              message: "Direccion requerido", // Mensaje en caso de no llenarlo
            },
          ]}
        >
          <Input /> 
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAlmacenProductosModals;
