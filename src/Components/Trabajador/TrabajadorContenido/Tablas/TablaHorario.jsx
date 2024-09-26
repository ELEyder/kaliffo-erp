import { Table, Button, Popconfirm, Flex } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getIncidenciasById } from "../../../../Shared/Funciones/Funciones_Usuario";

const TablaHorario = ({ id }) =>{
    const columns=[
        {
          title: "Fecha",
          dataIndex: "fecha",
          key: "fecha",
          align:"center",
        },
        {
            title: "Inicio",
            dataIndex: "inicio",
            key: "inicio",
            align:"center",
        },
        {
          title: "Fin",
          dataIndex: "fin",
          key: "fin",
          align:"center",
        },
        {
            title: "Horas Trabajadas",
            dataIndex: "horas",
            key: "horas",
            align:"center",
            render: (text) => {
                // Cambia la clase según el valor del stock
                let backgroundColor = text >= 9 ? 'green' : 'yellow';
                backgroundColor = text < 5 ? 'red' : backgroundColor;
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
            title: "Opciones",
            key: "opciones",
            align:"center",
            render:(text,record) =>{
                return (
                    <Flex gap="small" align="center" horizontal="true" style={{width:"100%"}} className="opciones-botones">
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

export default TablaHorario