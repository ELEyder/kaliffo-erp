import { useState, useEffect } from "react";
import { getMovimientoDetalle } from "@AL/MovimientosMercaderia"; // Función para obtener el detalle de la compra
import { Modal, Form, Row, Col, Card, Input, Divider } from "antd";

const MovimientoDetalleModal = ({ openModal, closeModal, tipo, idM }) => {
  const [movimientoDetalle, setmovimientoDetalle] = useState(null);

  useEffect(() => {
    if (idM) {
      getMovimientoDetalle(setmovimientoDetalle, tipo, idM);
    }
  }, [idM]);

  return (
    <Modal
      getContainer={false}
      title={`Detalles Envio ${idM}`}
      open={openModal}
      onCancel={() => closeModal(false)}
      styles={{ header: { textAlign: "center" } }}
      style={{ textTransform: "uppercase" }}
      okButtonProps={{ style: { display: "none" } }} // Oculta el botón "OK"
      centered={true} // Centra el modal en la pantalla
      width={750} // Establece el ancho del modal
    >
      {movimientoDetalle ? (
        <Form
          style={{ maxWidth: 650
            , margin: "0 auto", marginTop: "30px" }}
          size="large"
          layout="vertical"
          labelAlign="left"
          initialValues={{
            codigo: movimientoDetalle.cabecero.codigo,
            transporte: movimientoDetalle.cabecero.transporte,
            fecha_envio: movimientoDetalle.cabecero.fecha_envio,
            fecha_inicio_envio: movimientoDetalle.cabecero.fecha_inicio_envio,
            almacen: movimientoDetalle.cabecero.nombre_almacen,
            tienda: movimientoDetalle.cabecero.tienda,
          }}
        >
          {/* Datos generales de la compra */}
          <Row gutter={24} style={{ textAlign: "center" }}>
            <Col span={17}>
              <Card
                title="Datos Envio"
                style={{
                  width: "100%",
                  border: "solid 1px",
                  textAlign: "center",
                }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Codigo" name="codigo">
                      <Input readOnly style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Transporte" name="transporte">
                      <Input readOnly style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    {/* Fecha de envio */}
                    <Form.Item label="Fecha Envio" name="fecha_envio">
                      <Input readOnly style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    {/* Fecha de inicio de envio */}
                    <Form.Item
                      label="Fecha Inicio Envio"
                      name="fecha_inicio_envio"
                    >
                      <Input readOnly style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Datos del total de la compra */}
            <Col span={7} style={{ textAlign: "center" }}>
              <Card
                title="Datos Destino"
                style={{
                  width: "100%",
                  border: "solid 1px",
                  textAlign: "center",
                }}
              >
                <Form.Item label="Almacen Origen" name="almacen">
                  <Input
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Tienda Destino" name="tienda">
                  <Input
                    style={{ width: "100%", textAlign: "center" }}
                    readOnly
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Divider></Divider>

          {movimientoDetalle.detalle.map((detalle, index) => (
            <Row key={index} gutter={16}>
              <Col span={12}>
                <Form.Item label="Producto">
                  <Input
                    value={detalle.producto_nombre + detalle.color_nombre}
                    readOnly
                    style={{ textAlign: "center" }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Cantidad">
                  <Input
                    value={detalle.cantidad}
                    readOnly
                    style={{ textAlign: "center" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          ))}
        </Form>
      ) : (
        <>CARGANDO</>
      )}
    </Modal>
  );
};

export default MovimientoDetalleModal;
