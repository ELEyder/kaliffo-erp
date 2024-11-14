import React, { useEffect, useState } from "react";
import { Table, FloatButton, Row, Col, Popconfirm, Button } from "antd";
import { useParams } from "react-router-dom";
import { getCorte, deleteCorte } from "@AP/Corte";
import AddCorteModal from "@CP/lotes/AddCorteModal";

const CortesTable = () => {
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
    { title: "Opciones", key: "opciones", align:"center",
      render:(text,record) =>{
        return (
            <Row gutter={[8, 8]} justify="center" align="middle">
                <Col>
                    <Popconfirm
                        title="ELIMINAR"
                        description="DESEA ELIMINAR ESTA INCIDENCIA"
                        okText="Confirmar"
                        cancelText="NO"
                        onConfirm={() => {
                          deleteCorte(record.corte_id)
                          setReload(!reload)
                        }}>
                        <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
                    </Popconfirm>
                </Col>
            </Row>
        );
    }
  },
  ];

  return (
    <>
      <FloatButton
        style={{ insetInlineStart: 270 }}
        onClick={() => setOpenAddModal(true)}
        tooltip="Añadir Corte"
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

export default CortesTable;