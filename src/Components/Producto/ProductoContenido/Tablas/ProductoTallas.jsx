import { Table, Button, Popconfirm, Row, Col } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getProductosTiendas } from "../../../../Shared/api/Producto";

const ProductoTallas = ({ id }) =>{
    const columns=[
        {
            title: "Tienda",
            dataIndex: "tienda",
            key: "tienda",
            align:"center",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            align:"center",
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
            dataIndex: "precio",
            key: "precio",
            align:"center",
            
        },
        {
            title: "Ver más",
            key: "verMas",
            align:"center",
            render:(text,record) =>{
                return(
                  <Button type="primary" block>+</Button>
                )
              },
        },
        {
            title: "Opciones",
            key: "opciones",
            align:"center",
            render:(text,record) =>{
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
    ]


    const [tabla, setTabla] = useState();

    useEffect(() => {
        getProductosTiendas(id , setTabla);
      }, [id]);

    return(
       <>
         <Table
         ali
        columns={columns}
        dataSource={tabla}
        >

        </Table>
       </>
    )
}

export default ProductoTallas