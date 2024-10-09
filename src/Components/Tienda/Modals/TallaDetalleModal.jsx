import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Row, Col ,Popconfirm } from "antd";
import { getTallaDetalle } from "../../../Shared/api/Talla";

const TallaDetalleModal = ({
  openModal,
  closeModal,
  id,
  idp,
  nombreTalla
}) => {
  
  const [tallaDetalle, setTallaDetalle] = useState([]); 

  useEffect(() => {
    getTallaDetalle(id, setTallaDetalle);
  }, [idp]);

  const columns = [
    {
        title: "Talla",
        key: "talla",
        dataIndex:"talla",
        align: "center",
      },
      {
        title: "Stock",
        key: "cantidad",
        align: "center",
        dataIndex:"cantidad",
        defaultSortOrder: "ascend",
        onCell: (record) => ({
            style: {
              background: record.cantidad >= 50 
                ? 'green' 
                : record.cantidad <= 20
                ? '#f54242' 
                : '#FCFB77',  
              color: record.cantidad <= 20 || record.cantidad >= 50 ? "white" : "black",
              padding: "10px"
            }
          })
      },
    {
        title: "Opciones",
        dataIndex: "",
        key: "f",
        align: "center",
        render: (text, record) => {
          return (
            <Row gutter={[8, 8]} justify="center" align="middle">
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                cancelText="NO"
                onConfirm={() => {
                  deleteUsuario(text)
                  setReload(!reload)
                }}
              >
              <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
              </Popconfirm>
            </Col>
          </Row>
          );
        },
      },
  ];

  return (
    <Modal
      forceRender
      getContainer={false}
      title={nombreTalla}
      open={openModal}
      onCancel={() => closeModal()}
      style={{ textTransform: "uppercase" }}
      okText="Guardar"
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
