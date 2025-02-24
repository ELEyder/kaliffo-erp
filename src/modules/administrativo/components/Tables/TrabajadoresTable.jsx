import { Flex, Button, Popconfirm } from "antd";
import { useTrabajadores, useTrabajador } from "../../hooks";
import { Tabla } from "../../../../Components/UI";
import { useState } from "react";
import UpdateTrabajadorModal from "../Forms/UpdateTrabajadorModal";

const TrabajadoresTable = ({tipoTrabajador}) => {
  const { trabajadores } = useTrabajadores(tipoTrabajador);
  const { deleteTrabajador } = useTrabajador();
  const [ dataTrabajador , setDataTrabajador] = useState({});

  const [modals, setModals] = useState({
    updT: false,
  });

  let columnas = [
    {
      title: "Nombre",
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
    },
    { title: "DNI", dataIndex: "dni" },
    { title: "Teléfono", dataIndex: "telefono" },
    { title: "Incidencias", dataIndex: "total_incidencias" },
    { title: "Sueldo", dataIndex: "sueldo" },
    {
      title: "Opciones",
      render: (record) => (
        <Flex gap="small" justify="center" align="middle" wrap="wrap">
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Editar
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el click llegue al padre
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

  if (tipoTrabajador === "ventas") {
    columnas.splice(3, 0, {
      title: "Tienda",
      dataIndex: "tienda",
    });
  }

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"trabajador_id"}
        dataSource={trabajadores}
      />

      <UpdateTrabajadorModal
        openModal={modals.updT}
        closeModal={() => changeModal("updT", false)}
        tipoTrabajador={tipoTrabajador}
        data={dataTrabajador}
      />
    </>
  );
};

export default TrabajadoresTable;
