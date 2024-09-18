import { Button, Flex, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getProductosTienda } from "../../../Shared/Funciones/Fucniones_Tienda";

const columns = [
  {
    title: "Producto",
    key: "nombre",
    dataIndex:"nombre",
    align: "center",
  },
  {
    title: "Stock",
    key: "stockGeneral",
    align: "center",
    dataIndex:"stockGeneral",
    defaultSortOrder: "ascend",
  },
  {
    title: "Precio",
    key:"precio",
    dataIndex:"precio",
    align:"center"
  },
  {
    title: "Descuento",
    dataIndex:"descuento",
    key:"descuento",
    align:"center"
  },
  {
    title: "Opciones",
    dataIndex:"",
    key:"x",
    align:"center",
    render:(text,record) =>{
        return (
            <Flex gap="small" align="center" horizontal="true" style={{width:"100%"}} className="opciones-botones">
                <Button type="primary" block>Editar</Button>
                <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  okText="Confirmar"
                  cancelText="NO"
                >
                  <Button block style={{background:"#f54242",color:"white"}} danger>Eliminar</Button>
                </Popconfirm>
            </Flex>
          );
    }
    
  },
];

const TiendaProductos = ({ id }) => {

    const[productostienda,setproductostienda] = useState([])

  useEffect(() => {
    getProductosTienda(id,setproductostienda)
  }, [id]);

  return (
    <>
      <Table columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
      dataSource={[...productostienda]}
      rowKey={(record) => record.producto_id}></Table>
    </>
  );
};

export default TiendaProductos;
