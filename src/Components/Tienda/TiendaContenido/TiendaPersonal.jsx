import { Table, Button, Flex, Popconfirm } from "antd";
import React, { useState,useEffect } from "react";
import { getusuariosTienda } from "../../../Shared/Funciones/Fucniones_Tienda";

const columns = [
  {
    title: "Nombre",
    key: "nombre",
    render: (text, record) =>
      `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
    align: "center",
  },
  {
    title: "DNI",
    dataIndex: "dni",
    key: "dni",
    align: "center",
  },
  {
    title: "Teléfono",
    dataIndex: "telefono",
    key: "telefono",
    align: "center",
  },
  {
    title: "Opciones",
    dataIndex: "",
    key: "x",
    align: "center",
    render: (text, record) => {
      return (
        <Flex gap="small" align="center" horizontal="true" style={{width:"100%"}} className="opciones-botones">
            <Button type="primary"  block>Editar</Button>
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
    },
  },
];

const TiendaPersonal = ({id}) => {

    const[usuariostienda,setusuariostienda]=useState([])

    useEffect(() => {
        getusuariosTienda(id,setusuariostienda)
      }, [id]);

  return (
    <>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        dataSource={[...usuariostienda]}
        rowKey={(record) => record.usuario_id}
      ></Table>
    </>
  );
};

export default TiendaPersonal;
