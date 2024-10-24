import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Modal, List, Card, Row, Col , Divider} from "antd";
import { onlyDecimalKey , onlyNumberKey , onlyLettersKey, onlyDecimalInput, onlyNumberInput, onlyLettersInput, preventPaste } from "../../../Shared/Tools";
import { getVentaById } from "../../../Shared/api/Ventas";
import DetalleVentaTable from "../Tablas/DetalleVentaTable";

const DetalleVentaModal = ({
  openModal,
  closeModal,
  id,
}) => {
  const { tipoVenta } = useParams()
  const [form] = Form.useForm()
  const [venta, setVenta] = useState(["detalles"])

  useEffect(() => {
    getVentaById(id, setVenta)
  }, [id])

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`${tipoVenta} ${id}`}
      open={openModal}
      onCancel={closeModal}
      style={{ textTransform: "uppercase" }}
      okText="Aceptar"
      cancelText="Cerrar"
      onOk={closeModal}
      centered={true}
      width={"800px"}
    >
      <Card style={{ textAlign: "center", margin: "auto" }}>
        <Row gutter={24} style={{ marginTop: '16px' }}>
          <Col span={12} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Card style={{
              width: "100%"
            }}>
              <List
              itemLayout="horizontal"
              dataSource={[
                { title: venta.tienda , value: venta.codigo},
                { title: `RUC`, value: venta.ruc},
                { title: venta.tipoPago , value: `S/${venta.totalNeto}`},
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
          <Col span={12}>
            <Card style={{ textAlign: "center", margin: "auto" }}>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: "Cantidad", value: "Sin Datos" },
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
        <Row>
          <Col span={24}>
          <Divider></Divider>
            <DetalleVentaTable
            id={id}
            />
          </Col>
        </Row>
        </Card>
    </Modal>
  );
};
export default DetalleVentaModal;
