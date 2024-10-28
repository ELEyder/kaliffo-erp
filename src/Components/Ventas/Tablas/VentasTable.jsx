import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetalleVentaModal from "../Modals/DetalleVentaModal";
import AddVentaModal from "../Modals/AddVentaModal"
import { getVentas, deleteVenta } from "../../../Shared/api/Ventas";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";

const VentasTable = () => {
  const { tipo } = useParams();
  const [id, setId] = useState(1);
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
      dataIndex: "tipoVenta",
      key: "tipoVenta",
      align: "center",
      sorter: {
        compare: (a, b) => a.tipoVenta.localeCompare(b.tipoVenta),
        multiple: 2,
      },
    },
    {
      title: "Fecha de Venta",
      dataIndex: "fecha",
      key: "fecha",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      align: "center",
      sorter: {
        compare: (a, b) => a.cantidad.localeCompare(b.cantidad),
        multiple: 2,
      },
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
      sorter: {
        compare: (a, b) => a.totalNeto.localeCompare(b.totalNeto),
        multiple: 2,
      },
    },
    {
      title: "IGV",
      dataIndex: "totalIgv",
      key: "totalIgv",
      align: "center",
    },
    {
      title: "Tipo de Pago",
      dataIndex: "tipoPago",
      key: "tipoPago",
      align: "center",
      onCell: (record) => ({
        style: {
          background: record.tipoPago === "Efectivo" 
            ? '#248304' 
            : record.tipoPago === "Yape" 
            ? '#8522a3' 
            : '#6fceea',
          color: record.tipoPago === "Transferencia" ? "black" : "white",
        }
      }),
      sorter: {
        compare: (a, b) => a.tipoPago.localeCompare(b.tipoPago),
        multiple: 2,
      },
    },
    {
      title: "RUC",
      dataIndex: "ruc",
      key: "ruc",
      align: "center",
    },
    {
      title: "Tienda",
      dataIndex: "tienda",
      key: "tienda",
      align: "center",
    },

  ];

  return (
    <>
      <Table
        columns={columnas}
        pagination={{ pageSize: 7 }}
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