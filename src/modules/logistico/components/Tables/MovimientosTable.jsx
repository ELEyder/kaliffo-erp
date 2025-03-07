import { useEffect, useState } from "react";
import { Button } from "antd";
import { Tabla } from "../../../../components/UI";
import useMovimientos from "../../hooks/useMovimientos";
import MovimientoDetalleModal from "../Modals/MovimientoDetalleModal"; 

const MovimientosTable = ({ tipo }) => {
  const { movimientos, loading, getMovimientos } = useMovimientos();
  const [idM, setIdM] = useState(1);
  const [modals, setModals] = useState({
    movD: false,
  });

  useEffect(() => {
    getMovimientos(tipo);
  }, []);

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnas = [
    {
      title: "Codigo",
      dataIndex: "codigo",
    },
    {
      title: "Nombre del Almacen",
      dataIndex: "nombre_almacen",
    },
    {
      title: "Nombre de la Tienda",
      dataIndex: "tienda",
    },
    {
      title: "Transporte",
      dataIndex: "transporte",
    },
    {
      title: "Fecha Envio",
      dataIndex: "fecha_envio",
    },
    {
      title: "Fecha Inicio Envio",
      dataIndex: "fecha_inicio_envio",
    },
    {
      title: "Ver mas",
      dataIndex: "movimiento_id",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            block
            onClick={() => {
              setIdM(text);
              changeModal("movD", true);
            }}
          >
            +
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"movimiento_id"}
        dataSource={movimientos}
        loading={loading}
      />

      <MovimientoDetalleModal
        openModal={modals.movD}
        closeModal={() => changeModal("movD", false)}
        tipo={tipo}
        idM={idM}
      />
    </>
  );
};

export default MovimientosTable;
