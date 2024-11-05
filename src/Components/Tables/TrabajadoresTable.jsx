import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIncidenciaModal from "../Modals/AddIncidenciaModal"
import UpdateUsuarioModal from "../Modals/UpdateUsuarioModal";
import AddUsuarioModal from "../Modals/AddUsuarioModal"
import { getUsuarios, deleteUsuarioById } from "../../Shared/api/Usuario";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";

const TrabajadoresTable = () => {
  const { tipo_trabajador } = useParams();
  const [id, setId] = useState(1);
  const [tabla_datos, SetTabla_datos] = useState([]);
  const [OpenAddUsuario, setOpenAddUsuario] = useState(false);
  const [OpenAddIncidencia, setOpenAddIncidencia] = useState(false);
  const [OpenUpdateUsuario, setOpenUpdateUsuario] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getUsuarios(tipo_trabajador, SetTabla_datos);
  }, [tipo_trabajador, reload]);

  const columnas = [
    {
      title: "Nombre", key: "nombre", align: "center",
      render: (record) => `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
    },
    {
      title: "DNI", dataIndex: "dni", key: "dni", defaultSortOrder: "ascend", align: "center",
      sorter: {
        compare: (a, b) => a.dni.localeCompare(b.dni),
        multiple: 1,
      },
    },
    {
      title: "Teléfono", dataIndex: "telefono", key: "telefono", defaultSortOrder: "ascend", align: "center",
      sorter: {
        compare: (a, b) => a.telefono.localeCompare(b.telefono),
        multiple: 2,
      },
    },
    {
      title: "Incidencias", dataIndex: "total_incidencias", key: "total_incidencias", defaultSortOrder: "ascend", align: "center",
      sorter: {
        compare: (a, b) => a.total_incidencias.localeCompare(b.total_incidencias),
        multiple: 2,
      },
    },
    {
      title: "Sueldo", dataIndex: "sueldo", key: "sueldo", defaultSortOrder: "ascend", align: "center",
      sorter: {
        compare: (a, b) => a.sueldo.localeCompare(b.sueldo),
        multiple: 2,
      },
    },
    {
      title: "Opciones", dataIndex: "usuario_id", key: "usuario_id", align: "center",
      render: (text) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle" className="opciones-botones">
            <Col>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation()
                  setId(text)
                  setOpenUpdateUsuario(true)
                }}
                block>
                Editar
              </Button>
            </Col>
            <Col>
              <Button className="btn-incidencia" onClick={(e) => {
                e.stopPropagation()
                setId(text)
                setOpenAddIncidencia(true)
              }}
                block>
                + Incidencias
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                onConfirm={(e) => {
                  e.stopPropagation();
                  deleteUsuarioById(text)
                  setReload(!reload)
                }}
                cancelText="NO"
              >
                <Button block style={{ background: "#f54242", color: "white" }}
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    setReload(!reload)
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
      title: "Tienda", dataIndex: "tienda", key: "tienda", align: "center",
    });
  }

  return (
    <>
      <FloatButton tooltip="Añadir nuevo trabajador" onClick={() => setOpenAddUsuario(true)} />

      <Table
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={tabla_datos}
        rowKey={"usuario_id"}
        onRow={(record) => ({
          onClick: () => {
            window.location.href = `/trabajadores/${record.usuario_id}`
          },
          style: {
            cursor: "pointer",
          }
        })}
      />
      <AddUsuarioModal
        openModal={OpenAddUsuario}
        closeModal={()=>setOpenAddUsuario(false)}
        tipoTrabajador={tipo_trabajador}
        reload={reload}
        setReload={setReload}
      />
      <UpdateUsuarioModal
        openModal={OpenUpdateUsuario}
        closeModal={()=>setOpenUpdateUsuario(false)}
        tipoTrabajador={tipo_trabajador}
        reload={() => setReload(!reload)}
        id={id}
      />

      <AddIncidenciaModal
        openModal={OpenAddIncidencia}
        closeModal={()=>setOpenAddIncidencia(false)}
        reload={() => setReload(!reload)}
        id={id}
      />
    </>
  );
};
export default TrabajadoresTable;
