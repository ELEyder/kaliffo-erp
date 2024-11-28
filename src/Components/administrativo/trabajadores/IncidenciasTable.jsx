import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Table, Button, Popconfirm, FloatButton } from "antd";
import { FileAddOutlined } from '@ant-design/icons';

import { getIncidenciasByTrabajador, deleteIncidenciaById } from "@AA/Incidencia";
import UpdateIncidenciaModal from "@CA/trabajadores/UpdateIncidenciaModal";
import AddIncidenciaModal from "@CA/trabajadores/AddIncidenciaModal";

const TablaIncidencias = () => {
  const { id } = useParams();
  const [tabla, setTabla] = useState([]);
  const [reload, setReload] = useState(false);
  const [incidencia, setIncidencia] = useState({});
  const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [ModalAddIncidenciaOpen, setModalAddIncidenciaOpen] = useState(false);

  useEffect(() => {
    getIncidenciasByTrabajador(id, setTabla);
  }, [id, reload]);

  const columns = [
    { title: "N°", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Incidencia", dataIndex: "incidencia", key: "incidencia", align: "center",
      onCell: (record) => ({
        style: {
          background: record.incidencia === "Familiar" ? '#FCFB77' : record.incidencia === "Personal" ? 'orange' : '#f54242',
          color: record.incidencia === "Salud" ? "white" : "black",
          padding: "10px"
        }
      }),
      sorter: {
        compare: (a, b) => a.incidencia.localeCompare(b.incidencia),
        multiple: 1,
      }
    },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion", align: "center" },
    { title: "Fecha", dataIndex: "fecha_creacion", key: "fecha_creacion", align: "center" },
    {
      title: "Opciones", key: "opciones", align: "center",
      render: (text, record) => {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="primary"
              block
              onClick={() => {
                setIncidencia(record);
                setModalEditarAbierto(true);
              }}
            >
              Editar
            </Button>
            <Popconfirm
              title="¿Estás seguro de que deseas eliminar esta incidencia?"
              okText="Confirmar"
              cancelText="Cancelar"
              onConfirm={() => {
                deleteIncidenciaById(record.incidencia_id);
                setReload(!reload);
              }}
            >
              <Button block style={{ background: "#f54242", color: "white" }} danger>
                Eliminar
              </Button>
            </Popconfirm>
          </div>
        );
      }
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={tabla?.map((item, index) => ({ ...item, key: item.incidencia_id }))}
        pagination={{ pageSize: 5 }}
      />
      <FloatButton tooltip="Añadir Nueva Incidencia" onClick={() => setModalAddIncidenciaOpen(true)} type="primary" icon={<FileAddOutlined />} />

      <UpdateIncidenciaModal
        openModal={ModalEditarAbierto}
        closeModal={() => setModalEditarAbierto(false)}
        reload={reload}
        values={incidencia}
      />
      <AddIncidenciaModal
        openModal={ModalAddIncidenciaOpen}
        closeModal={() => setModalAddIncidenciaOpen(false)}
        reload={reload}
        id={id}
      />
    </>
  );
};

export default TablaIncidencias;
