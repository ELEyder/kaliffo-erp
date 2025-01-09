import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Modal, List, Card, Row, Col, Divider } from "antd";
import { getVentaById } from "@AA/Ventas"; // Función para obtener la venta por ID
import DetalleVentaTable from "@CA/ventas/DetalleVentaTable"; // Componente para mostrar detalles de la venta

const DetalleVentaModal = ({
  openModal, // Controla si el modal está abierto
  closeModal, // Función para cerrar el modal
  id, // ID de la venta a mostrar
}) => {
  const { tipoVenta } = useParams(); // Obtiene el tipo de venta desde la URL
  const [form] = Form.useForm(); // Formulario de Ant Design
  const [venta, setVenta] = useState(["detalles"]); // Estado para almacenar los datos de la venta

  // Efecto para cargar los detalles de la venta al montar el componente o al cambiar el ID
  useEffect(() => {
    getVentaById(id, setVenta); // Carga los detalles de la venta usando su ID
  }, [id]);

  return (
    <Modal
      forceRender // Evita que el modal se desmonte al cerrarse
      getContainer={false}
      title={`${tipoVenta} ${id}`} // Título dinámico con el tipo de venta e ID
      open={openModal}
      onCancel={closeModal}
      style={{ textTransform: "uppercase" }}
      okText="Aceptar"
      cancelText="Cerrar"
      onOk={closeModal} // Cierra el modal al hacer clic en "Aceptar"
      centered
      width="800px"
    >
      {/* Contenedor principal con estilo centralizado */}
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
                  { title: `RUC`, value: venta.ruc },
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
                  { title: "Cantidad", value: "Sin Datos" }, // Este campo podría actualizarse si se obtiene la cantidad
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
