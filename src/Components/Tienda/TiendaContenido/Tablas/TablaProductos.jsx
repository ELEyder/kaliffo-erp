import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { getProductosByTienda } from "../../../../Shared/api/Producto";
import { deleteProductoById } from "../../../../Shared/api/Producto";
import ModalAddProducto from "../../TiendaModales/ModalAddProducto";


const TiendaProductos = ({ id,handlerefrescarSideCard1 }) => {
  const navigate = useNavigate();
  const[productostienda,setproductostienda] = useState([])
  const[reload,setReload] = useState(false)
  const[ModalProductoAddTiendaAbierto,setModalProductoAddTiendaAbierto] = useState(false)

  const columns = [
    {
      title: "Producto",
      key: "nombre",
      dataIndex:"nombre",
      align: "center",
    },
    {
      title: "Stock",
      key: "stockTotal",
      align: "center",
      dataIndex:"stockTotal",
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
          onClick={() => {
            navigate(`/producto/${record.producto_id}`)
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
                <Button type="primary" block>Editar</Button>
              </Col>
              <Col>
                <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  okText="Confirmar"
                  cancelText="NO"
                  onConfirm= {() => {
                    deleteProductoById(record.producto_id, id, reload, setReload)
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
  
    const showModalProductoAddTiendaAbierto = () =>{
      setModalProductoAddTiendaAbierto(true)
    }

    const closeModalProductoAddTiendaAbierto = () =>{
      setModalProductoAddTiendaAbierto(false)
    }

  useEffect(() => {
    getProductosByTienda(id,setproductostienda)
  }, [id, reload]);

  return (
    <> 
      <Table columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
      dataSource={[...productostienda]}
      rowKey={(record) => record.producto_id}
      ></Table>

      <FloatButton tooltip="Añadir Nuevo Pago" onClick={() => showModalProductoAddTiendaAbierto()} type="primary" icon={<FileAddOutlined />}/>

      <ModalAddProducto
      ModalProductoAddTiendaAbierto={ModalProductoAddTiendaAbierto}
      closeModalProductoAddTiendaAbierto={closeModalProductoAddTiendaAbierto}
      id={id}
      />
    </>
  );
};

export default TiendaProductos;
