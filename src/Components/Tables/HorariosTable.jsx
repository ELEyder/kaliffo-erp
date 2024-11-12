import { Table, Button, Popconfirm } from "antd";
import { useParams } from 'react-router-dom'
import React from "react";
import { useState, useEffect } from 'react'
import { getHorarioById, deleteHorarioById } from "../../API/Horario";

const TablaHorario = () => {
  const { id } = useParams();

  const columns = [
    {
      title: "Fecha", dataIndex: "fecha", key: "fecha", align: "center",
      sorter: { compare: (a, b) => a.fecha.localeCompare(b.fecha), multiple: 2 }
    },
    { title: "Hora de Ingreso", dataIndex: "hora_entrada", key: "hora_entrada", align: "center" },
    { title: "Hora de Salida", dataIndex: "hora_salida", key: "hora_salida", align: "center" },
    {
      title: "Horas Trabajadas", dataIndex: "horas_trabajadas", key: "horas_trabajadas", align: "center",
      onCell: (record) => {
        return {
          style: {
            background: record.min_trabajadas >= 540 ? 'green' : record.min_trabajadas <= 300 ? f54242 : '#FCFB77',
            color: record.min_trabajadas <= 300 ? 'white' : 'black'
          }
        }
      }
    },
    {
      title: "Opciones", key: "opciones", align: "center",
      render: (text, record) => {
        return (
          <Popconfirm
            title="ELIMINAR"
            description="DESEA ELIMINAR A"
            okText="Confirmar"
            cancelText="NO"
            onConfirm={(e) => {
              deleteHorarioById(record.horario_id, reload, setReload, api)
            }}>
            <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
          </Popconfirm>
        );
      }
    },
  ]
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getHorarioById(id, setData);
  }, [id, reload]);

  return (
    <>
      <Table
        columns={ columns }
        dataSource={ data }
        pagination={{ pageSize: 5 }}/>
    </>
  )
}

export default TablaHorario