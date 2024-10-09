import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getProductosByTienda } from "../../../Shared/api/Producto";
import { deleteProductoById } from "../../../Shared/api/Producto";
import DetallesProductoModal from "../Modals/DetallesProductoModal"
import AddProductoModal from "../Modals/AddProductoModal";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons";


const ProductosTable = () => {

  const { id } = useParams();

  const[productostienda,setproductostienda] = useState([])
  const[reload,setReload] = useState(false)
  const[OpenAddProductoModal,setOpenAddProductoModal] = useState(false)
  const[OpenTiendaDetalleProducto,setOpenTiendaDetalleProducto] = useState(false)
  const[idp,setIdP] = useState(0)
  const[nombreProducto,setNombreProducto] = useState(0)

  useEffect(() => {
    getProductosByTienda(id,setproductostienda)
  }, [id, reload]);

  const columns = [
    {
      title: "Producto",
      key: "nombre",
      dataIndex:"nombre",
      align: "center",
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
      title: "Precio",
      key:"precioBase",
      dataIndex:"precioBase",
      align:"center",
      render: (text) =>
        `S/ ${text}`,
    },
    {
      title: "Descuento",
      dataIndex:"descuento",
      key:"descuento",
      align:"center",
      onCell: (record) => ({
        style: {
          background: record.descuento <= 10 
            ? 'green' 
            : record.descuento >= 20
            ? '#f54242' 
            : '#FCFB77',  
          color: record.descuento <= 10 || record.descuento >= 20 ? "white" : "black",
          padding: "10px"
        }
      }),
      render: (text) =>
        `${text}%`,
    },
    {
      title:"Ver mas",
      dataIndex:"",
      key:"f",
      align:"center",
      render:(text,record) =>{
        return(
          <Button type="primary" block
          onClick= {() => {
            setIdP(record.producto_id)
            setNombreProducto(record.nombre)
            setOpenTiendaDetalleProducto(true)
          }}
          >+</Button>
        )
      }
    },
    {
      title: "Opciones",
      dataIndex:"",
      key:"x",
      align:"center",
      render:(record) =>{
          return (
            <Row gutter={[8, 8]} justify="center" align="middle">
              <Col>
                <Button type="primary" block
                >Editar</Button>
              </Col>
              <Col>
                <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  okText="Confirmar"
                  cancelText="NO"
                  onConfirm= {() => {
                    deleteProductoById(record.producto_id, id, reload, setReload)
                    getProductosByTienda(id,setproductostienda)
                  }}
                >
                <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
                </Popconfirm>
              </Col>
            </Row>
          );
      }
      
    },
  ];

  return (
    <> 
      <Table columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
      dataSource={[...productostienda]}
      rowKey={(record) => record.producto_id}
      />

      <FloatButton tooltip="Añadir Nuevo Producto" onClick={() => setOpenAddProductoModal(true)} type="primary" icon={<FileAddOutlined />}/>

      <AddProductoModal
      openModal = {OpenAddProductoModal}
      closeModal={() => setOpenAddProductoModal(false)}
      id={id}
      reload={()=>setReload(!reload)}
      />

      <DetallesProductoModal
      openModal = {OpenTiendaDetalleProducto}
      closeModal={setOpenTiendaDetalleProducto}
      id={id}
      idp={idp}
      nombreProducto={nombreProducto}
      />
    </>
  );
};

export default ProductosTable;
