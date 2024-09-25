import { Table, Button, Popconfirm, Row, Col } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getProductoTiendas } from "../../../../Shared/Funciones/Funciones_Producto";

const ProductoTiendas = ({ id }) =>{
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
        getProductoTiendas(id , setTabla);
      }, [id]);

    return(
       <>
         <Table
         ali
        columns={columns}
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))}
        >

        </Table>
       </>
    )
}

export default ProductoTiendas