import React, { useEffect, useState } from "react";
import { Button, Modal, Table,Flex,Popconfirm } from "antd";
import { getProductoTiendaDetalle } from "../../../Shared/api/Fucniones_Tienda";

const TiendaDetalleProducto = ({
  ModalTiendaDetalleProducto,
  closeModalTiendaDetalleProducto,
  id,
  idp,
}) => {
  const [productoDetalle, setproductoDetalle] = useState({}); 

  useEffect(() => {
    if (idp) {
      getProductoTiendaDetalle(id, idp, setproductoDetalle);
    }
  }, [idp]);

  const columns = [
    {
        title: "Color",
        key: "color",
        align: "center",
        render: (text, record) => {
          return (
            <>
              {record.nombre}
            </>
          );
        },
      },
    {
      title: "Stock",
      key: "stock",
      dataIndex:"stock",
      align: "center",
      render: (text, record) => {
        return (
          <>
            {record.stock}
          </>
        );
      },
    },
    {
        title:"Ver mas",
        key:"x",
        align:"center",
        render:(text,record)=>{
            return(
                <Button>+</Button>
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
              <Button type="primary" block>
                Editar
              </Button>
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
    <Modal
      getContainer={false}
      title={`${productoDetalle.nombre}`}
      open={ModalTiendaDetalleProducto}
      onCancel={closeModalTiendaDetalleProducto}
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
          dataSource={productoDetalle.detalles} // Usar detalles como dataSource
          rowKey={(record) => record.productoDetalle_id} // Usar el ID correcto
        />
      </>
    </Modal>
  );
};

export default TiendaDetalleProducto;
