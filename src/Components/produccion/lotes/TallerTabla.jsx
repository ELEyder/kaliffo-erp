import React, { useEffect, useState } from "react";
import { Table, FloatButton, Popconfirm, Button } from "antd";
import { useParams } from "react-router-dom";
import { getTallerByLote, deleteCorte } from "@AP/Taller";

const CortesTable = ({ status, reload, setReload }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getCorte(id, setData);
  }, [id, reload]);

  const hasOptions = data.some(record => record.estado === 1);

  const columns = [
    { key: 'taller', dataIndex: 'taller', title: 'Taller' },
    { key: 'producto', dataIndex: 'producto', title: 'Producto' },
    { key: 'cantidad', dataIndex: 'cantidad_enviada', title: 'Cantidad' },
    { key: 'talla', dataIndex: 'talla', title: 'Talla' },
    ...(hasOptions
      ? [
          {
            title: "Opciones",
            key: "opciones",
            align: "center",
            render: (text, record) => {
              if (record.estado === 1) {
                return (
                  <Popconfirm
                    title="ELIMINAR"
                    description="DESEA ELIMINAR ESTE CORTE"
                    okText="Confirmar"
                    cancelText="NO"
                    onConfirm={() => {
                      deleteCorte(record.corte_id, record.estado);
                      setReload(!reload);
                    }}
                  >
                    <Button block style={{ background: "#f54242", color: "white" }} danger>
                      Eliminar
                    </Button>
                  </Popconfirm>
                );
              }
              return null;
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="corte_id" />
    </>
  );
};

export default CortesTable;
