import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import {
  onlyDecimalKey,
  onlyNumberKey,
  onlyLettersKey,
  onlyDecimalInput,
  onlyNumberInput,
  onlyLettersInput,
  preventPaste,
} from "../../../Shared/Tools"; // Validaciones personalizadas
import { addTrabajador } from "@AA/Usuario";
import { getTiendas } from "@AA/Tienda";

const AddVentaModal = ({
  openModal, // Controla si el modal está abierto
  closeModal, // Función para cerrar el modal
  tipoTrabajador, // Tipo de trabajador (e.g., "ventas")
  reload, // Estado para indicar si se necesita recargar la lista
  setReload, // Función para actualizar el estado de recarga
}) => {
  const { tipoVenta } = useParams(); // Obtiene el tipo de venta desde la URL
  const [form] = Form.useForm(); // Formulario de Ant Design
  const [tiendas, setTiendas] = useState([]); // Lista de tiendas disponibles

  // Efecto para cargar tiendas si el tipo de trabajador es "ventas"
  useEffect(() => {
    if (tipoTrabajador === "ventas") {
      getTiendas(setTiendas);
    }
  }, [tipoTrabajador, form]);

  return (
    <Modal
      forceRender // Evita que el modal se desmonte al cerrarse
      getContainer={false}
      title={`Añadir nueva ${tipoVenta}`}
      open={openModal}
      onCancel={() => closeModal(false)}
      style={{ textTransform: "uppercase" }}
      okText="Añadir"
      onOk={form.submit} // Envía el formulario al confirmar
      centered
      width={500}
    >
      <Form
        autoComplete="off"
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formulariocrear"
        onFinish={async (values) => {
          await addTrabajador(tipoTrabajador, values); // Añade un nuevo trabajador
          setReload(!reload); // Recarga los datos de la lista
          closeModal(false); // Cierra el modal
          form.resetFields(); // Limpia los campos del formulario
        }}
      >
        {/* Nombres */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombres"
          rules={[
            {
              required: true,
              message: "Nombres requeridos",
            },
          ]}
        >
          <Input
            onPaste={preventPaste}
            onKeyDown={onlyLettersKey}
            onInput={onlyLettersInput}
          />
        </Form.Item>

        {/* Apellidos */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="ap_paterno"
              label="Apellido Paterno"
              rules={[
                {
                  required: true,
                  message: "Apellido Paterno requerido",
                },
              ]}
            >
              <Input
                onPaste={preventPaste}
                onKeyDown={onlyLettersKey}
                onInput={onlyLettersInput}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ap_materno"
              label="Apellido Materno"
              rules={[
                {
                  required: true,
                  message: "Apellido Materno requerido",
                },
              ]}
            >
              <Input
                onPaste={preventPaste}
                onKeyDown={onlyLettersKey}
                onInput={onlyLettersInput}
              />
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
                {
                  required: true,
                  message: "Fecha de nacimiento requerida",
                },
              ]}
            >
              <DatePicker
                placeholder="YYYY-MM-DD"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[
                {
                  required: true,
                  message: "Teléfono requerido",
                },
              ]}
            >
              <Input
                showCount
                maxLength={9}
                onPaste={preventPaste}
                onKeyDown={onlyNumberKey}
                onInput={onlyNumberInput}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* DNI y sueldo */}
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="dni"
              label="DNI"
              rules={[
                {
                  required: true,
                  message: "DNI requerido",
                },
              ]}
            >
              <Input
                showCount
                maxLength={8}
                onPaste={preventPaste}
                onKeyDown={onlyNumberKey}
                onInput={onlyNumberInput}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sueldo"
              label="Sueldo"
              rules={[
                {
                  required: true,
                  message: "Sueldo requerido",
                },
              ]}
            >
              <Input
                onPaste={preventPaste}
                onKeyDown={onlyDecimalKey}
                onInput={onlyDecimalInput}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Tienda asignada (solo para trabajadores de ventas) */}
        {tipoTrabajador === "ventas" && (
          <Form.Item
            name="tienda_id"
            label="Tienda Asignada"
            rules={[
              {
                required: true,
                message: "Tienda requerida",
              },
            ]}
          >
            <Select
              options={tiendas.map((tienda) => ({
                value: tienda.tienda_id,
                label: tienda.tienda,
                key: tienda.tienda_id,
              }))}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default AddVentaModal;
