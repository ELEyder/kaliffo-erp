import React, { useEffect, useState } from "react";
import { Button, Modal, Table,Flex,Popconfirm } from "antd";

import { getColoresDetalleProducto } from "@AA/Producto";
import TallaDetalleModal from "@CA/productos/TallaDetalleModal";

const ProductoDetalleModal = ({
  openModal,
  closeModal,
  id,
  idp,
  nombreProducto
}) => {

  const[OpenTallaDetalleModal,setOpenTallaDetalleModal] = useState(false)
  const[detalle_ID,setdetalle_ID]=useState(0)
  const [productoDetalle, setproductoDetalle] = useState([]); 

  useEffect(() => {
    if (idp) {
      getColoresDetalleProducto(id, idp, setproductoDetalle);
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
                <Button onClick={()=>{
                  setdetalle_ID(record.productoDetalle_id)
                  setOpenTallaDetalleModal(true)
                }}>+</Button>
            )
        }
    }
  ];

  return (
    <>
    <Modal
      forceRender
      getContainer={false}
      styles={{header:{textAlign:"center"}}}
      title={"COLORES"}
      open={openModal}
      onCancel={() => {
        closeModal(false)
      }}
      style={{ textTransform: "uppercase" }}
      centered={true}
      width={500}
      footer={<Button onClick={() => closeModal(false)}>Cerrar</Button>}
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
      idD={detalle_ID}
      />
      </>
  );
};

export default ProductoDetalleModal;
