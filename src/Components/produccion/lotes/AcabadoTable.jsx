import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useParams } from "react-router-dom";
import { getAcabadoByLote } from "@AP/Acabado";

const AcabadoTable = ({ reload }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getAcabadoByLote(id, setData);
  }, [id, reload]);

  const columns = [
    { key: 'acabado_id', dataIndex: 'acabado_id', title: 'Acabado' },
    { key: 'codigo', dataIndex: 'codigo', title: 'Código' },
    { key: 'talla', dataIndex: 'talla', title: 'Talla' },
    { key: 'cantidad_enviada', dataIndex: 'cantidad_enviada', title: 'Cantidad Enviada' }
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="acabado_id" />
    </>
  );
};

export default AcabadoTable;
