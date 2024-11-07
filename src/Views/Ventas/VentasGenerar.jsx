import React from "react";
import { Card, Col, Divider, Form, Input, Row,InputNumber } from "antd";

const GenerarVentas = () => {
  return (
    <>
      <Divider style={{ textTransform: "uppercase" }}>Boleta</Divider>

      <Form>

        <Row gutter={24} style={{ textAlign: "center" }}>

          <Col span={17}>

            <Card
              title="Datos Tienda"
              style={{
                width: "100%",
                border: "solid 1px",
                textAlign: "center",
              }}
            >
              <Row gutter={16}>

                <Col span={12}>
                  <Form.Item
                    label="Tienda"
                    name="tienda"
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    
                    <Input></Input>
                  </Form.Item>
                </Col>

              </Row>
            </Card>

          </Col>
        
          <Col span={7} style={{ textAlign: "center" }}>
            
            <Card
              title="Datos Total"
              style={{
                width: "100%",
                border: "solid 1px",
                textAlign: "center",
              }}
            >
              <Form.Item label="Cantidad" name="cantidad_total">
                <InputNumber placeholder="Cantidad" style={{ width: "100%" }} readOnly />
              </Form.Item>
              <Form.Item label="Total" name="total_neto">
                <InputNumber placeholder="Total" style={{ width: "100%" }} readOnly />
              </Form.Item>
            </Card>

          </Col>

        </Row>
        
        <Divider style={{borderColor:"black"}}/>

        


      </Form>
    </>
  );
};

export default GenerarVentas;
