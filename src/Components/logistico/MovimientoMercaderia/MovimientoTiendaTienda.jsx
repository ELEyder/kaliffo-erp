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
    Button,
  } from "antd";

const MovimientoTiendaTienda = () => {
  const { Title, Text } = Typography;

  const [productos, setProductos] = useState({}); // Estado para almacenar los productos seleccionados
  const [codigoBarras, setCodigoBarras] = useState(""); // Estado para capturar el código de barras ingresado

  // Cálculos de totales
  const totalCantidad = Object.values(productos).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );

  return (
    <>
      <Divider>GENERAR MOVIMIENTO DE MERCADERIA</Divider>

      <Form size="large" labelAlign="left" layout="vertical">
        <Row gutter={16}>
          {/* Columna de productos */}
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
                  overflowY: "auto",
                }}
              >
                <div id="productos_lista" style={{ color: "white" }}>
                  {Object.entries(productos).map(([codigo, detalles]) => (
                    <Row
                      key={codigo}
                      gutter={[16, 16]}
                      style={{
                        margin: "10px 0",
                        padding: "10px",
                        backgroundColor: "#1e1e2f",
                        borderRadius: "8px",
                        alignItems: "center",
                      }}
                    >
                      <Col
                        span={10}
                        style={{ textAlign: "left", color: "#fff" }}
                      >
                        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                          {`${codigo}: ${detalles.cantidad}`}
                        </span>
                      </Col>
                      <Col span={8}>
                        <Form.Item style={{ margin: 0 }}>
                          <Input
                            value={detalles.precio}
                            onChange={(e) => {
                              const nuevoPrecio =
                                parseFloat(e.target.value) || 0;
                              setProductos((prevProductos) => ({
                                ...prevProductos,
                                [codigo]: {
                                  ...prevProductos[codigo],
                                  precio: nuevoPrecio,
                                },
                              }));
                            }}
                            style={{
                              borderRadius: "5px",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Button
                          type="primary"
                          danger
                          onClick={() => eliminarProducto(codigo)}
                          style={{
                            width: "100%",
                            fontWeight: "bold",
                            borderRadius: "5px",
                          }}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </div>
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
                <Text>Cantidad Total: {totalCantidad}</Text>
              </Col>
            </Row>
          </Col>
          <Col span={1}>
            <Divider
              type="vertical"
              style={{ height: "100%", borderColor: "#e0e0e0" }}
            />
          </Col>
          {/* Columna de datos del cliente */}
          <Col span={7}>
            <Card
              size="small"
              title={
                <Title
                  level={4}
                  style={{ color: "white", textAlign: "center" }}
                >
                  Datos del Cliente
                </Title>
              }
              bordered={false}
            >
              <Form.Item label="Nombre del Cliente">
                <Input />
              </Form.Item>
              <Form.Item label="Tipo de Pago">
                <Select
                  defaultValue="1"
                  options={[
                    { value: "1", label: "Efectivo" },
                    { value: "2", label: "Yape/Plin" },
                    { value: "3", label: "Transferencia" },
                  ]}
                />
              </Form.Item>
            </Card>
            {Object.keys(productos).length >= 1 && (
              <div style={{ marginTop: "10px" }}></div>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MovimientoTiendaTienda