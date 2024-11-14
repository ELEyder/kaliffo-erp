import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal"
import UpdateUsuarioModal from "@CA/trabajadores/UpdateTrabajadorModal";
import AddUsuarioModal from "@CA/trabajadores/AddTrabajadorModal"
import { getUsuarios, deleteUsuarioById } from "@AA/Usuario";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";

const TrabajadoresTable = ({tipo}) => {

  const [id, setId] = useState(1);
  const [data, setData] = useState([]);
  const [OpenAddUsuario, setOpenAddUsuario] = useState(false);
  const [OpenAddIncidencia, setOpenAddIncidencia] = useState(false);
  const [OpenUpdateUsuario, setOpenUpdateUsuario] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getUsuarios(tipo, setData);
  }, [tipo, reload]);

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
                type="primary" block onClick={(e) => {
                  e.stopPropagation()
                  setId(text)
                  setOpenUpdateUsuario(true)
                }}>Editar</Button>
            </Col>
            <Col>
              <Button className="btn-incidencia" block onClick={(e) => {
                e.stopPropagation()
                setId(text)
                setOpenAddIncidencia(true)
              }}>+ Incidencias</Button>
            </Col>
            <Col>
              <Popconfirm
                title="¿ELIMINAR?" description="¿Estas seguro de eliminar este usuario?"
                okText="Confirmar"
                onConfirm={(e) => {
                  e.stopPropagation();
                  deleteUsuarioById(text)
                  setReload(!reload)
                }}
                cancelText="Cancelar"
              >
                <Button block type="primary" danger
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

  if (tipo === "ventas") {
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
        dataSource={data}
        rowKey={"usuario_id"}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/admin/trabajadores/${record.usuario_id}`);
          },
          style: {
            cursor: "pointer",
          }
        })}
      />
      <AddUsuarioModal
        openModal={OpenAddUsuario}
        closeModal={()=>setOpenAddUsuario(false)}
        tipoTrabajador={tipo}
        reload={reload}
        setReload={setReload}
      />
      <UpdateUsuarioModal
        openModal={OpenUpdateUsuario}
        closeModal={()=>setOpenUpdateUsuario(false)}
        tipoTrabajador={tipo}
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
