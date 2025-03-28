import { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Card, Input, Divider } from "antd";
import { getComprasDetalle } from "@AL/Compras"; // Función para obtener el detalle de la compra

const DetallesComprasModal = ({ openModal, closeModal, idC }) => {
  const [compraDetalle, setcompraDetalle] = useState(null); // Estado para almacenar el detalle de la compra

  useEffect(() => {
    if (idC) {
      getComprasDetalle(setcompraDetalle, idC); // Llama a la API para obtener el detalle de la compra
    }
  }, [idC]); // Se ejecuta cada vez que cambia el idC

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Detalles Compra ${idC}`} // Título del modal con el ID de la compra
      open={openModal} // Controla la visibilidad del modal
      onCancel={() => closeModal(false)} // Cierra el modal
      styles={{ header: { textAlign: "center" } }}
      style={{ textTransform: "uppercase" }}
      okButtonProps={{ style: { display: "none" } }} // Oculta el botón "OK"
      centered={true} // Centra el modal en la pantalla
      width={800} // Establece el ancho del modal
    >
      {compraDetalle ? ( // Muestra el detalle de la compra si está disponible
        <Form
          style={{ maxWidth: 700, margin: "0 auto", marginTop: "30px" }}
          size="large"
          layout="vertical"
          labelAlign="left"
          initialValues={{
            tienda: compraDetalle.tienda,
            empresa: compraDetalle.empresa_proveedor,
            fecha_compra: compraDetalle.fecha_compra,
            cantidad_total: compraDetalle.cantidad,
            total_neto: compraDetalle.total,
          }}
        >
          <Row gutter={24} style={{ textAlign: "center" }}>
            <Col span={17}>
              <Card
                title="Datos de la Compra"
                style={{
                  width: "100%",
                  border: "solid 1px",
                  textAlign: "center",
                }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Tienda" name="tienda">
                      <Input readOnly style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Empresa" name="empresa">
                      <Input readOnly style={{ textAlign: "center" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Fecha Compra" name="fecha_compra">
                  <Input readOnly style={{ textAlign: "center" }} />
                </Form.Item>
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
                  <Input style={{ width: "100%", textAlign: "center" }} readOnly />
                </Form.Item>
                <Form.Item label="Total" name="total_neto">
                  <Input style={{ width: "100%", textAlign: "center" }} readOnly />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Divider style={{ borderColor: "black" }} />

          {compraDetalle.detalle.map((detalle, index) => (
            <Row key={index} gutter={16}>
              <Col span={12}>
                <Form.Item label="Producto">
                  <Input value={detalle.producto} readOnly style={{ textAlign: "center" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Cantidad">
                  <Input value={detalle.cantidad} readOnly style={{ width: "100%", textAlign: "center" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Total">
                  <Input value={detalle.total} readOnly style={{ width: "100%", textAlign: "center" }} />
                </Form.Item>
              </Col>
            </Row>
          ))}
        </Form>
      ) : (
        <p>Cargando datos...</p>
      )}
    </Modal>
  );
};

export default DetallesComprasModal;
