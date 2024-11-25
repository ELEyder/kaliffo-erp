import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Flex, FloatButton, Popconfirm, Tooltip, Image } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { getAlmacenProductos } from "@AL/AlmacenProductos";
import AddAlmacenProductosModals from "@CL/AlmacenProductos/AddAlmacenProductosModals";

const { Meta } = Card;

const AlmacenProductosCards = () => {
  const [id, setId] = useState(0);
  const [Almacenes, setAlmacenes] = useState([]);
  const [OpenAddAlmacenModal,setOpenAddAlmacenModal] = useState(false)
  const [OpenUpdateAlmacen,setOpenUpdateAlmacen] = useState(false)
  const [OpenDeleteAlmacen,setOpenDeleteAlmacen] = useState(false)
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getAlmacenProductos(setAlmacenes);
  }, [reload]);

  return (
    <>
      <Flex wrap gap={"middle"} justify="space-evenly" gutter={20}>
        {Almacenes.map((almacen, index) => {
          return (
            <Card
              key={index}
              style={{ width: "300px", overflow: "hidden" }}
              title={almacen.nombre_almacen}
              actions={[
                <Tooltip
                  title="Editar Almacen"
                  className={"card-update"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setId(almacen.almacen_id);
                    setOpenUpdateAlmacen(true);
                  }}
                >
                  <EditOutlined key="edit" color="white" />
                </Tooltip>,
                <Tooltip title="Ver Detalles" className={"card-view"}>
                  {/* <Link to={`/admin/productos/${producto.producto_id}`}>
                    <EyeOutlined style={{ color: "white" }} key="view" />
                  </Link> */}
                </Tooltip>,
                <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  okText="Confirmar"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    setId(producto.producto_id);
                    setOpenDeleteAlmacen(true);
                  }}
                  cancelText="NO"
                >
                  <Tooltip title="Eliminar Almacen" className={"card-delete"}>
                    <DeleteOutlined key="delete" style={{ color: "white" }} />
                  </Tooltip>
                </Popconfirm>,
              ]}
            >
              <Meta
                style={{ textAlign: "left" }}
                title={`Stock general: ${almacen.stock_total}`}
              />
            </Card>
          );
        })}
      </Flex>

        <FloatButton tooltip="Añadir Almacen" onClick={()=>setOpenAddAlmacenModal(true)}/>

        <AddAlmacenProductosModals 
            openModal={OpenAddAlmacenModal}
            closeModal={()=>setOpenAddAlmacenModal(false)}
            reload={()=>setReload(!reload)}
        />

    </>
  );
};

export default AlmacenProductosCards;