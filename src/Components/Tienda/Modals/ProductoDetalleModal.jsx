import React, { useEffect, useState } from "react";
import { Button, Modal, Table,Flex,Popconfirm } from "antd";
import { getProductoDetalle } from "../../../Shared/api/Producto";
import TallaDetalleModal from "./TallaDetalleModal";

const ProductoDetalleModal = ({
  openModal,
  closeModal,
  id,
  idp,
  nombreProducto
}) => {

  const[OpenTallaDetalleModal,setOpenTallaDetalleModal] = useState(false)
  const [productoDetalle, setproductoDetalle] = useState([]); 

  useEffect(() => {
    if (idp) {
      getProductoDetalle(id, idp, setproductoDetalle);
    }
  }, [idp]);

  const columns = [
    {
        title: "Color",
        key: "color_nombre",
        dataIndex:"color_nombre",
        align: "center",
        render: (text, record) => {
          return (
            <>
              {record.color_nombre}
            </>
          );
        },
      },
      {
        title: "Stock",
        key: "stock",
        align: "center",
        dataIndex:"stock",
        defaultSortOrder: "ascend",
        onCell: (record) => ({
            style: {
              background: record.stock >= 50 
                ? 'green' 
                : record.stock <= 20
                ? '#f54242' 
                : '#FCFB77',  
              color: record.stock <= 20 || record.stock >= 50 ? "white" : "black",
              padding: "10px"
            }
          })
      },
    {
        title:"Ver mas",
        key:"x",
        align:"center",
        render:(text,record)=>{
            return(
                <Button onClick={()=>setOpenTallaDetalleModal(true)}>+</Button>
            )
        }
    },
    {
        title: "Opciones",
        dataIndex: "",
        key: "f",
        align: "center",
        render: (text, record) => {
          return (
            <Flex
              gap="small"
              align="center"
              horizontal="true"
              style={{ width: "100%" }}
              className="opciones-botones"
            >
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                cancelText="NO"
              >
                <Button block style={{ background: "#f54242", color: "white" }} danger>
                  Eliminar
                </Button>
              </Popconfirm>
            </Flex>
          );
        },
      },
  ];

  return (
    <>
    <Modal
      forceRender
      getContainer={false}
      title={nombreProducto}
      open={openModal}
      onCancel={() => {
        closeModal(false)
      }}
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
          dataSource={productoDetalle} // Usar detalles como dataSource
          rowKey={(record) => record.productoDetalle_id} // Usar el ID correcto
        />
      </>
    </Modal>

      <TallaDetalleModal
      openModal = {OpenTallaDetalleModal}
      closeModal={()=>setOpenTallaDetalleModal(false)}
      id={id}
      idp={idp}
      nombreProducto={nombreProducto}
      />
      </>
  );
};

export default ProductoDetalleModal;
