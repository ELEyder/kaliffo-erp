import { Flex, Button, Popconfirm, FloatButton } from "antd";
import { useTrabajadores, useTrabajador } from "../../hooks";
import { Tabla } from "../../../../Components/UI";
import { useState } from "react";
import UpdateTrabajadorModal from "../Modals/UpdateTrabajadorModal";
import AddTrabajadorModal from "../Modals/AddTrabajadorModal";
import AddIncidenciaModal from "../Modals/AddIncidenciaModal";
import usePagos from "../../hooks/usePagos";

const PagosTable = ({ id }) => {
  const { pagos, getPagos } = usePagos(id);
  const [dataPagos, setDataPagos] = useState({});

  const [modals, setModals] = useState({
    updT: false,
    addT: false,
    addI: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  let columnas = [
    {
      title: "Monto Pagado",
      dataIndex: "montoPagado",
      render: (text) => ("S/" + text) // Formatear el monto con el símbolo de moneda "S/"
    },
    {
      title: "Monto Faltante",
      dataIndex: "montoFaltante",
      render: (text) => ("S/" + text) // Formatear el monto faltante con el símbolo de moneda "S/"
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      render: (fecha) => fecha ? new Date(fecha).toLocaleDateString("es-ES") : "-",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      render: (text) => {
        return text || "Desconocido";
      },
      // Estilo de la celda personalizado según el estado del pago
      onCell: (record) => ({
        style: {
          background: record.estado === "En Proceso" ? '#FCFB77' : 'green', // Amarillo para "En Proceso", Verde para "Completado"
          color: record.estado === "En Proceso" ? "black" : "white", // Color del texto según el estado
        }
      }),
    },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        rowKey={"pago_id"}
        dataSource={pagos}
      />
    </>
  );
};

export default PagosTable;
