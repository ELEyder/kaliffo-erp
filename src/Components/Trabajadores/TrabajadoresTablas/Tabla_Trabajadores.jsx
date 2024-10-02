import React, { useEffect, useState } from "react";
import { Button, Row, Col, Popconfirm, Table, notification } from "antd";
import {
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
      title: "Incidencias",
      dataIndex: "total_incidencias",
      key: "total_incidencias",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => a.telefono.localeCompare(b.total_incidencias),
        multiple: 2,
      },
      align: "center",
    },
    {
      title: "Sueldo",
      dataIndex: "sueldo",
      key: "sueldo",
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
          <Row gutter={[8, 8]} justify="center" align="middle" className="opciones-botones">
            <Col>
              <Button
              type="primary"
              onClick={(e) =>{
                e.stopPropagation()
                editar(record.usuario_id)
              }}
              block
              >
                Editar
              </Button>
            </Col>
            <Col>
              <Button style={{ background: "#ffdf5e", color: "black" }} onClick={() => incidencias(record.usuario_id)} block>
                Incidencias
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                onConfirm={(e) =>{
                  e.stopPropagation();
                  eliminar(record.usuario_id)
                }} 
                cancelText="NO"
              >
                <Button block style={{ background: "#f54242", color: "white" }}
                danger
                onClick={(e) =>{
                  e.stopPropagation();
                }} 
                >
                  Eliminar
                </Button>
              </Popconfirm>
            </Col>
          </Row>
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
      <Table
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={[...tabla_datos]}
        rowKey={(record) => record.dni}
        bordered
        className="tabla_trabajadores"
        onRow={(record) => ({
          onClick: () => {
            window.location.href = `/trabajador/${record.usuario_id}`
          },
          style: {
            cursor: "pointer",
          }
        })}
      />
    </>
  );
};

export default Tabla_Trabajadores;
