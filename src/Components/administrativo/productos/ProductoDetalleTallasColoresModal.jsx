import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Flex, Popconfirm } from "antd";

import { getProductoDetalleTallaColor } from "@AA/Producto";

const ProducoDetalleTallasColoresModal = ({
  openModal,
  closeModal,
  id,
  talla,
}) => {
  const [productoTallasColores, setproductoTallasColores] = useState([]);

  useEffect(() => {
    if (talla) {
      getProductoDetalleTallaColor(id, talla, setproductoTallasColores);
    }
  }, [talla]);

  const columns = [
    {
      title: "Color",
      key: "nombre",
      dataIndex: "nombre",
      align: "center",
      render: (text, record) => {
        return <>{record.nombre}</>;
      },
    },
    {
      title: "Stock",
      key: "stock",
      align: "center",
      dataIndex: "stock",
      defaultSortOrder: "ascend",
      onCell: (record) => ({
        style: {
          background:
            record.stock >= 50
              ? "green"
              : record.stock <= 20
              ? "#f54242"
              : "#FCFB77",
          color: record.stock <= 20 || record.stock >= 50 ? "white" : "black",
          padding: "10px",
        },
      }),
    }
  ];

  return (
    <>
      <Modal
        forceRender
        getContainer={false}
        styles={{ header: { textAlign: "center" } }}
        title={"COLORES"}
        open={openModal}
        onCancel={() => {
          closeModal(false);
        }}
        centered={true}
        width={500}
        footer={
            <Button onClick={() => closeModal(false)}>
              Cerrar
            </Button>
          }
      >
        <>
          <Table
            columns={columns}
            pagination={{ pageSize: 4 }}
            bordered
            dataSource={productoTallasColores} // Usar detalles como dataSource
            rowKey={(record) => record.color_id} // Usar el ID correcto
          />
        </>
      </Modal>
    </>
  );
};

export default ProducoDetalleTallasColoresModal