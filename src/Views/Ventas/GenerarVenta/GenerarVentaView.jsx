import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  Select,
} from "antd";

const GenerarVentas = () => {
  const { Title, Text } = Typography;
  const [productos, setproductos] = useState({});
  const [codigoBarras, setCodigoBarras] = useState("");

  useEffect(() => {
    const escaner = (event) => {
      if (event.key === "Enter") {
        // Aquí puedes agregar la lógica para manejar el producto escaneado
        document.getElementById("texto").innerHTML = codigoBarras;
        setCodigoBarras("");
      } else {
        setCodigoBarras((prev) => prev + event.key);
      }
    };

    document.addEventListener("keypress", escaner);

    return () => {
      document.removeEventListener("keypress", escaner);
    };
  }, [codigoBarras]);

  return (
    <>
      <Divider
        orientation="center"
        style={{
          textTransform: "uppercase",
          fontSize: "1.4rem",
          fontWeight: "bold",
          color: "#4A90E2",
        }}
      >
        Boleta
      </Divider>

      <Form
        size="large"
        labelAlign="left"
        id="formulariocrear"
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={16}>
            <Row>
              <Col span={24}>
                <Title
                  level={3}
                  style={{
                    backgroundColor: "#181c34",
                    textAlign: "center",
                    borderRadius: "10px",
                    color: "#fff",
                    padding: "10px 0",
                  }}
                >
                  Productos
                </Title>
              </Col>
              <Col
                span={24}
                style={{
                  marginTop: "10px",
                  fontSize: "1rem",
                  textAlign: "center",
                  color: "#333",
                  maxHeight: "250px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <span id="texto"></span>
              </Col>
              <Divider style={{ margin: "15px 0" }} />
              <Col
                span={24}
                style={{
                  fontSize: "0.9rem",
                  color: "#555",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  backgroundColor: "#f7f7f7",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                <Text>Cantidad: 10</Text>
                <Text>Total Bruto: 12</Text>
                <Text>Total IGV: 23</Text>
                <Text>Total Neto: 100</Text>
              </Col>
            </Row>
          </Col>
          <Col span={1}>
            <Divider
              type="vertical"
              style={{ height: "100%", borderColor: "#e0e0e0" }}
            />
          </Col>
          <Col span={7}>
            <Card
              size="small"
              title={
                <Title level={4} style={{ margin: "0 auto" }}>
                  Datos del Cliente
                </Title>
              }
              bordered={false}
            >
              <Form.Item label="DNI del Cliente">
                <Input />
              </Form.Item>
              <Form.Item label="Nombre del Cliente">
                <Input />
              </Form.Item>
              <Form.Item label="Tipo de Pago">
                <Select
                  style={{ textAlign: "center" }}
                  defaultValue="1"
                  options={[
                    { value: "1", label: "Efectivo" },
                    { value: "2", label: "Yape/Plin" },
                    { value: "3", label: "Transferencia" },
                  ]}
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default GenerarVentas;
