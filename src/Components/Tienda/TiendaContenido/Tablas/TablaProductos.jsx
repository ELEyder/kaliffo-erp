import { Button, Row, Col, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getProductosTienda } from "../../../../Shared/Funciones/Fucniones_Tienda";
import TiendaAddProductos from "../../TiendaModales/TiendaAddProductos";

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
    render: (text) => {
      // Cambia la clase según el valor del stock
      let backgroundColor = text >= 50 ? 'green' : 'yellow';
      backgroundColor = text < 20 ? 'red' : backgroundColor;
      let color = backgroundColor == 'yellow' ? 'black' : 'white'; 
      return (
        <span style={{ 
            display: 'block', 
            width: '100%', 
            backgroundColor: backgroundColor, 
            color: color, 
            padding: '8px', 
            textAlign: 'center', 
          }}>
          {text}
        </span>
      );    
    },
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
    align:"center",
    render: (text) => {
      // Cambia la clase según el valor del stock
      let backgroundColor = text >= 30 ? 'green' : 'yellow';
      backgroundColor = text < 20 ? 'red' : backgroundColor;
      let color = backgroundColor == 'yellow' ? 'black' : 'white'; 
      return (
        <span style={{ 
            display: 'block', 
            width: '100%', 
            backgroundColor: backgroundColor, 
            color: color, 
            padding: '8px', 
            textAlign: 'center', 
          }}>
          {text}
        </span>
      );    
    },
  },
  {
    title:"Ver mas",
    dataIndex:"",
    key:"f",
    align:"center",
    render:(text,record) =>{
      return(
        <Button type="primary" block>+</Button>
      )
    }
  },
  {
    title: "Opciones",
    dataIndex:"",
    key:"x",
    align:"center",
    render:() =>{
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
              >
              <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
              </Popconfirm>
            </Col>
          </Row>
        );
    }
    
  },
];

const TiendaProductos = ({ id,handlerefrescarSideCard1 }) => {

    const[productostienda,setproductostienda] = useState([])
    
    const[ModalProductoAddTiendaAbierto,setModalProductoAddTiendaAbierto] = useState(false)

    const showModalProductoAddTiendaAbierto = () =>{
      setModalProductoAddTiendaAbierto(true)
    }

    const closeModalProductoAddTiendaAbierto = () =>{
      setModalProductoAddTiendaAbierto(false)
    }

  useEffect(() => {
    getProductosTienda(id,setproductostienda)
  }, [id]);

  return (
    <> 
      <Button onClick={showModalProductoAddTiendaAbierto}>Añadir Nuevo Producto</Button>
      <Table columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
      dataSource={[...productostienda]}
      rowKey={(record) => record.producto_id}
      ></Table>
      <TiendaAddProductos ModalProductoAddTiendaAbierto={ModalProductoAddTiendaAbierto}
      closeModalProductoAddTiendaAbierto={closeModalProductoAddTiendaAbierto}/>
    </>
  );
};

export default TiendaProductos;
