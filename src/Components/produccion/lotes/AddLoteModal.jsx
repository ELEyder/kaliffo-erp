import { Form, Modal, Input, InputNumber, Select } from "antd"; // Importa componentes de Ant Design
import React, { useEffect, useState } from "react"; // Importa React y hooks
import { addLote } from "@AP/Lote"; // Función para agregar un lote desde la API
import { getProductos } from "@AA/Producto"; // Función para obtener productos desde la API
import { getTelas } from "@AP/Tela"; // Función para obtener telas desde la API

const AddLoteModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm(); // Crea el formulario utilizando Ant Design
  const [productos, setProductos] = useState(); // Estado para almacenar los productos obtenidos
  const [telas, setTelas] = useState(); // Estado para almacenar los tipos de telas obtenidos

  useEffect(() => {
    getProductos(setProductos); // Llama a la API para obtener los productos
    getTelas(setTelas); // Llama a la API para obtener los tipos de telas
  }, []); // El efecto se ejecuta una vez al montar el componente

  return (
    <Modal
      getContainer={false}
      title={"Nuevo Lote"} // Título del modal
      open={openModal} // Controla si el modal está abierto
      styles={{ header: { textAlign: "center" } }} // Centra el título del modal
      onCancel={() => closeModal(false)} // Cierra el modal al hacer clic en el botón de cancelación
      okText="CREAR" // Texto del botón de confirmación
      onOk={form.submit} // Envía el formulario cuando se hace clic en el botón de confirmación
      centered={true} // Centra el modal en la pantalla
      width={400} // Establece el ancho del modal
    >
      <Form
        style={{ margin: "0 auto" }}
        size="large" // Establece el tamaño grande para los elementos del formulario
        form={form} // Asocia el formulario con el estado de Ant Design
        labelAlign="center" // Alinea las etiquetas al centro
        id="formulariocrear"
        layout="vertical" // Establece el layout del formulario como vertical
        onFinish={async (values) => { // Llama a esta función cuando el formulario se envíe
          await addLote(values); // Llama a la API para agregar el lote
          form.resetFields(); // Limpia los campos del formulario
          reload(); // Recarga los datos en el componente padre
          closeModal(false); // Cierra el modal después de enviar
        }}
      >
        {/* Campo Tipo de Tela */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="tipo_tela"
          label="Tipo de Tela"
          rules={[
            {
              required: true,
              message: "Tipo de tela requerido", // Mensaje de error si no se selecciona un tipo de tela
            },
          ]}
        >
          <Select placeholder="Seleccione telas">
            {telas?.map((tela, index) => ( // Mapea los tipos de telas y los muestra como opciones
              <Select.Option key={index} value={tela.tipo}>
                {tela.tipo}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Campo Metraje */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="metraje"
          label="Metraje"
          rules={[
            {
              required: true,
              message: "Metraje requerido", // Mensaje de error si no se ingresa metraje
            },
          ]}
        >
          <InputNumber suffix="M" style={{ width: "100%" }} min={0} /> {/* Input para metraje con un sufijo "M" */}
        </Form.Item>

        {/* Campo Productos */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="productos"
          label="Productos"
          rules={[
            {
              required: true,
              message: "Seleccione al menos un producto", // Mensaje de error si no se seleccionan productos
            },
          ]}
        >
          <Select
            mode="multiple" // Permite seleccionar múltiples productos
            placeholder="Seleccione productos"
          >
            {productos?.map((producto, index) => ( // Mapea los productos y los muestra como opciones
              <Select.Option key={index} value={producto.producto_id}>
                {producto.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLoteModal; // Exporta el componente para su uso en otras partes de la aplicación
