import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIncidenciaModal from "../Modals/AddIncidenciaModal"
import UpdateUsuarioModal from "../Modals/UpdateUsuarioModal";
import { getVentas, deleteVenta } from "../../../Shared/api/Ventas";
import { Button, Row, Col, Popconfirm, Table } from "antd";

const VentasTable = ({ reload }) => {
  const { tipo } = useParams();

  const [tablaDatos, setTablaDatos] = useState([]);
  const [openAddIncidencia, setOpenAddIncidencia] = useState(false);
  const [openUpdateUsuario, setOpenUpdateUsuario] = useState(false);
  const [id, setId] = useState(1);
  
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
    {
      title: "Opciones",
      dataIndex: "codigo",
      key: "opciones",
      align: "center",
      render: (text) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle" className="opciones-botones">
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                onConfirm={(e) =>{
                  e.stopPropagation();
                  deleteVenta(text)
                }} 
                cancelText="NO"
              >
                <Button block style={{ background: "#f54242", color: "white" }}
                danger
                onClick={(e) =>{
                  e.stopPropagation();
                }} 
                >
                  Eliminar
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
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
            window.location.href = `/trabajador/${record.usuario_id}`
          },
          style: {
            cursor: "pointer",
          }
        })}
      />
      <UpdateUsuarioModal
        openModal={openUpdateUsuario}
        closeModal={setOpenUpdateUsuario}
        tipoTrabajador={tipo}
        reload={reload}
        id={id}
      />
      <AddIncidenciaModal
        openModal={openAddIncidencia}
        closeModal={setOpenAddIncidencia}
        reload={reload}
        id={id}
      />
    </>
  );
};

export default VentasTable;