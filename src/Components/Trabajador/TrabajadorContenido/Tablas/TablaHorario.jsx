import { Table, Button, Popconfirm, Flex } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getIncidenciasById } from "../../../../Shared/Funciones/Funciones_Usuario";

const TablaHorario = ({ id }) =>{
    const columns=[
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            render: (text, record, index) => index + 1,
            align:"center",
        },
        {
            title: "Incidencia",
            dataIndex: "incidencia",
            key: "incidencia",
            align:"center",
            render(text) {
              let backgroundColor = text == "Familiar" ? '#FCFB77' : '#f54242';
              backgroundColor = text == "Personal" ? 'orange' : backgroundColor;
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
        pagination={{ pageSize: 5 }}
        >

        </Table>
       </>
    )
}

export default TablaHorario