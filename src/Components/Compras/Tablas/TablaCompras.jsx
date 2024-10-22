import React, { useEffect, useState } from "react";
import { Button, Row, Col, Popconfirm, Table } from "antd";
import { getCompras } from "../../../Shared/api/Compras";

const TablaCompras = ({ reload }) => {
  const [tabla_datos, SetTabla_datos] = useState([]);

  const columnas = [
    {
      title: "Tienda",
      key: "tienda",
      dataIndex: "tienda",
      align: "center",
    },
    {
      title: "Empresa Provedora",
      key: "empresa_proveedor",
      dataIndex: "empresa_proveedor",
      align: "center",
    },
    {
      title: "Fecha Compra",
      dataIndex: "fecha_compra",
      key: "fecha_compra",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => a.dni.localeCompare(b.dni),
        multiple: 1,
      },
      align: "center",
      responsive: ["sm"],
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => a.telefono.localeCompare(b.telefono),
        multiple: 2,
      },
      align: "center",
    },
    {
      title: "Total Neto",
      dataIndex: "total",
      key: "total",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) =>
          a.total_incidencias.localeCompare(b.total_incidencias),
        multiple: 2,
      },
      align: "center",
    },
    {
      title: "Opciones",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (record) => {
        return (
          <Row
            gutter={[8, 8]}
            justify="center"
            align="middle"
            className="opciones-botones"
          >
            <Col>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setId(record.usuario_id);
                  setOpenUpdateUsuario(true);
                }}
                block
              >
                Editar
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                onConfirm={(e) => {
                  e.stopPropagation();
                  deleteUsuarioById(record.usuario_id);
                }}
                cancelText="NO"
              >
                <Button
                  block
                  style={{ background: "#f54242", color: "white" }}
                  danger
                  onClick={(e) => {
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

  useEffect(() => {
    getCompras(SetTabla_datos)
  }, [reload]);

  return (
    <>
      <Table
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={tabla_datos.map((item, index) => ({ ...item, key: index }))}
        rowKey={(record) => record.compra_id}
        bordered
        className="tabla_trabajadores"
      />
    </>
  );
};

export default TablaCompras;
