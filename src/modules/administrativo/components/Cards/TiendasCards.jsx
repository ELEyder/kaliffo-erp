import React, { useEffect, useState } from "react"; // Hooks de React
import { Flex, FloatButton } from "antd"; // Componentes de Ant Design para diseño y acciones

// Importar los componentes de modal necesarios para añadir, actualizar y eliminar tiendas
import { TiendaCard } from ".";
import useTiendas from "../../hooks/useTiendas";
import { AddTiendaModal, UpdateTiendaModal } from "../Modals";

const TiendasCards = () => {
  const [id, setId] = useState(0); // Almacenar el ID de la tienda actual para actualizar o eliminar
  const { tiendas, getTiendas } = useTiendas();
  const [values, setValues] = useState([]); // Almacenar los valores de la tienda seleccionada para editar

  const [modals, setModals] = useState({
    updT: false,
    addT: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  return (
    <>
      <Flex wrap gap={"middle"} justify="space-evenly" gutter={20}>
        {tiendas.map((tienda, index) => (
          <TiendaCard
            key={index}
            tienda={tienda}
            setId={setId}
            setValues={setValues}
            changeModal={changeModal}
            onChange={getTiendas}
          />
        ))}
      </Flex>

      <FloatButton tooltip="Añadir" onClick={() => changeModal("addT", true)} />

      <AddTiendaModal
        openModal={modals.addT}
        closeModal={() => changeModal("addT", false)}
        onAdded={getTiendas}
      />

      <UpdateTiendaModal
        openModal={modals.updT}
        closeModal={() => changeModal("updT", false)}
        onUpdate={getTiendas}
        id={id}
        values={values}
      />
    </>
  );
};

export default TiendasCards; // Exportar el componente TiendasCards
