import { Table, Button, Popconfirm, Flex } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getHorarioById } from "../../../../Shared/Funciones/Funciones_Usuario";

const TablaHorario = ({ id }) =>{
    const columns=[
        {
          title: "Hora de Ingreso",
          dataIndex: "hora_entrada",
          key: "hora_entrada",
          align:"center",
        },
        {
          title: "Hora de Salida",
          dataIndex: "hora_salida",
          key: "hora_salida",
          align:"center",
        },
        {
          title: "Horas Trabajadas",
          dataIndex: "horas_trabajadas",
          key: "horas_trabajadas",
          align:"center",
          render: (text) => {
            // Esta parte se encarga de devolver el contenido de la celda
            return (
                <p style={{ margin: 0 }}>{text}</p>
            );
         },
          onCell: (record) => {
            const [horas, minutos, seg] = record.horas_trabajadas.split(':').map(Number);
            const totalMinutos = horas * 60 + minutos;

            let backgroundColor = totalMinutos >= 540 ? 'green' : '#FCFB77';
            backgroundColor = totalMinutos <= 300 ? '#f54242' : backgroundColor;
            let color = backgroundColor === '#FCFB77' ? 'black' : 'white';
      
              return {
                  style: {
                      background: backgroundColor,
                      padding: "10px",
                      color: color
                  }
              };
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
      getHorarioById(id , setTabla);
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