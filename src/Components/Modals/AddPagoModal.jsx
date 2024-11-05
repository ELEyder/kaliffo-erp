import React, { useEffect, useState } from "react";
import { Select, Col, DatePicker, Form, Input, Modal, Row, notification } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import { addPago } from "../../API/Pago"

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
      title={`Añadir nueva incidencia`}
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
          <Col className="gutter-row">
            <Form.Item
              label="Fecha de Pago"
              name="fecha_nacimiento"
              rules={[
                {
                  required: true,
                  message: "Fecha Nacimiento requerido"
                }
              ]}>
              <DatePicker
        onChange={onChange}
        picker="week" // Establece el selector como "semana"
        format="YYYY-MM-DD" // Formato de fecha
      />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="descripcion"
              label="Horas Trabajadas"
              rules={[
                {
                  required: true,
                  message: "Descripción requerida"
                },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              name="descripcion"
              label="Pago por Hora"
              rules={[
                {
                  required: true,
                  message: "Descripción requerida"
                },
              ]}
            >
              <Input disabled={true}/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col>
          <Form.Item
              name="descripcion"
              label="Monto Pagado"
              rules={[
                {
                  required: true,
                  message: "Descripción requerida"
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddPagoModal;
