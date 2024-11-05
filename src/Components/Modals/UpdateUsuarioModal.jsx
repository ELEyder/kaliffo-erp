import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { setUpdateUsuario, updateUsuario } from "../../API/Usuario";
import { getTiendas } from "../../API/Tienda";

const UpdateUsuarioModal = ({
  openModal,
  closeModal,
  tipoTrabajador,
  reload,
  id,
}) => {

  const [form] = Form.useForm();
  const[tiendas, setTiendas] = useState([])
  const[valoresO, setValoresO] = useState({})
  
  useEffect(() => {
    setUpdateUsuario(id,form,setValoresO)
    if(tipoTrabajador==="ventas"){
      getTiendas(setTiendas)
    }
  }, [id]);

  return (
    <Modal
      forceRender 
      getContainer={false}
      title={`Editar Trabajador`}
      open={openModal}
      onCancel={closeModal}
      okText="Confirmar"
      onOk={form.submit}
      centered={true}
      width={500}>
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formularioeditar"
        onFinish={async (values) => {
          await updateUsuario(id, values,valoresO)
          reload()
          closeModal(false)
        }}>
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombres"
          rules={[
            {
              required: true,
              message: "Nombres requeridos",
            },
          ]}>
          <Input />
        </Form.Item>
        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_paterno"
              label="Apellido Paterno"
              rules={[
                {
                  required: true,
                  message: "Apellido Paterno Requerido",
                },
              ]}>
              <Input />
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
              ]}>
              <Input />
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
          }}>
          <Col span={12} className="gutter-row">
            <Form.Item
              label="Fecha Nacimiento"
              name="fecha_nacimiento"
              rules={[
                {
                  required: true,
                  message: "Fecha Nacimiento requerido",
                },
              ]}>
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
              ]}>
              <Input
                maxLength={9}
                showCount
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
          }}>
          <Col span={10}  className="gutter-row">
            <Form.Item
              name="dni"
              label="DNI"
              rules={[
                {
                  required: true,
                  message: "DNI requerido",
                },
              ]}>
              <Input
                maxLength={8}
                style={{textAlign:"center"}}
                showCount/>
            </Form.Item>
          </Col>
          <Col span={14} className="gutter-row">
            {tipoTrabajador === "ventas" ? (
              <Form.Item
                name="tienda_id"
                label="Tienda Asignada"
                rules={[
                  {
                    required: true,
                    message: "Tienda Asignada",
                  },
                ]}>
                <Select
                  style={{textAlign:"center"}}
                  options={tiendas.map((tienda) => ({
                    value: tienda.tienda_id,
                    label: tienda.tienda,
                    key: tienda.tienda_id,
                  }))}/>
              </Form.Item>
            ) : null}
          </Col>
        </Row>
        <Form.Item name="usuario_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUsuarioModal;
