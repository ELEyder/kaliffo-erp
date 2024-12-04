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

  const estado = data.length>0?data.some((record) => record.estado === 1):true;

  const columns = [
    {
      key: "lavanderia_asignada",
      dataIndex: "lavanderia_asignada",
      title: "Lavanderia",
      align: "center",
    },
    {
      key: "producto",
      dataIndex: "producto_nombre",
      title: "Producto",
      align: "center",
    },
    { key: "color", dataIndex: "nombre", title: "Color", align: "center" },
    { key: "talla", dataIndex: "talla", title: "Talla", align: "center" },
    {
      key: "cantidad",
      dataIndex: "cantidad_enviada",
      align: "center",
      title: "Cantidad",
      sorter: (a, b) => a.cantidad_enviada - b.cantidad_enviada,
    },
    { key: "talla", dataIndex: "talla", title: "Talla", align: "center" },
    {
      key: "fecha_envio",
      dataIndex: "fecha_envio",
      title: "Fecha de Envio",
      align: "center",
    },
  ];
  console.log(estado)
  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="corte_id" />
      {estado ? (
        <>
          <FloatButton
            style={{ insetInlineStart: 270 }}
            onClick={() => setOpenAddModal(true)}
            tooltip="Añadir Corte"
          />
          <AddLavanderiaModal
            openModal={openAddModal}
            closeModal={() => setOpenAddModal(false)}
            reload={() => setReload(!reload)}
          />
        </>
      ) : null}
    </>
  );
};

export default Lavanderia;
