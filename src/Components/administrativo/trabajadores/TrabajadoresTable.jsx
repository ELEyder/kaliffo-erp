import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal";
import UpdateTrabajadorModal from "@CA/trabajadores/UpdateTrabajadorModal";
import AddTrabajadorModal from "@CA/trabajadores/AddTrabajadorModal";
import { getTrabajadores, deleteTrabajadorById } from "@AA/Usuario";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";

const TrabajadoresTable = ({ tipo }) => {
  // Estados para manejar datos y modales
  const [id, setId] = useState(1);
  const [data, setData] = useState([]);
  const [openAddTrabajador, setOpenAddTrabajador] = useState(false);
  const [openAddIncidencia, setOpenAddIncidencia] = useState(false);
  const [openUpdateTrabajador, setOpenUpdateTrabajador] = useState(false);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  // Efecto para cargar trabajadores según el tipo y recargar al cambiar
  useEffect(() => {
    getTrabajadores(tipo, setData);
  }, [tipo, reload]);

  // Definición de columnas de la tabla
  const columnas = [
    {
      title: "Nombre",
      key: "nombre",
      align: "center",
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      align: "center",
      sorter: (a, b) => a.dni.localeCompare(b.dni),
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
      sorter: (a, b) => a.telefono.localeCompare(b.telefono),
    },
    {
      title: "Incidencias",
      dataIndex: "total_incidencias",
      key: "total_incidencias",
      align: "center",
      sorter: (a, b) => a.total_incidencias - b.total_incidencias,
    },
    {
      title: "Sueldo",
      dataIndex: "sueldo",
      key: "sueldo",
      align: "center",
      sorter: (a, b) => a.sueldo - b.sueldo,
    },
    {
      title: "Opciones",
      dataIndex: "usuario_id",
      key: "usuario_id",
      align: "center",
      render: (text) => (
        <Row gutter={[8, 8]} justify="center" align="middle">
          <Col>
            <Button
              type="primary"
              block
              onClick={(e) => {
                e.stopPropagation();
                setId(text);
                setOpenUpdateTrabajador(true);
              }}
            >
              Editar
            </Button>
          </Col>
          <Col>
            <Button
              block
              onClick={(e) => {
                e.stopPropagation();
                setId(text);
                setOpenAddIncidencia(true);
              }}
            >
              + Incidencias
            </Button>
          </Col>
          <Col>
            <Popconfirm
              title="¿ELIMINAR?"
              description="¿Estás seguro de eliminar este usuario?"
              okText="Confirmar"
              cancelText="Cancelar"
              onConfirm={(e) => {
                e.stopPropagation();
                deleteTrabajadorById(text);
                setReload(!reload);
              }}
            >
              <Button
                block
                type="primary"
                danger
                onClick={(e) => e.stopPropagation()}
              >
                Eliminar
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  // Agregar columna específica si el tipo es "ventas"
  if (tipo === "ventas") {
    columnas.splice(3, 0, {
      title: "Tienda",
      dataIndex: "tienda",
      key: "tienda",
      align: "center",
    });
  }

  return (
    <>
      {/* Botón flotante para añadir un trabajador */}
      <FloatButton
        tooltip="Añadir nuevo trabajador"
        onClick={() => setOpenAddTrabajador(true)}
      />

      {/* Tabla de trabajadores */}
      <Table
        size="middle"
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={data}
        rowKey={"trabajador_id"}
        onRow={(record) => ({
          onClick: () => navigate(`/admin/trabajadores/${record.trabajador_id}`),
          style: { cursor: "pointer" },
        })}
      />

      {/* Modales */}
      <AddTrabajadorModal
        openModal={openAddTrabajador}
        closeModal={() => setOpenAddTrabajador(false)}
        tipoTrabajador={tipo}
        reload={reload}
        setReload={setReload}
      />
      <UpdateTrabajadorModal
        openModal={openUpdateTrabajador}
        closeModal={() => setOpenUpdateTrabajador(false)}
        tipoTrabajador={tipo}
        reload={() => setReload(!reload)}
        id={id}
      />
      <AddIncidenciaModal
        openModal={openAddIncidencia}
        closeModal={() => setOpenAddIncidencia(false)}
        reload={() => setReload(!reload)}
        id={id}
      />
    </>
  );
};

export default TrabajadoresTable;
