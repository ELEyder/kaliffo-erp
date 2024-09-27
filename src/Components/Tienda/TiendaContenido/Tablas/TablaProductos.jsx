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
    render(text, record) {
      let backgroundColor = text >= 50 ? 'green' : '#FCFB77';
      backgroundColor = text < 20 ? '#f54242' : backgroundColor;
      let color = backgroundColor == '#FCFB77' ? 'black' : 'white'; 
        return {
          props: {
              style: { background: backgroundColor, padding: "10px"}  
          },
          children: <p style={{color: color, margin: 0}}>{text}</p>
        };
      }
  },
  {
    title: "Precio",
    key:"precio",
    dataIndex:"precio",
    align:"center",
    render(text) {
      return {
        children: "S/" + text
      };
    }
  },
  {
    title: "Descuento",
    dataIndex:"descuento",
    key:"descuento",
    align:"center",
    render(text, record) {
      let backgroundColor = text >= 50 ? 'green' : '#FCFB77';
      backgroundColor = text < 20 ? '#f54242' : backgroundColor;
      let color = backgroundColor == '#FCFB77' ? 'black' : 'white'; 
        return {
          props: {
              style: { background: backgroundColor, padding: "10px"}  
          },
          children: <p style={{color: color, margin: 0}}>{text}%</p>
        };
      }
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
      closeModalProductoAddTiendaAbierto={closeModalProductoAddTiendaAbierto} id={id}/>
    </>
  );
};

export default TiendaProductos;
