import React, { useEffect, useState } from "react";
import { Table, FloatButton } from "antd";
import { useParams } from "react-router-dom";
import { getCorte } from "../../../../Shared/api/Corte";
import AddCorteModal from "../Modals/AddCorteModal";

const CorteTable = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    getCorte(id, setData);
  }, [id, reload]);

  const columns = [
    { key: 'taller', dataIndex: 'taller', title: 'Taller' },
    { key: 'producto', dataIndex: 'nombre', title: 'Producto' },
    { key: 'cantidad', dataIndex: 'cantidad_enviada', title: 'Cantidad' },
    { key: 'talla', dataIndex: 'talla', title: 'Talla' },
    { key: 'tela', dataIndex: 'tipo_tela', title: 'Tela' },
    { key: 'metraje', dataIndex: 'metraje_asignado', title: 'Metraje' },
  ];

  return (
    <>
      <FloatButton
        style={{ insetInlineStart: 270 }}
        onClick={() => setOpenAddModal(true)}
        tooltip="Añadir Detalle"
      />

      <Table dataSource={data} columns={columns} rowKey="corte_id" />

      <AddCorteModal
        openModal={openAddModal}
        closeModal={() => setOpenAddModal(false)}
        reload={() => setReload(!reload)}
      />
    </>
  );
};

export default CorteTable;