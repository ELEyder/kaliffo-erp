import React, { useEffect } from "react";
import {Form, Input, Modal, Select } from "antd";
import { updateIncidenciaById } from "../../../../Shared/api/Funciones_Usuario";
const { Option } = Select;
const Modal_editar = ({
  ModalEditarAbierto,
  setModalEditarAbierto,
  tipo_trabajador,
  reload,
  setReload,
  values
}) => {

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      descripcion: values.descripcion,
      tipo: values.tipo + '',
    });
  }, [values]);

  return (
    <Modal
      getContainer={false}
      title={`Editar Trabajador de ${tipo_trabajador}`}
      open={ModalEditarAbierto}
      onCancel={() => {
        setModalEditarAbierto(false)
      }}
      okText="Guardar"
      onOk={form.submit}
      style={{textTransform:"uppercase"}}
      centered={true}
      width={500}
    >
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formularioeditar"
        onFinish={async () => {
          updateIncidenciaById(values.incidencia_id, form.getFieldsValue() , reload, setReload)
          setModalEditarAbierto(false)
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="descripcion"
          label="Descripcion"
          rules={[
            {
              required: true,
              message: "Descripción requerida",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ marginTop: 20 }}
          name="tipo"
          label="Tipo"
          rules={[
            {
              required: true,
              message: "Tipo requerida",
            },
          ]}
        >
        <Select placeholder="Selecciona una opción">
          <Option value="1">Familiar</Option>
          <Option value="2">Salud</Option>
          <Option value="3">Personal</Option>
        </Select>
        </Form.Item>
        <Form.Item name="usuario_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Modal_editar;
