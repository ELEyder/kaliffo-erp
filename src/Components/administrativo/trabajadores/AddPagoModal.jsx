import React, { useEffect, useState } from "react";
import { Select, Col, DatePicker, Form, Input, Modal, Row, notification } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import { addPago } from "@AA/Pago"

const { RangePicker } = DatePicker;
const AddPagoModal = ({
  openModal,
  closeModal,
  reload,
  idUsuario
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [selectedDate, setSelectedDate] = useState(null);
  
  const [form] = Form.useForm()
  const onChange = (date) => {
    if (date) {
      setSelectedDate(date);
      const startOfWeek = date.startOf('week'); // Primer día de la semana
      const endOfWeek = date.endOf('week'); // Último día de la semana
    }
  };
  return (
    <Modal
      getContainer={false}
      title={`AÑADIR NUEVO PAGO`}
      styles={{header:{textAlign:"center"}}}
      open={openModal}
      onCancel={closeModal}
      style={{ textTransform: "uppercase" }}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={"800px"}
    >

      <Form
        style={{ margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formulariocrear"
        onFinish={async (values) => {
          await addPago(idUsuario, values, reload, setReload)
          form.resetFields()
          setModalAddOpen(false)
        }}>
 <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Fecha de Pago"
              name="fecha_pago"
              rules={[{ required: true, message: "Fecha de pago requerida" }]}
            >
              <DatePicker
                picker="week"
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Horas Trabajadas"
              name="horas_trabajadas"
              rules={[{ required: true, message: "Horas trabajadas requeridas" }]}
            >
              <Input placeholder="Horas trabajadas" readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Pago por Hora"
              name="pago_por_hora"
              rules={[{ required: true, message: "Pago por hora requerido" }]}
            >
              <Input placeholder="Pago por hora" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Monto Pagado"
              name="monto_pagado"
              rules={[{ required: true, message: "Monto pagado requerido" }]}
            >
              <Input placeholder="Monto pagado" readOnly/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddPagoModal;
