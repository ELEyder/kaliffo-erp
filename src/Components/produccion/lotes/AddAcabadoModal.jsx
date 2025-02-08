import { Form, Modal, Input, InputNumber, Button, Select, DatePicker } from "antd"; // Importa los componentes de Ant Design
import React, { useState, useEffect } from "react"; // Importa React y hooks
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import { getProductoByLote } from "@AA/Producto"; // Función para obtener productos por lote desde la API
import { addAcabado } from "@AP/Acabado"; // Función para agregar un acabado desde la API

const AddAcabadoModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams(); // Obtiene el ID del lote desde la URL
  const [form] = Form.useForm(); // Crea el formulario utilizando Ant Design
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos obtenidos del lote

  // useEffect para obtener los productos relacionados con el lote cada vez que el ID cambie
  useEffect(() => {
    getProductoByLote(id, setProductos); // Llama a la API para obtener los productos del lote
  }, [id]);

  return (
    <Modal
      getContainer={false} // Evita que el modal se renderice en el contenedor de Ant Design
      title="Nuevo Acabado" // Título del modal
      open={openModal} // Controla si el modal está abierto
      onCancel={() => closeModal(false)} // Cierra el modal al hacer clic en el botón de cancelación
      okText="Añadir" // Texto del botón de confirmación
      onOk={form.submit} // Enviar el formulario al hacer clic en el botón de confirmación
      centered // Centra el modal en la pantalla
      width={600} // Establece el ancho del modal
    >
      <Form
        style={{ margin: "0 auto" }} // Centra el formulario
        size="large" // Tamaño grande para el formulario
        form={form} // Asocia el formulario con el estado del formulario de Ant Design
        labelAlign="center" // Centra las etiquetas
        layout="vertical" // Establece el layout de formulario vertical
        onFinish={async (values) => { // Llama a esta función cuando el formulario se envíe
          await addAcabado(values); // Llama a la API para agregar un acabado
          form.resetFields(); // Limpia los campos del formulario
          reload(); // Vuelve a cargar los datos en el componente padre
          closeModal(false); // Cierra el modal después de enviar
        }}
        initialValues={{
          lote_id: id, // Establece el valor inicial del lote en el formulario
        }}
      >
        {/* Campo Lote (oculto) */}
        <Form.Item
          name="lote_id"
          label="Lote"
          hidden // Hace que el campo no sea visible
          rules={[{ required: true, message: "El Lote es requerido" }]} // Asegura que el campo sea obligatorio
        >
          <Input disabled /> {/* Muestra el valor del lote como solo lectura */}
        </Form.Item>

        {/* Campo Producto */}
        <Form.Item
          name="producto_id"
          label="Producto"
          rules={[{ required: true, message: "El Producto es requerido" }]} // Asegura que el campo sea obligatorio
        >
          <Select placeholder="Seleccione un producto">
            {productos?.map((producto) => (
              <Select.Option key={producto.producto_id} value={producto.producto_id}>
                {producto.nombre} {/* Muestra el nombre de cada producto */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Campo Color */}
        <Form.Item
          name="color_id"
          label="Color"
          rules={[{ required: true, message: "El Color es requerido" }]} // Asegura que el campo sea obligatorio
        >
          <Input placeholder="Ingrese el color" /> {/* Permite ingresar el color */}
        </Form.Item>

        {/* Campo Talla */}
        <Form.Item
          name="talla"
          label="Talla"
          rules={[{ required: true, message: "La Talla es requerida" }]} // Asegura que el campo sea obligatorio
        >
          <InputNumber min={1} placeholder="Ingrese la talla" /> {/* Permite ingresar el tamaño numérico */}
        </Form.Item>

        {/* Fecha Inicio */}
        <Form.Item
          name="fecha_inicio"
          label="Fecha Inicio"
          rules={[{ required: true, message: "La Fecha de inicio es requerida" }]} // Asegura que el campo sea obligatorio
        >
          <DatePicker format="YYYY-MM-DD" /> {/* Permite seleccionar la fecha de inicio */}
        </Form.Item>

        {/* Fecha Final */}
        <Form.Item
          name="fecha_final"
          label="Fecha Final"
          rules={[{ required: true, message: "La Fecha final es requerida" }]} // Asegura que el campo sea obligatorio
        >
          <DatePicker format="YYYY-MM-DD" /> {/* Permite seleccionar la fecha final */}
        </Form.Item>

        {/* Cantidad Recibida */}
        <Form.Item
          name="cantidad_recibida"
          label="Cantidad Recibida"
          rules={[{ required: true, message: "La Cantidad recibida es requerida" }]} // Asegura que el campo sea obligatorio
        >
          <InputNumber min={1} placeholder="Ingrese la cantidad recibida" /> {/* Permite ingresar la cantidad */}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAcabadoModal; // Exporta el componente para su uso en otras partes de la aplicación
