import { Table, Button, Popconfirm, Row, Col, notification } from "antd";
import { useParams } from 'react-router-dom'
import React from "react";
import { useState, useEffect } from 'react'
import { getHorarioById, deleteHorarioById} from "../../Shared/api/Horario";

const TablaHorario = () =>{
  const { id } = useParams();

    const columns=[
        {
          title: "Fecha",
          dataIndex: "fecha",
          key: "fecha",
          align:"center",
          sorter: {
            compare: (a, b) => a.fecha.localeCompare(b.fecha),
            multiple: 2,
          },
        },
        {
          title: "Hora de Ingreso",
          dataIndex: "hora_entrada",
          key: "hora_entrada",
          align:"center",
        },
        {
          title: "Hora de Salida",
          dataIndex: "hora_salida",
          key: "hora_salida",
          align:"center",
        },
        {
          title: "Horas Trabajadas",
          dataIndex: "horas_trabajadas",
          key: "horas_trabajadas",
          align:"center",
          onCell: (record) => {
            let backgroundColor = record.min_trabajadas >= 540 ? 'green' : '#FCFB77';
            backgroundColor = record.min_trabajadas <= 300 ? '#f54242' : backgroundColor;
            let color = backgroundColor === '#FCFB77' ? 'black' : 'white';
              return {
                  style: {
                      background: backgroundColor,
                      padding: "10px",
                      color: color
                  }
              };
          },
          },
         {
            title: "Opciones",
            key: "opciones",
            align:"center",
            render:(text,record) =>{
              return (
                  <Row gutter={[8, 8]} justify="center" align="middle">
                      <Col>
                          <Popconfirm
                              title="ELIMINAR"
                              description="DESEA ELIMINAR A"
                              okText="Confirmar"
                              cancelText="NO"
                              onConfirm={(e) => {
                                deleteHorarioById(record.horario_id, reload, setReload, api)
                              }}
                          >
                              <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
                          </Popconfirm>
                      </Col>
                  </Row>
              );
          }
        },
    ]
    const [tabla, setTabla] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
      getHorarioById(id , setTabla);
      }, [id, reload]);

    return(
       <>
         <Table
        columns={columns}
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))}
        pagination={{ pageSize: 5 }}
        >

        </Table>
       </>
    )
}

export default TablaHorario