import { Table, Button, Popconfirm, Flex } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getIncidenciasById } from "../../../../Shared/Funciones/Funciones_Usuario";

const ProductoColores = ({ id }) =>{
    const columns=[
        {
            title: "Incidencia",
            dataIndex: "incidencia",
            key: "incidencia",
            align:"center",
        },
        {
            title: "Tipo",
            dataIndex: "tipo",
            key: "tipo",
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
            title: "Descripción",
            dataIndex: "descripcion",
            key: "descripcion",
            align:"center",
            
        },
        {
          title: "Fecha",
          dataIndex: "fecha",
          key: "fecha",
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
    ]


    const [tabla, setTabla] = useState();

    useEffect(() => {
      getIncidenciasById(id , setTabla);
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

export default ProductoColores