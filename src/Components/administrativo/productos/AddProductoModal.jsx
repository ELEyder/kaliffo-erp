import React from "react";
import { Form, Modal, Input, InputNumber, Row, Col } from "antd";

import { addProducto } from "@AA/Producto"; // Importa la función para añadir productos

const AddProductoModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm(); // Crea una instancia del formulario

  return (
    <Modal
      getContainer={false} // Evita montar el modal fuera del contenedor actual
      styles={{header:{textAlign:"center"}}} // Estiliza el encabezado del modal
      title={"NUEVO PRODUCTO"} // Título del modal
      open={openModal} // Controla la visibilidad del modal
      onCancel={closeModal} // Maneja el cierre del modal
      okText="Añadir" // Texto del botón de confirmación
      onOk={form.submit} // Envía el formulario al confirmar
      centered={true} // Centra el modal
      width={400} // Ancho del modal
    >
      <Form
        style={{ margin: "0 auto" }} // Centra el formulario
        size="large" // Tamaño grande para los campos
        form={form} // Asocia el formulario a la instancia
        labelAlign="center" // Alinea etiquetas al centro
        id="formulariocrear" // ID del formulario
        layout="vertical" // Diseño vertical para los campos
        onFinish={async (values) => {
          await addProducto(values); // Llama a la función para añadir el producto
          form.resetFields(); // Limpia los campos del formulario
          reload(); // Refresca los datos en la vista principal
          closeModal(); // Cierra el modal
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }} // Margen superior para el primer campo
          name="nombre" // Nombre del campo
          label="Nombre del Producto" // Etiqueta del campo
          rules={[
            {
              required: true, // Campo obligatorio
              message: "Nombre requerido", // Mensaje de error
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}> {/* Espaciado entre columnas */}
          <Col span={12}>
            <Form.Item
              name="precioBase" // Campo para el precio base
              label="Precio Base"
              rules={[
                {
                  type: "number",
                  required: true, // Campo obligatorio
                  message: "Precio requerido", // Mensaje de error
                },
              ]}
            >
              <InputNumber
                min={1} // Mínimo valor permitido
                formatter={
                  (value) =>
                    `S/. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Formatea con moneda y comas
                }
                parser={
                  (value) => value?.replace(/S\/.\s?|,/g, "") // Elimina formato al ingresar
                }
                style={{ width: "100%" }} // Abarca todo el ancho disponible
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="descuento" // Campo para el descuento
              label="Descuento"
              rules={[
                {
                  type: "number",
                  required: true, // Campo obligatorio
                  message: "Descuento requerido", // Mensaje de error
                },
              ]}
            >
              <InputNumber
                formatter={(value) => `${value}%`} // Añade el símbolo de porcentaje
                parser={(value) => value?.replace("%", "")} // Elimina el símbolo al ingresar
                min={1} // Valor mínimo permitido
                max={40} // Valor máximo permitido
                style={{ width: "100%" }} // Abarca todo el ancho disponible
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddProductoModal; // Exporta el componente
