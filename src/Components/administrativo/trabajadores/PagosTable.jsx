import { Table, Button, Popconfirm, FloatButton } from "antd";
import { useParams } from 'react-router-dom'
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useState, useEffect } from 'react'
import { getPagosById, deletePagoById } from "../../API/Pago";
import AddPagoModal from "../Modals/AddPagoModal";

const TablaPagos = () => {
  const { id } = useParams();

  const [tabla, setTabla] = useState([]);
  const [reload, setReload] = useState(false);
  const [OpenAddPago, setOpenAddPago] = useState(false);

  useEffect(() => {
    getPagosById(id, setTabla);
  }, [id, reload]);

  const columns = [
    { title: "Monto Pagado", dataIndex: "montoPagado", key: "montoPagado", align: "center", render: (text) => ("S/" + text) },
    { title: "Monto Faltante", dataIndex: "montoFaltante", key: "montoFaltante", align: "center", render: (text) => ("S/" + text) },
    { title: "Fecha", dataIndex: "fecha", key: "fecha", align: "center" },
    {
      title: "Estado", dataIndex: "estado", key: "estado", align: "center",
      onCell: (record) => ({
        style: {
          background: record.estado === "En Proceso" ? '#FCFB77' : 'green',
          color: record.estado === "En Proceso" ? "black" : "white",
        }
      }),
      sorter: {
        compare: (a, b) => a.estado.localeCompare(b.estado),
        multiple: 1,
      }
    },
    {
      title: "Opciones", dataIndex: "pago_id", key: "opciones", align: "center",
      render: (text) => {
        return (
          <Popconfirm
            title="¿ELIMINAR?"
            description="¿Está seguro de eliminar el pago?"
            okText="Confirmar"
            cancelText="Cancelar"
            onConfirm={(e) => {
              deletePagoById(text)
              setReload(!reload)
            }}>
            <Button style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
          </Popconfirm>
        );
      }
    },
  ]

  return (
    <>
      <Table
        ali
        columns={columns}
        dataSource={tabla}
        pagination={{ pageSize: 5 }}
      />

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        tooltip={"Añadir Pago"}
        onClick={() => setOpenAddPago(true)}
      />
      <AddPagoModal
        openModal={OpenAddPago}
        closeModal={() => setOpenAddPago(false)}
        reload={() => setReload(!reload)}
        idUsuario={id}
      />
    </>
  )
}

export default TablaPagos