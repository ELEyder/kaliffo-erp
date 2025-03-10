import { useState } from "react";
import { Flex, Button, Popconfirm, FloatButton } from "antd";
import { Tabla } from "../../../../components/UI";
import { AddIncidenciaModal, UpdateIncidenciaModal } from "../Modals";
import { useIncidencias, useIncidencia } from "../../hooks";

const IncidenciasTable = ({ id }) => {
  const { incidencias, getIncidencias } = useIncidencias(id);
  const { deleteIncidencia } = useIncidencia(getIncidencias);
  const [incidencia, setIncidencia] = useState({});
  const [modals, setModals] = useState({
    addI: false,
    updI: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  let columnas = [
    { title: "N°", dataIndex: "id", render: (_, __, index) => index + 1 },
    { title: "Incidencia", dataIndex: "tipo" },
    { title: "Descripción", dataIndex: "descripcion" },
    { title: "Fecha", dataIndex: "fecha" },
    {
      title: "Opciones",
      render: (record) => {
        return (
          <Flex gap="small" justify="center" align="middle" wrap="wrap">
            <Button
              type="primary"
              block
              onClick={() => {
                setIncidencia(record);
                changeModal("updI", true);
              }}
            >
              Editar
            </Button>
            <Popconfirm
              title="¿Estás seguro de que deseas eliminar esta incidencia?"
              okText="Confirmar"
              cancelText="Cancelar"
              onConfirm={async () => {
                await deleteIncidencia(record.incidencia_id);
              }}
            >
              <Button
                block
                style={{ background: "#f54242", color: "white" }}
                danger
              >
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
