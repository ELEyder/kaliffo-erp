import React from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Divider, Form, Input, Row, InputNumber, DatePicker } from "antd";
import moment from "moment";

const GenerarVentaView = () => {

  const dateFormat = 'YYYY/MM/DD';

  const { tipo } = useParams();
  return (
    <>
      <Divider style={{ textTransform: "uppercase", fontSize: "1.2rem" }}>{tipo}</Divider>
      <Form initialValues={{ fecha: moment() }} size="large" labelAlign="left" id="formulariocrear" layout="vertical">
        <Row gutter={24} style={{ textAlign: "center" }}>
          <Col span={12}>
            <Card
              title="Datos de la Tienda"
              bordered
              style={{
                height: "300px", 
                overflowY: "auto", 
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "10px",
              }}
            >
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label="Código"
                    name="codigo"
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <Input readOnly placeholder="Código" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Fecha"
                    name="fecha"
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <DatePicker format={dateFormat} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label="DNI"
                    name="dni"
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <Input readOnly placeholder="DNI" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <Input readOnly placeholder="Nombre" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Teléfono"
                name="telefono"
                rules={[{ required: true, message: "Obligatorio" }]}
              >
                <Input readOnly placeholder="Teléfono" />
              </Form.Item>
            </Card>
          </Col>

          <Col span={12}>
            <Card
              title="Datos del Total"
              bordered
              style={{
                height: "300px", 
                overflowY: "auto", 
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "10px",
              }}
            >
              <Form.Item label="Tipo de Pago" name="tipo_pago">
                <Input
                  placeholder="Tipo de Pago"
                  style={{ width: "100%" }}
                  readOnly
                />
              </Form.Item>

              <Form.Item label="Cantidad Total" name="cantidad_total">
                <InputNumber
                  placeholder="Cantidad Total"
                  style={{ width: "100%" }}
                  readOnly
                />
              </Form.Item>

              <Form.Item label="Total Bruto" name="total_bruto">
                <InputNumber
                  placeholder="Total Bruto"
                  style={{ width: "100%" }}
                  readOnly
                />
              </Form.Item>

              <Form.Item label="IGV Total" name="IGV_total">
                <InputNumber
                  placeholder="IGV Total"
                  style={{ width: "100%" }}
                  readOnly
                />
              </Form.Item>

              <Form.Item label="Total Neto" name="total_neto">
                <InputNumber
                  placeholder="Total Neto"
                  style={{ width: "100%" }}
                  readOnly
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider style={{ borderColor: "black", marginTop: "20px" }} />
      </Form>
    </>
  );
};

export default GenerarVentaView;
