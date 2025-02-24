import { useState } from "react";
import { Flex, Button, Popconfirm, FloatButton } from "antd";
import { Tabla } from "../../../../Components/UI";
import AddIncidenciaModal from "../Modals/AddIncidenciaModal";
import {useIncidencias, useIncidencia} from "../../hooks";
import UpdateIncidenciaModal from "../Modals/UpdateIncidenciaModal";

const IncidenciasTable = ({ id }) => {
  const { incidencias, getIncidencias } = useIncidencias(id);
  const { deleteIncidencia } = useIncidencia(getIncidencias);
  const [ incidencia, setIncidencia ] = useState({});
  const [modals, setModals] = useState({
    addI: false,
    updI: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  let columnas = [
    { title: "N°", dataIndex: "id", render: (_, __, index) => index + 1 },
    {
      title: "Incidencia",
      dataIndex: "tipo",
      render: (value) => {
        const incidenciaMap = {
          1: "Familiar",
          2: "Salud",
          3: "Personal",
        };
        return incidenciaMap[value] || "Desconocido";
      },
      onCell: (record) => ({
        style: {
          background: record.tipo === 1 ? '#FCFB77' :
          record.tipo === 2 ? 'orange' : '#f54242',
          color: record.tipo === 3 ? "white" : "black",
          padding: "10px",
        },
      }),
    },
    { title: "Descripción", dataIndex: "descripcion" },
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: (fecha) => fecha ? new Date(fecha).toLocaleDateString("es-ES") : "-",
    },
    {
      title: "Opciones", // Columna de opciones para editar y eliminar incidencias
      render: (record) => { // Renderizado personalizado para los botones de editar y eliminar
        return (
          <Flex gap="small" justify="center" align="middle" wrap="wrap">
            <Button type="primary" block onClick={() => {
              setIncidencia(record); // Establecer la incidencia seleccionada para editar
              changeModal("updI", true); // Abrir el modal de edición
            }}>
              Editar
            </Button>
            <Popconfirm
              title="¿Estás seguro de que deseas eliminar esta incidencia?" // Confirmación para eliminar
              okText="Confirmar"
              cancelText="Cancelar"
              onConfirm={async () => {
                await deleteIncidencia(record.incidencia_id);
              }}
            >
              <Button block style={{ background: "#f54242", color: "white" }} danger>
                Eliminar
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"incidencia_id"}
        dataSource={incidencias}
      />

      <FloatButton onClick={() => changeModal("addI", true)} />

      <AddIncidenciaModal
        openModal={modals.addI}
        closeModal={() => changeModal("addI", false)}
        id={id}
        onAdded={getIncidencias}
      />

      <UpdateIncidenciaModal
        openModal={modals.updI}
        closeModal={() => changeModal("updI", false)}
        data={incidencia}
        onUpdated={getIncidencias}
      />
    </>
  );
};

export default IncidenciasTable;
