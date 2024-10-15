import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetalleVentaModal from "../Modals/DetalleVentaModal";
import AddVentaModal from "../Modals/AddVentaModal"
import { getVentas, deleteVenta } from "../../../Shared/api/Ventas";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";

const VentasTable = () => {
  const { tipo } = useParams();
  const [id, setId] = useState(0);
  const [tablaDatos, setTablaDatos] = useState([]);
  const [OpenAddVentaModal, setOpenAddVentaModal] = useState(false);
  const [OpenDetalleVentaModal, setOpenDetalleVentaModal] = useState(false);
  const [reload, setReload] = useState(false);
  
  useEffect(() => {
    getVentas(tipo, setTablaDatos);
  }, [tipo, reload]);

  const columnas = [
    {
      title: "Nº",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      align: "center",
    },
    {
      title: "Tipo de Venta",
      dataIndex: "tipo",
      key: "tipo",
      align: "center",
    },
    {
      title: "Fecha de Venta",
      dataIndex: "fechaVenta",
      key: "fechaVenta",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      align: "center",
    },
    {
      title: "Total Bruto",
      dataIndex: "totalBruto",
      key: "totalBruto",
      align: "center",
    },
    {
      title: "Total Neto",
      dataIndex: "totalNeto",
      key: "totalNeto",
      align: "center",
    },
    {
      title: "IGV",
      dataIndex: "IGV",
      key: "IGV",
      align: "center",
    },
    {
      title: "Tipo de Pago",
      dataIndex: "tipoPago",
      key: "tipoPago",
      align: "center",
    },
    {
      title: "RUC",
      dataIndex: "RUC",
      key: "RUC",
      align: "center",
    },
    {
      title: "Tienda",
      dataIndex: "tiendaId",
      key: "tiendaId",
      align: "tiendaId",
    },

  ];

  return (
    <>
      <Table
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={tablaDatos.map((item, index) => ({ ...item, key: index }))}
        rowKey={(record) => record.id}
        bordered
        className="tabla_trabajadores"
        onRow={(record) => ({
          onClick: () => {
            setId(record.id)
            setOpenDetalleVentaModal(true)
          },
          style: {
            cursor: "pointer",
          }
        })}
      />
      <FloatButton tooltip="Añadir Nuevo" onClick={() => setOpenAddUsuario(true)} />

      <AddVentaModal
        openModal={OpenAddVentaModal}
        closeModal={()=>setOpenAddVentaModal(false)}
        tipoTrabajador={tipo}
        reload={reload}
        setReload={setReload}
      />
      <DetalleVentaModal
        openModal={OpenDetalleVentaModal}
        closeModal={() => setOpenDetalleVentaModal(false)}
        id={id}
      />
    </>
  );
};

export default VentasTable;