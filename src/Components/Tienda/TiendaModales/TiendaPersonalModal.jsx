import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { manejonumeros,manejotexto,fetchTiendas, CargarEditar,editar } from "../../../Shared/Funciones/Funciones_Fetch";

const TiendaPersonalModal = ({
  ModalPersonalTiendaAbierto,
  closeModalPersonalTiendaAbierto,
  id_personal,
  handleEditarExitoso
}) => {
  const [form] = Form.useForm();
  const [tiendas,setTiendas] = useState([])
  const[valoresO,setValoresO] = useState({})

  useEffect(()=>{
    if(id_personal){
        CargarEditar(id_personal,form,setValoresO)
        form.setFieldsValue({usuario_id:id_personal})
        fetchTiendas(setTiendas)
    }
  },[id_personal])

  return (
    <Modal
      getContainer={false}
      title={`Añadir nuevo trabajador`}
      open={ModalPersonalTiendaAbierto}
      onCancel={closeModalPersonalTiendaAbierto}
      style={{ textTransform: "uppercase" }}
      onOk={form.submit}
      okText="Guardar"
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
        onFinish={async (values) => {
          await editar(values, valoresO);
          handleEditarExitoso();
        }}
      >
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
          <Input onChange={manejotexto(form, "nombreE")} />
        </Form.Item>

        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_paterno"
              label="Apellido Paterno"
              rules={[
                {
                  required: true,
                  message: "Apellido Paterno Requerido",
                },
              ]}
            >
              <Input onChange={manejotexto(form, "ap_paternoE")} />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_materno"
              label="Apellido Materno"
              rules={[
                {
                  required: true,
                  message: "Apellido Materno Requerido",
                },
              ]}
            >
              <Input onChange={manejotexto(form, "ap_maternoE")} />
            </Form.Item>
          </Col>
        </Row>

        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={12} className="gutter-row">
            <Form.Item
              label="Fecha Nacimiento"
              name="fecha_nacimiento"
              rules={[
                {
                  required: true,
                  message: "Fecha Nacimiento requerido",
                },
              ]}
            >
              <DatePicker format={"YYYY-MM-DD"} placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item
              name="telefono"
              label="Telefono"
              rules={[
                {
                  required: true,
                  message: "Telefono Requerido",
                },
              ]}
            >
              <Input
                maxLength={9}
                showCount
                onChange={manejonumeros(form, "telefonoE")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={10} className="gutter-row">
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
                maxLength={8}
                style={{ textAlign: "center" }}
                showCount
                onChange={manejonumeros(form, "dniE")}
              />
            </Form.Item>
          </Col>

          <Col span={14} className="gutter-row">
              <Form.Item
                name="tienda_id"
                label="Tienda Asignada"
                rules={[
                  {
                    required: true,
                    message: "Tienda Asignada",
                  },
                ]}
              >
                <Select
                  style={{ textAlign: "center" }}
                  options={tiendas.map((tienda) => ({
                    value: tienda.tienda_id,
                    label: tienda.tienda.tienda,
                    key: tienda.tienda_id,
                  }))}
                />
              </Form.Item>
          </Col>
        </Row>

        <Form.Item name="usuario_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TiendaPersonalModal;
