import React, { useEffect, useState } from "react";
import { Table, FloatButton, Popconfirm, Button } from "antd";
import { useParams } from "react-router-dom";
import { getCorte, deleteCorte } from "@AP/Corte";  // Funciones para obtener y eliminar cortes
import AddCorteModal from "@CP/lotes/AddCorteModal";  // Modal para agregar corte

const CortesTable = ({ status, reload }) => {
  const { id } = useParams();  // Obtener el ID desde los parámetros de la URL
  const [data, setData] = useState([]);  // Estado para almacenar los cortes
  const [openAddModal, setOpenAddModal] = useState(false);  // Control del estado del modal

  // Obtener los cortes al cargar el componente o cuando cambia el ID o el reload
  useEffect(() => {
    getCorte(id, setData);
  }, [id, status, reload]);

  // Verificar si hay algún corte con estado 1
  const hasOptions = data.some((record) => record.estado === 1);

  // Definir columnas de la tabla dinámicamente según los datos
  const columns = [
    { key: "taller", dataIndex: "taller", title: "Taller", align: "center" },
    { key: "producto", dataIndex: "producto", title: "Producto", align: "center" },
    { key: "cantidad", dataIndex: "cantidad_enviada", title: "Cantidad", align: "center" },
    { key: "talla", dataIndex: "talla", title: "Talla", align: "center" },

    // Si hay cortes con estado 1, agregar columna de opciones para eliminar
    ...(hasOptions
      ? [
        {
          title: "Opciones",
          key: "opciones",
          align: "center",
          render: (text, record) => {
            // Mostrar botón de eliminar si el corte tiene estado 1
            if (record.estado === 1) {
              return (
                <Popconfirm
                  title="Eliminar"
                  description="¿Desea eliminar este corte?"
                  okText="Confirmar"
                  cancelText="No"
                  onConfirm={() => {
                    deleteCorte(record.corte_id, record.estado);  // Eliminar corte
                    reload();  // Cambiar el estado de reload
                  }}
                >
                  <Button block style={{ background: "#f54242", color: "white" }} danger>
                    Eliminar
                  </Button>
                </Popconfirm>
              );
            }
            return null;
          },
        },
      ]
      : []),
  ];

  return (
    <>
      {/* Tabla que muestra los cortes */}
      <Table dataSource={data} columns={columns} rowKey="corte_id" />

      {/* Mostrar botón flotante para añadir corte si el estado es 0 o 1 */}
      {(status === 0 || status === 1) && (
        <FloatButton
          style={{ insetInlineStart: 270 }}
          onClick={() => setOpenAddModal(true)}  // Abrir modal de agregar corte
          tooltip="Añadir Corte"
        />
      )}

      {/* Modal para añadir corte */}
      <AddCorteModal
        openModal={openAddModal}
        closeModal={() => setOpenAddModal(false)}  // Cerrar modal
        reload={reload}  // Recargar datos al añadir un corte
      />
    </>
  );
};

export default CortesTable;
