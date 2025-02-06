import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { getProductoCompletoCodigoBarras } from "@AA/Producto";
import { createVenta } from "@AA/Ventas";
import { getDatosCliente } from "@AA/Cliente";

const GenerarVentas = () => {
  const { Title, Text } = Typography;
  const [productos, setProductos] = useState({}); // Estado para almacenar los productos seleccionados
  const [codigoBarras, setCodigoBarras] = useState(""); // Estado para capturar el código de barras ingresado
  const [reload, setReload] = useState(false);
  const [form] = Form.useForm();

  const { tipo } = useParams(); // Obtiene el parámetro "tipo" desde la URL

  useEffect(() => {
    const escaner = (event) => {
      if (event.key === "Enter" && codigoBarras.trim() !== "") {
        const existe = Object.values(productos).some((producto) =>
          producto.detalles.some((d) => d.codigo === codigoBarras)
        );

        if (existe) {
          setProductos((prev) => {
            const nuevoDetalle = { ...prev };
            Object.keys(nuevoDetalle).forEach((key) => {
              nuevoDetalle[key].detalles = nuevoDetalle[key].detalles.map(
                (detalle) =>
                  detalle.codigo === codigoBarras
                    ? { ...detalle, cantidad: detalle.cantidad + 1 }
                    : detalle
              );

              nuevoDetalle[key].cantidad = nuevoDetalle[key].detalles.reduce(
                (acc, { cantidad }) => acc + cantidad,
                0
              );
            });
            return nuevoDetalle;
          });
        } else {
          getProductoCompletoCodigoBarras(codigoBarras).then((productoO) => {
            if (productoO) {
              setProductos((prev) => {
                const nombre_producto = [
                  productoO.producto_nombre,
                  productoO.nombre,
                  productoO.talla,
                ].join("-");
                const totalCantidad = prev[nombre_producto]
                  ? prev[nombre_producto].detalles.reduce(
                      (acc, { cantidad }) => acc + cantidad,
                      0
                    ) + 1
                  : 1;
                return prev[nombre_producto]
                  ? {
                      ...prev,
                      [nombre_producto]: {
                        ...prev[nombre_producto],
                        cantidad: totalCantidad,
                        detalles: [
                          ...prev[nombre_producto].detalles,
                          {
                            detalle_id: productoO.productoDetalle_id,
                            codigo: codigoBarras,
                            cantidad: 1,
                          },
                        ],
                      },
                    }
                  : {
                      ...prev,
                      [nombre_producto]: {
                        producto_id: productoO.producto_id,
                        color_id: productoO.color_id,
                        talla: productoO.talla,
                        cantidad: totalCantidad,
                        precio: productoO.precioBase,
                        detalles: [
                          {
                            detalle_id: productoO.productoDetalle_id,
                            codigo: codigoBarras,
                            cantidad: 1,
                          },
                        ],
                      },
                    };
              });
            }
          });
        }

        setCodigoBarras(""); // Limpiar después de procesar
      } else {
        setCodigoBarras((prev) => prev + event.key);
      }
    };

    document.addEventListener("keypress", escaner);
    return () => {
      document.removeEventListener("keypress", escaner);
    };
  }, [codigoBarras]);

  // Función para eliminar un producto de la lista
  const eliminarProducto = (codigo) => {
    setProductos((prevProductos) => {
      const { [codigo]: _, ...resto } = prevProductos;
      return resto;
    });
  };

  // Cálculos de totales
  const totalCantidad = Object.values(productos).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const totalBruto = Object.values(productos).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  const totalIGV = Math.floor(totalBruto * 0.18); // Calcula el IGV
  const totalNeto = (totalBruto + totalIGV).toFixed(1); // Suma total bruto e IGV

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
        {tipo === "boleta" ? "Boleta" : "Factura"}
      </Divider>

      <Form
        size="large"
        labelAlign="left"
        layout="vertical"
        form={form}
        onFinish={async (values) => {
          await createVenta(tipo,values,productos,totalCantidad,totalBruto,totalIGV,totalNeto);
        }}
      >
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
                  color: "yellow",
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
              {tipo === "boleta" ? (
                <Form.Item name="dni" label="DNI del Cliente">
                  <Input
                    maxLength={8}
                    count={{
                      show: true,
                      max: 8,
                    }}
                    onChange={(e) => {
                      if (e.target.value.length === 8) {
                        getDatosCliente("dni", e.target.value).then((datos) => {
                          if (datos) {
                            form.setFieldValue(
                              "nombre",
                              [
                                datos.name,
                                datos.motherLastName,
                                datos.lastName,
                              ].join(" ")
                            );
                          } else {
                            form.setFieldValue("nombre", []);
                          }
                        });
                      }
                    }}
                  />
                </Form.Item>
              ) : (
                <>
                  <Form.Item name="ruc" label="RUC del Cliente">
                    <Input
                      maxLength={11}
                      count={{
                        show: true,
                        max: 11,
                      }}
                      onChange={(e) => {
                        if (e.target.value.length === 11) {
                          getDatosCliente("ruc", e.target.value).then(
                            (datos) => {
                              if (datos) {
                                form.setFieldsValue({
                                  nombre: datos.social_reason,
                                  direccion: [
                                    datos.type_road,
                                    datos.name_road,
                                    datos.number,
                                    datos.zone_code,
                                    datos.type_zone,
                                  ].join(" "),
                                });
                              }
                            }
                          );
                        } else {
                          form.setFieldValue("nombre", []);
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="direccion" label="Direccion">
                    <Input />
                  </Form.Item>
                </>
              )}
              <Form.Item name="nombre" label="Nombre del Cliente">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="metodo" label="Tipo de Pago">
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
              <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                <Button type="primary" block htmlType="submit">
                  {tipo === "boleta" ? "Imprimir Boleta" : "Imprimir Factura"}
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default GenerarVentas;
