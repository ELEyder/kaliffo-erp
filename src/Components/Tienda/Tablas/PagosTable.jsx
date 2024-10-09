import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { deletePagoById, getPagosById } from "../../../Shared/api/Pago";
import DetallesProductoModal from "../Modals/DetallesProductoModal"
import AddProductoModal from "../Modals/AddProductoModal";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons";


const PagosTable
 = () => {

  const { id } = useParams();

  const[productostienda,setproductostienda] = useState([])
  const[reload,setReload] = useState(false)
  const[OpenAddProductoModal,setOpenAddProductoModal] = useState(false)
  const[OpenTiendaDetalleProducto,setOpenTiendaDetalleProducto] = useState(false)
  const[idp,setIdP] = useState(0)
  const[nombreProducto,setNombreProducto] = useState(0)

  useEffect(() => {
    getPagosById(id,setproductostienda)
  }, [id, reload]);

  const columns = [
    {
      title: "Monto Pagado",
      key: "montoPagado",
      dataIndex:"montoPagado",
      align: "center",
    },
    {
      title: "Monto Faltante",
      key: "montoFaltante",
      dataIndex:"montoFaltante",
      align: "center",
    },
    {
      title: "Fecha",
      key: "fecha",
      dataIndex:"fecha",
      align: "center",
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex:"estado",
      align: "center",
    },
    {
      title: "Opciones",
      dataIndex:"pago_id",
      key:"opciones",
      align:"center",
      render:(text) =>{
          return (
            <Row gutter={[8, 8]} justify="center" align="middle">
              <Col>
                <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  okText="Confirmar"
                  cancelText="NO"
                  onConfirm= {() => {
                    deletePagoById(id)
                    setReload(!reload)
                  }}
                >
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
      <Table columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
      dataSource={[...productostienda]}
      rowKey={(record) => record.producto_id}
      />

      <FloatButton tooltip="Añadir Nuevo Producto" onClick={() => setOpenAddProductoModal(true)} type="primary" icon={<FileAddOutlined />}/>

      <AddProductoModal
      openModal = {OpenAddProductoModal}
      closeModal={() => setOpenAddProductoModal(false)}
      id={id}
      reload={()=>setReload(!reload)}
      />

      <DetallesProductoModal
      openModal = {OpenTiendaDetalleProducto}
      closeModal={setOpenTiendaDetalleProducto}
      id={id}
      idp={idp}
      nombreProducto={nombreProducto}
      />
    </>
  );
};

export default PagosTable;
