import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
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

const GenerarVentas = () => {
  const { Title, Text } = Typography;
  const [productos, setproductos] = useState({});
  const [codigoBarras, setCodigoBarras] = useState("");

  const { tipo } = useParams();

  useEffect(() => {
    const escaner = (event) => {
      if (event.key === "Enter") {
        if (codigoBarras === "016485") {
          setproductos((prevProductos) => ({
            ...prevProductos,
            "lectora de codigos": {
              cantidad:
                (prevProductos["lectora de codigos"]?.cantidad || 0) + 1,
              precio: 20,
              codigos: [
                ...(prevProductos["lectora de codigos"]?.codigos || []),
                codigoBarras,
              ],
            },
          }));
        } else if (codigoBarras === "78600027") {
          setproductos((prevProductos) => ({
            ...prevProductos,
            "Caramelos": {
              cantidad:
                (prevProductos["Caramelos"]?.cantidad || 0) + 1,
              precio: 12,
              codigos: [
                ...(prevProductos["Caramelos"]?.codigos || []),
                codigoBarras,
              ],
            },
          }));
        }

        
        

        setCodigoBarras("");
      } else {
        setCodigoBarras((prev) => prev + event.key);
      }
    };

    document.addEventListener("keypress", escaner);

    return () => {
      document.removeEventListener("keypress", escaner);
    };
  }, [codigoBarras, tipo]);

  const eliminarProducto = (codigo) => {
    setproductos((prevProductos) => {
      const { [codigo]: _, ...resto } = prevProductos;
      return resto;
    });
  };

  const totalCantidad = Object.values(productos).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const totalBruto = Object.values(productos).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  const totalIGV = Math.floor(totalBruto * 0.18, 2);
  const totalNeto = totalBruto + totalIGV;

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
        {tipo === "boleta" ? <>Boleta</> : <>Factura</>}
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
                <div id="productos_lista" style={{ color: "white" }}>
                  {Object.entries(productos).map(([codigo, detalles]) => (
                    <Row
                      gutter={[16, 16]}
                      style={{
                        margin: "10px 0",
                        padding: "10px",
                        backgroundColor: "#1e1e2f",
                        borderRadius: "8px",
                        alignItems: "center",
                      }}
                    >
                      {/* Texto del producto */}
                      <Col
                        span={10}
                        style={{ textAlign: "left", color: "#fff" }}
                      >
                        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                          {`${codigo}: ${detalles.cantidad}`}
                        </span>
                      </Col>

                      {/* Input del precio */}
                      <Col span={8}>
                        <Form.Item style={{ margin: 0}}>
                          <Input
                            value={detalles.precio}
                            onChange={(e) => {
                              const nuevoPrecio = e.target.value;
                              setproductos((prevProductos) => ({
                                ...prevProductos,
                                [codigo]: {
                                  ...prevProductos[codigo],
                                  precio: nuevoPrecio,
                                },
                              }));
                            }}
                            placeholder="Precio"
                            style={{
                              borderRadius: "5px",
                              textAlign:"center",
                              fontWeight:"bold"
                            }}
                          />
                        </Form.Item>
                      </Col>

                      {/* Botón de eliminar */}
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
                <Text>Total Bruto: {totalBruto}</Text>
                <Text>IGV Total: {totalIGV}</Text>
                <Text>Total Neto: {totalNeto}</Text>
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
                <Title
                  level={4}
                  style={{
                    margin: "0 auto",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Datos del Cliente
                </Title>
              }
              bordered={false}
            >
              {tipo === "boleta" ? (
                <Form.Item label="DNI del Cliente">
                  <Input
                    count={{
                      show: true,
                      max: 8,
                      strategy: (txt) => txt.length,
                      exceedFormatter: (txt, { max }) =>
                        txt.slice(0, max).join(""),
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item label="RUC del Cliente">
                  <Input
                    count={{
                      show: true,
                      max: 11,
                      strategy: (txt) => txt.length,
                      exceedFormatter: (txt, { max }) =>
                        txt.slice(0, max).join(""),
                    }}
                  />
                </Form.Item>
              )}
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
            {Object.keys(productos).length >= 1 ? (
              <div style={{ marginTop: "10px" }}>
                <Button type="primary" block>
                  {tipo === "boleta" ? (
                    <>Imprimir Boleta</>
                  ) : (
                    <>Imprimir Factura</>
                  )}
                </Button>
              </div>
            ) : null}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default GenerarVentas;
