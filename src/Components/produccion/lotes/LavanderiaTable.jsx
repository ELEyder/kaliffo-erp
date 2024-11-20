import React, { useEffect, useState } from "react";
import { Table, FloatButton, Row, Col, Popconfirm, Button } from "antd";
import { useParams } from "react-router-dom";
import { getLavanderia } from "@AP/Lavanderia";
import AddLavanderiaModal from "@CP/lotes/AddLavanderiaModal";

const Lavanderia = ({ status, reload, setReload }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    getLavanderia(id, setData);
  }, [id, reload]);

  const columns = [
    { key: 'lavanderia_asignada', dataIndex: 'lavanderia_asignada', title: 'Lavanderia' },
    { key: 'producto', dataIndex: 'nombre', title: 'Producto' },
    { key: 'color', dataIndex: 'nombre', title: 'Color' },
    { key: 'talla', dataIndex: 'talla', title: 'Talla' },
    { key: 'cantidad', dataIndex: 'cantidad_enviada', title: 'Cantidad', sorter: (a, b) => a.cantidad_enviada - b.cantidad_enviada},
    { key: 'talla', dataIndex: 'talla', title: 'Talla' },
    { key: 'fecha_envio', dataIndex: 'fecha_envio', title: 'Fecha de Envio' },
  ];

  return (
    <>
      <FloatButton
        style={{ insetInlineStart: 270 }}
        onClick={() => setOpenAddModal(true)}
        tooltip="Añadir Corte"
      />

      <Table dataSource={data} columns={columns} rowKey="corte_id" />

      <AddLavanderiaModal
        openModal={openAddModal}
        closeModal={() => setOpenAddModal(false)}
        reload={() => setReload(!reload)}
      />
    </>
  );
};

export default Lavanderia;
