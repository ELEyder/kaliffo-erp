import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Row, Col, Popconfirm } from "antd";
import { getProductoDetalleColorTalla } from "@AA/Producto";

const TallaDetalleModal = ({
  openModal,
  closeModal,
  idD,
}) => {

  const [tallaDetalle, setTallaDetalle] = useState([]);

  useEffect(() => {
    getProductoDetalleColorTalla(idD, setTallaDetalle);
  }, [idD]);

  const columns = [
    { title: "Talla", key: "talla", dataIndex: "talla", align: "center" },
    {
      title: "Stock", key: "cantidad", align: "center", dataIndex: "cantidad", defaultSortOrder: "ascend",
      onCell: (record) => ({
        style: {
          background: record.cantidad >= 50 ? 'green' : record.cantidad <= 20 ? '#f54242' : '#FCFB77',
          color: record.cantidad <= 20 || record.cantidad >= 50 ? "white" : "black",
          padding: "10px"
        }
      })
    }
  ];

  return (
    <Modal
      forceRender
      getContainer={false}
      title={"Tallas"}
      open={openModal}
      onCancel={() => closeModal()}
      style={{ textTransform: "uppercase" }}
      footer={<Button onClick={() => closeModal(false)}>Cerrar</Button>}
      centered={true}
      width={500}
    >
      <>
        <Table
          columns={columns}
          pagination={{ pageSize: 4 }}
          bordered
          dataSource={tallaDetalle}
          rowKey={(record) => record.talla}
        />
      </>
    </Modal>
  );
};

export default TallaDetalleModal;
