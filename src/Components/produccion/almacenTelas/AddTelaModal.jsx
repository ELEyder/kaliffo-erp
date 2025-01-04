import { Form, Modal, Input, InputNumber, Row, Col } from "antd"; // Importa los componentes necesarios de Ant Design
import React from "react"; // Importa React

const AddProductoModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm(); // Crea una instancia del formulario para manejar los datos

  return (
    <Modal
      getContainer={false} // El modal no se monta dentro de un contenedor predeterminado (en lugar de hacerlo dentro del body)
      title={"Nuevo Producto"} // Título del modal
      open={openModal} // Determina si el modal está abierto o cerrado
      onCancel={() => closeModal(false)} // Función que se ejecuta cuando se cierra el modal (cambia el estado de visibilidad)
      okText="Añadir" // Texto del botón de confirmación
      onOk={form.submit} // Acción que se ejecuta cuando se hace clic en "Añadir" (envía el formulario)
      centered={true} // Centra el modal en la pantalla
      width={400} // Ancho del modal
    >
      <Form
        style={{ margin: "0 auto" }} // Estilo centrado del formulario
        size="large" // Tamaño del formulario
        form={form} // Vincula el formulario con la instancia
        labelAlign="center" // Alineación de las etiquetas de los campos
        id="formulariocrear" // ID del formulario
        layout="vertical" // Diseño vertical del formulario
        onFinish={async (values) => { // Función que se ejecuta cuando el formulario se envía exitosamente
          await addTela(values) // Llama a la función `addTela` para agregar el producto
          form.resetFields() // Resetea los campos del formulario
          reload() // Recarga los datos (probablemente actualiza la lista de productos)
          closeModal() // Cierra el modal después de agregar el producto
        }}
      >
        {/* Campo Tipo de Tela */}
        <Form.Item
          style={{ marginTop: 20 }} // Estilo de márgenes para el campo
          name="tipoTela" // Nombre del campo (se usará para obtener su valor)
          label="Tipo de Tela" // Etiqueta del campo
          rules={[ // Reglas de validación
            {
              required: true, // El campo es obligatorio
              message: "Tipo de tela requerida", // Mensaje de error si no se llena el campo
            },
          ]}
        >
          <Input /> {/* Campo de entrada de texto */}
        </Form.Item>

        {/* Campo Metraje */}
        <Form.Item
          name="metraje" // Nombre del campo
          label="Metraje" // Etiqueta del campo
          rules={[ // Reglas de validación
            {
              required: true, // El campo es obligatorio
              message: "Metraje requerido", // Mensaje de error si no se llena el campo
            },
          ]}
        >
          <Input /> {/* Campo de entrada de texto */}
        </Form.Item>

        {/* Campo Artículo */}
        <Form.Item
          name="articulo" // Nombre del campo
          label="Artículo" // Etiqueta del campo
          rules={[ // Reglas de validación
            {
              required: true, // El campo es obligatorio
              message: "Artículo requerido", // Mensaje de error si no se llena el campo
            },
          ]}
        >
          <Input /> {/* Campo de entrada de texto */}
        </Form.Item>

        {/* Campo Empresa de Compra */}
        <Form.Item
          name="empresa" // Nombre del campo
          label="Empresa de Compra" // Etiqueta del campo
          rules={[ // Reglas de validación
            {
              required: true, // El campo es obligatorio
              message: "Empresa requerida", // Mensaje de error si no se llena el campo
            },
          ]}
        >
          <Input /> {/* Campo de entrada de texto */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductoModal; // Exporta el componente para que se pueda utilizar en otras partes del proyecto
