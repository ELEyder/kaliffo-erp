import React, { useEffect, useState } from "react";
import { Button, Row, Col, Popconfirm, Table,FloatButton } from "antd";
import { eliminarcompra, getCompras } from'@AL/Compras';
import AddCompraModal from "@CL/compras/AddCompraModal";
import DetallesComprasModal from "@CL/compras/DetallesComprasModal";

const TablaCompras = () => {
  const [tabla_datos, SetTabla_datos] = useState([]);
  const [idCompra,setIdCompra]= useState(null)
  const [openDetalleCompras, setopenDetalleCompras] = useState(false);
  const [openAddCompra, setopenAddCompra] = useState(false);
  const [reload, setReload] = useState(false);

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
      align: "center",
      responsive: ["sm"],
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      align: "center",
    },
    {
      title: "Total Neto",
      dataIndex: "total",
      key: "total",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => a.total.localeCompare(b.total),
        multiple: 2,
      },
      align: "center",
    },
    {
      title:"Detalle",
      dataIndex:"",
      key:"f",
      align:"center",
      render:(record)=>{
        return(
          <Button type="primary"
          onClick={(e)=>{
            e.stopPropagation()
            setIdCompra(record.compra_id)
            setopenDetalleCompras(true)
          }}>+</Button>
        )
      }
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
                  eliminarcompra(record.compra_id)
                  setReload(!reload)
                }}
                cancelText="NO"
              >
                <Button
                  block
                  style={{ background: "#f54242", color: "white" }}
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    setReload(!reload)
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
    getCompras(SetTabla_datos);
  }, [reload]);

  return (
    <>
      <FloatButton
        tooltip="Añadir Nuevo"
        onClick={() => setopenAddCompra(true)}
      />

      <Table
        columns={columnas}
        pagination={{ pageSize: 5 }}
        dataSource={tabla_datos.map((item, index) => ({
          ...item,
          key: item.compra_id,
        }))}
        rowKey={(record) => record.compra_id}
        bordered
        className="tabla_trabajadores"
      />

      <AddCompraModal
        openModal={openAddCompra}
        closeModal={setopenAddCompra}
        reload={reload}
        setReload={setReload}
      />

      <DetallesComprasModal 
        openModal={openDetalleCompras}
        closeModal={setopenDetalleCompras}
        reload={()=>setReload(!reload)}
        idC={idCompra}
      />

    </>
  );
};

export default TablaCompras;
