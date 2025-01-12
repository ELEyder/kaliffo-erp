import apiClient from '../../../API/apiClient';
import { useState, useEffect } from 'react';
import { useParams, Navigate } from "react-router-dom";
import Tabla from "../../../Components/Tabla";
import { Button, Flex, Popconfirm, Divider, FloatButton } from "antd";

import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal";
import UpdateTrabajadorModal from "@CA/trabajadores/UpdateTrabajadorModal";
import AddTrabajadorModal from "@CA/trabajadores/AddTrabajadorModal";
const Trabajadores = () => {

  const [reload, setReload] = useState(true)
  const { tipoTrabajador } = useParams();
  const [trabajadores, setTrabajadores] = useState([]);
  const [tiposTrabajador, setTiposTrabajador] = useState({ ventas: 1, talleres: 2, miscelaneos: 3, costureros: 4 });

  const [openAddTrabajador, setOpenAddTrabajador] = useState(false);
  const [openAddIncidencia, setOpenAddIncidencia] = useState(false);
  const [openUpdateTrabajador, setOpenUpdateTrabajador] = useState(false);
  const [id, setId] = useState(1);

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
      dataIndex: "trabajador_id",
      key: "trabajador_id",
      align: "center",
      render: (text) => (
        <Flex gap='small' justify="center" align="middle" wrap="wrap">
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setId(text);
              setOpenUpdateTrabajador(true);
            }}
          >
            Editar
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setId(text);
              setOpenAddIncidencia(true);
            }}
          >
            + Incidencia
          </Button>
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
              type="primary"
              danger
              onClick={(e) => e.stopPropagation()}
            >
              Eliminar
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  if (tipoTrabajador === "ventas") {
    columnas.splice(3, 0,
      { title: "Tienda", dataIndex: "tienda", key: "tienda", align: "center" });
  }

  if (!Object.keys(tiposTrabajador).includes(tipoTrabajador)) {
    return <Navigate to="/error" />;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(`/trabajador?rol=${tiposTrabajador[tipoTrabajador]}`);
        setTrabajadores(response.data);
      } catch (e) {
        setTrabajadores([]);
      }
    }
    fetchData();
  }, [reload]);

  return (
    <>
      {/* Divisor estilizado que muestra el tipoTrabajador */}
      <Divider style={{ textTransform: "uppercase" }}>{tipoTrabajador}</Divider>
      {/* Tabla que muestra los trabajadores según el tipoTrabajador */}
      <Tabla columnas={columnas} dataSource={trabajadores} rowKey={"trabajador_id"} />

      <FloatButton
        tooltip="Añadir nuevo trabajador"
        onClick={() => setOpenAddTrabajador(true)}
      />

      <AddTrabajadorModal
        openModal={openAddTrabajador}
        closeModal={() => setOpenAddTrabajador(false)}
        tipoTrabajador={tipoTrabajador}
        reload={reload}
        setReload={setReload}
      />

      <UpdateTrabajadorModal
        openModal={openUpdateTrabajador}
        closeModal={() => setOpenUpdateTrabajador(false)}
        tipoTrabajador={tipoTrabajador}
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

export default Trabajadores;
