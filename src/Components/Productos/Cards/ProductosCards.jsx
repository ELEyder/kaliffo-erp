import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddProductoModal from "../Modals/AddProductoModal";
import { getProductos } from "../../../Shared/api/Producto";
import { Card, Col, Row, FloatButton, Button, Popconfirm } from "antd";

const {Meta} = Card


const ProductosCards = () => {

  const [productos, setTiendas] = useState([]);
  const [OpenAddProductoModal,setOpenAddProductoModal] = useState(false)
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
                  <Row gutter={[8, 8]} justify="center" align="middle" className="opciones-botones">
            <Col>
              <Button
              type="primary"
              onClick={(e) =>{
                e.stopPropagation()
                setId(record.usuario_id)
                setOpenUpdateUsuario(true)
              }}
              block>
                Editar
              </Button>
            </Col>
            <Col>
            <Button
              to={`/producto/${producto.producto_id}`}
              block>
                Ver Más
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                onConfirm={(e) =>{
                  e.stopPropagation();
                  deleteUsuario(record.usuario_id)
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
    </>
  );
};

export default ProductosCards;
