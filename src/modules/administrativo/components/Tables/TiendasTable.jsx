import { useState } from "react";
import { useTiendas, useTienda } from "../../hooks";
import {UpdateTiendaModal, AddTiendaModal} from "../Modals";
import { Flex, Button, Popconfirm, FloatButton } from "antd";
import { Tabla } from "../../../../components/UI";

const TiendasTable = () => {
  const { tiendas, loading , getTiendas } = useTiendas();
  const { deleteTienda } = useTienda(getTiendas);
  const [dataTienda, setDataTienda] = useState({});

  const [modals, setModals] = useState({
    updT: false,
    addT: false,
    addI: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  let columnas = [
    { title: "Tienda", dataIndex: "tienda" },
    { title: "Teléfono", dataIndex: "telefono" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Usuarios", dataIndex: "usuarios" },
    { title: "Dirección", dataIndex: "direccion" },
    {
      title: "Opciones",
      render: (record) => (
        <Flex gap="small" justify="center" align="middle" wrap="wrap">
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              setDataTienda(record);
              changeModal("updT", true);
            }}
          >
            Editar
          </Button>
          <Popconfirm
            title="¿ELIMINAR?"
            description="¿Estás seguro de eliminar este usuario?"
            okText="Confirmar"
            cancelText="Cancelar"
            onConfirm={async (e) => {
              e.stopPropagation();
              await deleteTienda(record.tienda_id);
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
        rowKey={"tienda_id"}
        dataSource={tiendas}
        loading={loading}
      />

      <FloatButton onClick={() => changeModal("addT", true)} />

      <UpdateTiendaModal
        openModal={modals.updT}
        closeModal={() => changeModal("updT", false)}
        data={dataTienda}
        onUpdated={getTiendas}
      />

      <AddTiendaModal
        openModal={modals.addT}
        closeModal={() => changeModal("addT", false)}
        onAdded={getTiendas}
      />

    </>
  );
};

export default TiendasTable;
