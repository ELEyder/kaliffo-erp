import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Modal, List, Card, Row, Col, Divider } from "antd";
import { getVentaById } from "@AA/Ventas";
import DetalleVentaTable from "@CA/ventas/DetalleVentaTable";

// (No Test)
const DetalleVentaModal = ({
  openModal,
  closeModal,
  id,
}) => {
  const { tipo } = useParams();
  const [form] = Form.useForm();
  const [venta, setVenta] = useState(["detalles"]);

  useEffect(() => {
    getVentaById(id, setVenta);
  }, [id]);

  console.log(tipo)

  return (
    <Modal
      forceRender // Evita que el modal se desmonte al cerrarse
      getContainer={false}
      title={`${tipo} ${id}`} // Título dinámico con el tipo de venta e ID
      open={openModal}
      onCancel={closeModal}
      style={{ textTransform: "uppercase" }}
      okText="Aceptar"
      cancelText="Cerrar"
      onOk={closeModal} // Cierra el modal al hacer clic en "Aceptar"
      centered
      width="800px"
    >
      <Card style={{ textAlign: "center", margin: "auto" }}>
        {/* Fila con dos columnas para detalles generales */}
        <Row gutter={24} style={{ marginTop: "16px" }}>
          {/* Columna izquierda: Detalles principales de la venta */}
          <Col
            span={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "100%" }}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  { title: venta.tienda, value: venta.codigo },
                  { title: tipo==="boleta"?"DNI":"RUC", value: tipo==="boleta"?venta.dni:venta.ruc },
                  { title: venta.tipoPago, value: `S/${venta.totalNeto}` },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <b>{item.title}</b>
                    <span style={{ float: "right" }}>{item.value}</span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Columna derecha: Totales financieros */}
          <Col span={12}>
            <Card style={{ textAlign: "center", margin: "auto" }}>
              <List
                itemLayout="horizontal"
                dataSource={[
                  { title: "Cantidad", value: `${venta.cantidad_total}` }, // Este campo podría actualizarse si se obtiene la cantidad
                  { title: "Total Bruto", value: `S/${venta.totalBruto}` },
                  { title: "IGV", value: `S/${venta.totalIgv}` },
                  { title: "Total Neto", value: `S/${venta.totalNeto}` },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <b>{item.title}</b>
                    <span style={{ float: "right" }}>{item.value}</span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Tabla de detalles de productos en la venta */}
        <Row>
          <Col span={24}>
            <Divider />
            <DetalleVentaTable id={id} /> {/* Componente que muestra los detalles de la venta */}
          </Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default DetalleVentaModal;
