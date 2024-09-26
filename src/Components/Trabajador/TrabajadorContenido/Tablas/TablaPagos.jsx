import { Table, Button, Popconfirm, Flex } from "antd";
import React from "react";
import { useState, useEffect } from 'react'
import { getPagosById } from "../../../../Shared/Funciones/Funciones_Usuario";

const TablaPagos = ({ id }) =>{
    const columns=[
        {
          title: "Monto Pagado",
          dataIndex: "montoPagado",
          key: "montoPagado",
          align:"center",
        },
        {
          title: "Monto Faltante",
          dataIndex: "montoFaltante",
          key: "montoFaltante",
          align:"center",
        },
        {
          title: "Fecha",
          dataIndex: "fecha",
          key: "fecha",
          align:"center",
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            align:"estado",
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
        getPagosById(id , setTabla);
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

export default TablaPagos