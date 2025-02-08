import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { updateTrabajador } from "@AA/Usuario";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { getTiendas } from "@AA/Tienda";

dayjs.extend(customParseFormat);

import {
  onlyNumberKey,
  onlyNumberInput,
  preventPaste,
} from "../../../Shared/Tools"; // Funciones de utilidad para validación

const UpdateTrabajadorModal = ({
  openModal, // Estado para controlar si el modal está abierto
  closeModal, // Función para cerrar el modal
  tipoTrabajador, // Tipo de trabajador (e.g., "ventas", "administrativo")
  reload, // Función para recargar los datos tras actualizar
  data, // ID del trabajador a editar
}) => {
  const [form] = Form.useForm(); // Inicializa el formulario de Ant Design
  const [tiendas, setTiendas] = useState([]); // Lista de tiendas (para trabajadores de ventas)

  useEffect(() => {
    form.setFieldsValue({
      ["nombre"]: data.nombre,
      ["ap_paterno"]: data.ap_paterno,
      ["ap_materno"]: data.ap_materno,
      ["telefono"]: data.telefono,
      ["dni"]: data.dni,
      ["fecha_nacimiento"]: dayjs(data.fecha_nacimiento),
      ["tienda_id"]: data.tienda_id,
    });
  }, [openModal]);

  useEffect(()=>{
    getTiendas(setTiendas)
  }, [])
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
        onFinish={async (values) => {
          await updateTrabajador(data.trabajador_id, values);
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
              rules={[
                { required: true, message: "Apellido Paterno Requerido" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ap_materno"
              label="Apellido Materno"
              rules={[
                { required: true, message: "Apellido Materno Requerido" },
              ]}
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
              rules={[
                { required: true, message: "Fecha Nacimiento requerido" },
              ]}
            >
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[{ required: true, message: "Teléfono Requerido" }]}
            >
              <Input
                showCount
                maxLength={9} // Longitud máxima del teléfono
                onPaste={preventPaste}
                onKeyDown={onlyNumberKey} // Permitir solo números
                onInput={onlyNumberInput} // Permitir solo números en la entrada
              />
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
              <Input maxLength={8} 
              onPaste={preventPaste}
              onKeyDown={onlyNumberKey} // Permitir solo números
              onInput={onlyNumberInput} // Permitir solo números en la entrada
              style={{ textAlign: "center" }} showCount />
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

        {/* Campo oculto para trabajador_id */}
        <Form.Item name="trabajador_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateTrabajadorModal;
