import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, notification } from "antd";
import { editar, FetchDataTablaTrabajadores } from "../../../Shared/Funciones/Funciones_Fetch";


const Tabla_Trabajadores = ({ tipo_trabajador, Refrescar,editar,incidencias,eliminar }) => {

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
    },
    {
      title: "Opciones",
      dataIndex: "",
      key: "x",
      render: (text,record) => {
        return (
          <>
            <Button onClick={() => editar(record.usuario_id)}>
              Editar
            </Button>
            <Button onClick={() => incidencias(record.usuario_id)}>
              Incidencias
            </Button>
            <Popconfirm
            title="ELIMINAR"
            description="DESEA ELIMINAR A"
            okText="Confirmar"
            onConfirm={()=>eliminar(record.usuario_id)}
            cancelText="NO"
            >
              <Button>Eliminar</Button>
            </Popconfirm>
          </>
        );
      }
    },
  ];

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
        pagination={{pageSize:5}}
        dataSource={[...tabla_datos]}
        rowKey={(record) => record.dni}
      />     
    </>
  );
};

export default Tabla_Trabajadores;