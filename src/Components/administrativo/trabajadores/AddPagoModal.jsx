import React, { useEffect, useState } from "react"; // Importar React y hooks
import { Select, Col, DatePicker, Form, Input, Modal, Row, notification } from "antd"; // Componentes de Ant Design
import { SmileOutlined } from '@ant-design/icons'; // Icono de sonrisa de Ant Design
import { addPago } from "@AA/Pago"; // Función para agregar un pago

const { RangePicker } = DatePicker; // Desestructurar RangePicker de DatePicker para selección de rango de fechas

const AddPagoModal = ({
  openModal, // Estado de visibilidad del modal
  closeModal, // Función para cerrar el modal
  reload, // Función para activar la recarga de los datos
  idUsuario // ID del usuario pasado como prop
}) => {
  const [api, contextHolder] = notification.useNotification(); // Hook para la API de notificaciones de Ant Design
  const [selectedDate, setSelectedDate] = useState(null); // Estado para guardar la fecha seleccionada
  
  const [form] = Form.useForm(); // Hook para gestionar el estado del formulario

  // Función para manejar el cambio de fecha
  const onChange = (date) => {
    if (date) {
      setSelectedDate(date); // Actualizar la fecha seleccionada
      const startOfWeek = date.startOf('week'); // Obtener el inicio de la semana
      const endOfWeek = date.endOf('week'); // Obtener el final de la semana
    }
  };

  return (
    <Modal
      getContainer={false} // Renderizar el modal en el cuerpo en lugar del contenedor por defecto
      title={`AÑADIR NUEVO PAGO`} // Título del modal
      styles={{ header: { textAlign: "center" } }} // Centrar el título
      open={openModal} // Vincular la visibilidad del modal con openModal
      onCancel={closeModal} // Cerrar el modal al hacer clic en cancelar
      style={{ textTransform: "uppercase" }} // Transformar el texto del modal a mayúsculas
      okText="Añadir" // Texto para el botón de confirmación
      onOk={form.submit} // Activar la sumisión del formulario al hacer clic en "Añadir"
      centered={true} // Centrar el modal en la pantalla
      width={"800px"} // Establecer el ancho del modal
    >

      <Form
        style={{ margin: "0 auto" }} // Centrar el formulario dentro del modal
        size="large" // Establecer el tamaño del formulario como grande
        form={form} // Vincular la instancia del formulario con este formulario
        layout="vertical" // Usar un diseño vertical para los campos del formulario
        labelAlign="center" // Alinear las etiquetas al centro
        id="formulariocrear" // ID del formulario
        onFinish={async (values) => {
          // Manejar la sumisión del formulario
          await addPago(idUsuario, values, reload); // Llamar a la función API para agregar el pago
          form.resetFields(); // Restablecer los campos del formulario después de la sumisión
          closeModal(false); // Cerrar el modal después de la sumisión
        }}
      >
        {/* Fila con dos columnas para "Fecha de Pago" y "Horas Trabajadas" */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Fecha de Pago" // Etiqueta del campo
              name="fecha_pago" // Nombre del campo
              rules={[{ required: true, message: "Fecha de pago requerida" }]} // Regla de validación: campo requerido
            >
              <DatePicker
                picker="week" // Selector de fechas para elegir una semana
                format="YYYY-MM-DD" // Formato de la fecha seleccionada
                style={{ width: "100%" }} // Establecer el ancho del selector de fecha
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Horas Trabajadas" // Etiqueta del campo
              name="horas_trabajadas" // Nombre del campo
              rules={[{ required: true, message: "Horas trabajadas requeridas" }]} // Regla de validación: campo requerido
            >
              <Input placeholder="Horas trabajadas" readOnly /> {/* Campo para las horas trabajadas */}
            </Form.Item>
          </Col>
        </Row>

        {/* Fila con dos columnas para "Pago por Hora" y "Monto Pagado" */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Pago por Hora" // Etiqueta del campo
              name="pago_por_hora" // Nombre del campo
              rules={[{ required: true, message: "Pago por hora requerido" }]} // Regla de validación: campo requerido
            >
              <Input placeholder="Pago por hora" /> {/* Campo para el pago por hora */}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Monto Pagado" // Etiqueta del campo
              name="monto_pagado" // Nombre del campo
              rules={[{ required: true, message: "Monto pagado requerido" }]} // Regla de validación: campo requerido
            >
              <Input placeholder="Monto pagado" readOnly /> {/* Campo para el monto pagado */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddPagoModal; // Exportar el componente AddPagoModal para usarlo en otras partes de la aplicación
