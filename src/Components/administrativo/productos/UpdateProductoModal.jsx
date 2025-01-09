import React, { useEffect } from "react";
import { updateProducto } from "@AA/Producto"; // Función para actualizar los datos del producto
import { setUpdateProducto } from "@AA/Producto"; // Función para establecer los valores iniciales del producto en el formulario
import { Form, Modal, Input, InputNumber, Row, Col } from "antd"; // Componentes de Ant Design

const UpdateProductoModal = ({ openModal, closeModal, id, reload }) => {
  const [form] = Form.useForm(); // Instancia del formulario para manejar su estado

  // Obtener los datos actuales del producto cuando el modal se abre o cuando cambia el ID del producto o reload
  useEffect(() => {
    setUpdateProducto(id, form); // Llamar a la función para cargar los datos del producto en el formulario
  }, [id, reload]);

  return (
    <Modal
      forceRender
      getContainer={false}
      styles={{ header: { textAlign: "center" } }}
      title={"ACTUALIZAR PRODUCTO"} // Título del modal
      open={openModal} // Controlar la visibilidad del modal
      onCancel={() => closeModal(false)} // Cerrar el modal al hacer clic en cancelar
      okText="Añadir" // Texto para el botón de acción
      onOk={form.submit} // Enviar el formulario al hacer clic en "Añadir"
      centered={true} // Centrar el modal en la pantalla
      width={400} // Establecer el ancho del modal
    >
      <Form
        style={{ margin: "0 auto" }}
        size="large"
        form={form} // Vincular el estado del formulario a esta instancia
        labelAlign="center"
        id="formulariocrear"
        layout="vertical"
        onFinish={async (values) => {
          // Cuando el formulario se envía
          await updateProducto(id, values); // Actualizar el producto con los valores del formulario
          form.resetFields(); // Resetear el formulario después de enviarlo
          reload(); // Recargar los datos (por ejemplo, refrescar la lista)
          closeModal(false); // Cerrar el modal
        }}
      >
        {/* Campo para el nombre del producto */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombre del Producto" // Etiqueta del campo
          rules={[{
            required: true, // El campo es obligatorio
            message: "Nombre requerido", // Mensaje de error si la validación falla
          }]}
        >
          <Input />
        </Form.Item>

        {/* Fila para el precio y el descuento */}
        <Row gutter={16}>
          <Col span={12}>
            {/* Campo para el precio base */}
            <Form.Item
              name="precioBase"
              label="Precio Base" // Etiqueta del campo
              rules={[{
                required: true, // El campo es obligatorio
                message: "Precio requerido", // Mensaje de error si la validación falla
              }]}
            >
              <InputNumber
                formatter={(value) => `S/. ${value || ""}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // Formatear el número como moneda
                parser={(value) => value?.replace(/[^\d.-]/g, "")} // Parsear el número para eliminar caracteres no numéricos
                style={{ width: "100%" }} // Hacer que el campo ocupe todo el ancho disponible
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Campo para el descuento */}
            <Form.Item
              name="descuento"
              label="Descuento" // Etiqueta del campo
              rules={[{
                type: "number",
                required: true, // El campo es obligatorio
                message: "Descuento requerido", // Mensaje de error si la validación falla
              }]}
            >
              <InputNumber
                formatter={(value) => `${value}%`} // Formatear el número con el símbolo de porcentaje
                parser={(value) => value?.replace("%", "")} // Parsear el valor para eliminar el símbolo de porcentaje
                min={1} // Valor mínimo permitido
                max={40} // Valor máximo permitido
                style={{ width: "100%" }} // Hacer que el campo ocupe todo el ancho disponible
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateProductoModal; // Exportar el componente
