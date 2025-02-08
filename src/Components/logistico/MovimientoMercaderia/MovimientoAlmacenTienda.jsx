import React, { useState, useEffect, Children } from "react";
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
  Checkbox,
} from "antd";
import { getAlmacenProductos } from "@AL/AlmacenProductos"; // Función para obtener los productos del almacén
import { getTiendas } from "@AA/Tienda"; // Obtiene la lista de tiendas
import { getProductoSimpleCodigoBarras } from "@AA/Producto";
import {createMovimiento_Almacen_Tienda} from "@AL/MovimientosMercaderia"

const MovimientoAlmacenTienda = () => {
  const { Title, Text } = Typography;

  const [productos, setProductos] = useState({}); // Estado para almacenar los productos seleccionados
  const [codigoBarras, setCodigoBarras] = useState(""); // Estado para capturar el código de barras ingresado
  const [almacenes, setAlmacenes] = useState([]);
  const [form] = Form.useForm();
  const [tiendas, setTiendas] = useState([]); // Estado para almacenar las tiendas
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getAlmacenProductos(setAlmacenes);
    getTiendas(setTiendas); // Obtiene las tiendas
  }, [reload]);

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
          getProductoSimpleCodigoBarras(
            codigoBarras,
            "almacen_id",
            form.getFieldValue("almacen")
          ).then((productoO) => {
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
                          { detalle_id:productoO.productoDetalle_id,codigo: codigoBarras, cantidad: 1 },
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
                        detalles: [{ detalle_id:productoO.productoDetalle_id,codigo: codigoBarras, cantidad: 1 }],
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

  //const calculo total
  const total = Object.values(productos)
    .flatMap((producto) => producto.detalles)
    .reduce((acc, { cantidad }) => acc + cantidad, 0);

  return (
    <>
      <Divider>GENERAR MOVIMIENTO DE MERCADERIA</Divider>

      <Form form={form} size="large" labelAlign="left" layout="vertical"
      onFinish={async(values)=>{
        await createMovimiento_Almacen_Tienda(values,productos)
      }}>
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
                  {Object.entries(productos).map(([key, producto]) => (
                    <Row
                      key={key}
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
                          {`${key}: ${producto.cantidad}`}
                        </span>
                      </Col>
                      <Col span={6}>
                        <Button
                          type="primary"
                          danger
                          onClick={() => eliminarProducto(key)}
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
                <Text>CANTIDAD TOTAL: {total}</Text>
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
                  Datos del Envio
                </Title>
              }
              bordered={false}
            >
              <Form.Item
                name="almacen"
                label="Almacen"
                rules={[{ required: true, message: "Obligatorio" }]}
              >
                <Select
                  options={almacenes.map((almacen) => ({
                    value: almacen.almacen_id,
                    label: almacen.nombre_almacen,
                    key: almacen.almacen_id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Tienda"
                name="tienda"
                rules={[{ required: true, message: "Obligatorio" }]}
              >
                <Select
                  options={tiendas.map((tienda) => ({
                    value: tienda.tienda_id,
                    label: tienda.tienda,
                    key: tienda.tienda_id,
                  }))}
                />
              </Form.Item>
            </Card>
            {Object.keys(productos).length >= 1 && (
              <div style={{ marginTop: "10px" }}>
                <Form.Item name="guia" valuePropName="guiaSI">
                    <Checkbox>IMPRIMIR GUIA</Checkbox>
                </Form.Item>
                <Button type="primary" block htmlType="submit">
                  Enviar
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MovimientoAlmacenTienda;
