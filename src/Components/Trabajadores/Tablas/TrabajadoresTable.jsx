import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIncidenciaModal from "../Modals/AddIncidenciaModal"
import UpdateUsuarioModal from "../Modals/UpdateUsuarioModal";
import { getUsuarios, deleteUsuario } from "../../../Shared/api/Usuario";
import { Button, Row, Col, Popconfirm, Table } from "antd";

const TrabajadoresTable = ({ reload }) => {

  const { tipo_trabajador } = useParams();
  const [tabla_datos, SetTabla_datos] = useState([]);
  const [openAddIncidencia, setOpenAddIncidencia] = useState(false);
  const [openUpdateUsuario, setOpenUpdateUsuario] = useState(false);
  const [id, setId] = useState(1);
  
  const columnas = [
    {
      title: "Nombre",
      key: "nombre",
      render: (record) =>
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
        compare: (a, b) => a.total_incidencias.localeCompare(b.total_incidencias),
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
        compare: (a, b) => a.sueldo.localeCompare(b.sueldo),
        multiple: 2,
      },
      align: "center",
    },
    {
      title: "Opciones",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (record) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle" className="opciones-botones">
            <Col>
              <Button
              type="primary"
              onClick={(e) =>{
                e.stopPropagation()
                setId(record.usuario_id)
                setOpenUpdateUsuario(true)
              }}
              block>
                Editar
              </Button>
            </Col>
            <Col>
              <Button className="btn-incidencia" onClick={(e) => {
                e.stopPropagation()
                setId(record.usuario_id)
                setOpenAddIncidencia(true)}
              }
              block
              >
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
                  deleteUsuario(record.usuario_id)
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
    getUsuarios(tipo_trabajador, SetTabla_datos);
  }, [tipo_trabajador, reload]);

  return (
    <>
      <Table
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={tabla_datos.map((item, index) => ({ ...item, key: index }))}
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
      <UpdateUsuarioModal
        openModal={openUpdateUsuario}
        closeModal={setOpenUpdateUsuario}
        tipoTrabajador={tipo_trabajador}
        reload={reload}
        id={id}
      />

      <AddIncidenciaModal
        openModal={openAddIncidencia}
        closeModal={setOpenAddIncidencia}
        reload={reload}
        id={id}
      />
    </>
  );
};

export default TrabajadoresTable;
