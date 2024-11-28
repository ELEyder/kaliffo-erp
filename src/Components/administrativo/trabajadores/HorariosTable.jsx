import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Button, Popconfirm } from "antd";

import { getHorariosByTrabajador, deleteHorarioById } from "@AA/Horario";

const TablaHorario = () => {
  const { id } = useParams();
  const reloadRef = useRef(false);
  const [data, setData] = useState([]);

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
      title: "Opciones",dataIndex: "horario_id", key: "opciones", align: "center",
      render: (text) => {
        return (
          <Popconfirm
            title="ELIMINAR"
            description="DESEA ELIMINAR A"
            okText="Confirmar"
            cancelText="NO"
            onConfirm={() => {
              deleteHorarioById(text)
              reloadRef.current = !reloadRef.current
            }}>
            <Button block type="primary" danger>Eliminar</Button>
          </Popconfirm>
        );
      }
    },
  ]

  useEffect(() => {
    getHorariosByTrabajador(id, setData);
  }, [id, reloadRef.current]);

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