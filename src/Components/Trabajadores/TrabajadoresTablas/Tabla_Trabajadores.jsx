import React, { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Table, notification } from "antd";
import {
  editar,
  FetchDataTablaTrabajadores,
} from "../../../Shared/Funciones/Funciones_Fetch";

const Tabla_Trabajadores = ({
  tipo_trabajador,
  Refrescar,
  editar,
  incidencias,
  eliminar,
}) => {
  const [tabla_datos, SetTabla_datos] = useState([]);

  const [notificacion, setNotificaciones] = notification.useNotification();

  // const abrirNotificacion = (placement) => {
  //   notificacion.info({
  //     message: notificacion,
  //     description: "La tabla ha sido recargada correctamente",
  //     placement,
  //   });
  // };

  const columnas = [
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
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => a.dni.localeCompare(b.dni),
        multiple: 1,
      },
      align: "center",
      responsive: ['sm'],
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => a.telefono.localeCompare(b.telefono),
        multiple: 2,
      },
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
              <Button type="primary" onClick={() => editar(record.usuario_id)} block>Editar</Button>
              <Button style={{background:"#ffdf5e",color:"white"}}
               onClick={() => incidencias(record.usuario_id)} block>
                Incidencias
              </Button>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                onConfirm={() => eliminar(record.usuario_id)}
                cancelText="NO"
              >
                <Button block style={{background:"#f54242",color:"white"}} danger>Eliminar</Button>
              </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  if (tipo_trabajador === "ventas") {
    columnas.splice(3, 0, {
      title: "Tienda",
      dataIndex: "tienda",
      key: "tienda",
      align: "center",
      responsive: ['sm'],
    });
  }

  useEffect(() => {
    FetchDataTablaTrabajadores(tipo_trabajador, SetTabla_datos);
    if (Refrescar) {
      FetchDataTablaTrabajadores(tipo_trabajador, SetTabla_datos);
    }
  }, [tipo_trabajador, Refrescar]);

  return (
    <>
      {setNotificaciones}
      <Table
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={[...tabla_datos]}
        rowKey={(record) => record.dni}
        bordered
        className="tabla_trabajadores"
      />
    </>
  );
};

export default Tabla_Trabajadores;
