import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { setUpdateTrabajador, updateTrabajador } from "@AA/Usuario";
import { getTiendas } from "@AA/Tienda";

const UpdateTrabajadorModal = ({
  openModal, // Estado para controlar si el modal está abierto
  closeModal, // Función para cerrar el modal
  tipoTrabajador, // Tipo de trabajador (e.g., "ventas", "administrativo")
  reload, // Función para recargar los datos tras actualizar
  id, // ID del trabajador a editar
}) => {
  const [form] = Form.useForm(); // Inicializa el formulario de Ant Design
  const [tiendas, setTiendas] = useState([]); // Lista de tiendas (para trabajadores de ventas)
  const [valoresO, setValoresO] = useState({}); // Valores originales del trabajador

  useEffect(() => {
    // Carga los datos del trabajador y los valores iniciales en el formulario
    setUpdateTrabajador(id, form, setValoresO);

    // Si el trabajador es de tipo "ventas", carga la lista de tiendas
    if (tipoTrabajador === "ventas") {
      getTiendas(setTiendas);
    }
  }, [id]);

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`EDITAR TRABAJADOR`}
      styles={{ header: { textAlign: "center" } }}
      open={openModal}
      onCancel={closeModal}
      okText="Guardar"
      onOk={form.submit}
      centered
      width={500}
    >
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formularioeditar"
        onFinish={async (values) => {
          // Actualiza los datos del trabajador con los valores del formulario
          await updateTrabajador(id, values, valoresO);
          reload(); // Recarga los datos de la lista
          closeModal(false); // Cierra el modal
        }}
      >
        {/* Campo de nombres */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombres"
          rules={[{ required: true, message: "Nombres requeridos" }]}
        >
          <Input />
        </Form.Item>

        {/* Apellidos */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="ap_paterno"
              label="Apellido Paterno"
              rules={[{ required: true, message: "Apellido Paterno Requerido" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ap_materno"
              label="Apellido Materno"
              rules={[{ required: true, message: "Apellido Materno Requerido" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* Fecha de nacimiento y teléfono */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Fecha Nacimiento"
              name="fecha_nacimiento"
              rules={[{ required: true, message: "Fecha Nacimiento requerido" }]}
            >
              <DatePicker format={"YYYY-MM-DD"} placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[{ required: true, message: "Teléfono Requerido" }]}
            >
              <Input maxLength={9} showCount />
            </Form.Item>
          </Col>
        </Row>

        {/* DNI y tienda asignada */}
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Form.Item
              name="dni"
              label="DNI"
              rules={[{ required: true, message: "DNI requerido" }]}
            >
              <Input maxLength={8} style={{ textAlign: "center" }} showCount />
            </Form.Item>
          </Col>
          <Col span={14}>
            {tipoTrabajador === "ventas" ? (
              <Form.Item
                name="tienda_id"
                label="Tienda Asignada"
                rules={[{ required: true, message: "Tienda Asignada" }]}
              >
                <Select
                  options={tiendas.map((tienda) => ({
                    value: tienda.tienda_id,
                    label: tienda.tienda,
                    key: tienda.tienda_id,
                  }))}
                />
              </Form.Item>
            ) : null}
          </Col>
        </Row>

        {/* Campo oculto para usuario_id */}
        <Form.Item name="usuario_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTrabajadorModal;
