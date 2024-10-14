import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddProductoModal from "../Modals/AddProductoModal";
import DeleteProductoModal from "../Modals/DeleteProductoModal";
import UpdateProductoModal from "../Modals/UpdateProductoModal"
import { getProductos } from "../../../Shared/api/Producto";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Col, Row, FloatButton, Popconfirm } from "antd";

const {Meta} = Card


const ProductosCards = () => {

  const [id, setId] = useState(0)
  const [productos, setTiendas] = useState([]);
  const [OpenAddProductoModal,setOpenAddProductoModal] = useState(false)
  const [OpenUpdateProducto,setOpenUpdateProducto] = useState(false)
  const [OpenDeleteProducto,setOpenDeleteProducto] = useState(false)
  const [reload, setReload] = useState(false)
  const imgError = (e) => {
    e.target.src = '/img/generic.png';
  };

  useEffect(() => {
    getProductos(setTiendas);
  }, [reload]);

  return (
    <>
      <Row gutter={16}>
        {productos.map((producto, index) => {
          return (
            <Col key={index} span={6} style={{ margin: "0 0 24px 0", textAlign: "center" }}>
              <Card
                title={producto.nombre}
                actions={[
                  <div className={"card-update"} onClick={(e) =>{
                    e.stopPropagation()
                    setId(producto.producto_id)
                    setOpenUpdateProducto(true)
                  }}>
                  <EditOutlined key="edit" color="white"/>
                  </div>,
                  <Link className={"card-view"} to={`/producto/${producto.producto_id}`}>
                    <EyeOutlined style={{color: "white"}} key="view" />
                  </Link>,

                  <Popconfirm
                  title="ELIMINAR"
                  description="DESEA ELIMINAR A"
                  okText="Confirmar"
                  onConfirm={(e) =>{
                    e.stopPropagation();
                    setId(producto.producto_id)
                    setOpenDeleteProducto(true)
                  }} 
                  cancelText="NO"
                  >
                    <div className={"card-delete"}>
                    <DeleteOutlined  key="delete" />
                    </div>
                  </Popconfirm>
                  ,
                ]}
                cover={
                  <img
                    src={`/img/${producto.producto_id}.png`}
                    alt={producto.nombre}
                    onError={imgError}
                    style={{ width: '100%', height: 'auto' }}
                  />
                }
              >
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Precio: S/${producto.precioBase}`}
                />
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Stock general: ${producto.stockTotal}`}
                />
              </Card>
            </Col>
          );
        })}
      </Row>

      <FloatButton tooltip="Añadir Producto" onClick={()=>setOpenAddProductoModal(true)}/>

      <AddProductoModal
        openModal = {OpenAddProductoModal}
        closeModal={setOpenAddProductoModal}
        reload = {()=>setReload(!reload)}
      />
      <UpdateProductoModal
        openModal = {OpenUpdateProducto}
        closeModal={setOpenUpdateProducto}
        id = {id}
        reload = {()=>setReload(!reload)}
      />
      <DeleteProductoModal
        openModal = {OpenDeleteProducto}
        closeModal={setOpenDeleteProducto}
        id = {id}
        reload = {()=>setReload(!reload)}
      />
    </>
  );
};

export default ProductosCards;
