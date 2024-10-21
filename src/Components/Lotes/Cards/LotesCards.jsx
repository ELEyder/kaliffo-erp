import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddProductoModal from "../Modals/AddProductoModal";
import { getProductos } from "../../../Shared/api/Producto";
import { Card, Flex, Row, FloatButton, Timeline, Tooltip } from "antd";

const {Meta} = Card


const LotesCards = () => {

  const [id, setId] = useState(0)
  const [productos, setTiendas] = useState([]);
  const [OpenAddProductoModal,setOpenAddProductoModal] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getProductos(setTiendas);
  }, [reload]);

  return (
    <>
        <Flex wrap gap="middle" justify={'space-evenly'}>

        {productos.map((producto, index) => {
          return (
              <Card
              style={{
                width: "300px"
              }}
                title={'Lote 1'}
              >
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Fecha Inicio: S/${producto.precioBase}`}
                />
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Stock general: ${producto.stockTotal}`}
                />
                  <div className="loteIcons">
                    <Tooltip title="Corte">
                    <div className="loteIcon">
                      <img className="svgLote" src="/img/lote/1.svg" alt="" />
                    </div>
                    </Tooltip>
                    <Tooltip title="Lavandería">
                    <div className="loteIcon">
                      <img className="svgLote" src="/img/lote/2.svg" alt="" />
                    </div>
                    </Tooltip>
                    <Tooltip title="Taller">
                    <div className="loteIcon">
                      <img className="svgLote" src="/img/lote/3.svg" alt="" />
                    </div>
                    </Tooltip>
                    <Tooltip title="Almacen">
                    <div className="loteIcon">
                      <img className="svgLote" src="/img/lote/4.svg" alt="" />
                    </div>
                    </Tooltip>
                  </div>
              </Card>
          );
        })}
            </Flex>

      <FloatButton tooltip="Añadir Producto" onClick={()=>setOpenAddProductoModal(true)}/>

      <AddProductoModal
        openModal = {OpenAddProductoModal}
        closeModal={() => setOpenAddProductoModal(false)}
        reload = {()=>setReload(!reload)}
      />
    </>
  );
};

export default LotesCards;
