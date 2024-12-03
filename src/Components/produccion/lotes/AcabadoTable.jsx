import React, { useEffect, useState } from "react";
import { Table, FloatButton, Popconfirm, Button } from "antd";
import { useParams } from "react-router-dom";
import { getAcabadoByLote } from "@AP/Acabado";
import AddAcabadoModal from "./AddAcabadoModal";

const AcabadoTable = ({ status, reload, setReload }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    getAcabadoByLote(id, setData);
  }, [id, reload]);

  const hasOptions = data.some(record => record.estado === 1);

  const columns = [
    { key: 'acabado_id', dataIndex: 'acabado_id', title: 'Acabado' },
    { key: 'lote_id', dataIndex: 'lote_id', title: 'Lote' },
    { key: 'lavanderia_id', dataIndex: 'lavanderia_id', title: 'Lavanderia' },
    { key: 'color_id', dataIndex: 'color_id', title: 'Color' },
    { key: 'cantidad_enviada', dataIndex: 'cantidad_enviada', title: 'Cantidad Enviada' },
    // ...(hasOptions
    //   ? [
    //       {
    //         title: "Opciones",
    //         key: "opciones",
    //         align: "center",
    //         render: (text, record) => {
    //           if (record.estado === 1) {
    //             return (
    //               <Popconfirm
    //                 title="ELIMINAR"
    //                 description="DESEA ELIMINAR ESTE CORTE"
    //                 okText="Confirmar"
    //                 cancelText="NO"
    //                 onConfirm={() => {
    //                   setReload(!reload);
    //                 }}
    //               >
    //                 <Button block style={{ background: "#f54242", color: "white" }} danger>
    //                   Eliminar
    //                 </Button>
    //               </Popconfirm>
    //             );
    //           }
    //           return null;
    //         },
    //       },
    //     ]
    //   : []),
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="acabado_id" />
    </>
  );
};

export default AcabadoTable;
