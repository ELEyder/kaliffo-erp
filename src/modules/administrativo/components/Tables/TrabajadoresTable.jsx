import { Flex, Button, Popconfirm, FloatButton } from "antd";
import { useTrabajadores, useTrabajador } from "../../hooks";
import { Tabla } from "../../../../Components/UI";
import { useState } from "react";
import UpdateTrabajadorModal from "../Modals/UpdateTrabajadorModal";
import AddTrabajadorModal from "../Modals/AddTrabajadorModal";
import AddIncidenciaModal from "../Modals/AddIncidenciaModal";

const TrabajadoresTable = ({ params }) => {
  const { trabajadores, loading , getTrabajadores } = useTrabajadores(params);
  const { deleteTrabajador } = useTrabajador(null, getTrabajadores);
  const [dataTrabajador, setDataTrabajador] = useState({});

  const [modals, setModals] = useState({
    updT: false,
    addT: false,
    addI: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  let columnas = [
    { title: "Nombres", dataIndex: "nombres" },
    { title: "DNI", dataIndex: "dni" },
    { title: "Teléfono", dataIndex: "telefono" },
    { title: "Incidencias", dataIndex: "total_incidencias" },
    { title: "Sueldo", dataIndex: "sueldo" },
    { title: "Rol", dataIndex: "rol" },
    { title: "Tienda", dataIndex: "tienda" },
    {
      title: "Opciones",
      render: (record) => (
        <Flex gap="small" justify="center" align="middle" wrap="wrap">
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setDataTrabajador(record);
              changeModal("updT", true);
            }}
          >
            Editar
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setDataTrabajador(record);
              changeModal("addI", true);
            }}
          >
            + Incidencia
          </Button>
          <Popconfirm
            title="¿ELIMINAR?"
            description="¿Estás seguro de eliminar este usuario?"
            okText="Confirmar"
            cancelText="Cancelar"
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteTrabajador(record.trabajador_id);
            }}
          >
            <Button type="primary" danger onClick={(e) => e.stopPropagation()}>
              Eliminar
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"trabajador_id"}
        dataSource={trabajadores}
        loading={loading}
      />

      <FloatButton onClick={() => changeModal("addT", true)} />

      <UpdateTrabajadorModal
        openModal={modals.updT}
        closeModal={() => changeModal("updT", false)}
        data={dataTrabajador}
        onUpdated={getTrabajadores}
      />

      <AddTrabajadorModal
        openModal={modals.addT}
        closeModal={() => changeModal("addT", false)}
        onAdded={getTrabajadores}
      />

      <AddIncidenciaModal
        openModal={modals.addI}
        closeModal={() => changeModal("addI", false)}
        id={dataTrabajador.trabajador_id}
        onAdded={getTrabajadores}
      />
    </>
  );
};

export default TrabajadoresTable;
