import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddProductoModal from "../Modals/AddProductoModal";
import { getLotes } from "../../../Shared/api/Lote";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Flex, FloatButton, Tooltip } from "antd";

const {Meta} = Card


const LotesCards = () => {

  const [id, setId] = useState(0)
  const [lotes, setLotes] = useState([]);
  const [OpenAddProductoModal,setOpenAddProductoModal] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getLotes(setLotes);
  }, [reload]);

  return (
    <>
        <Flex wrap gap="middle" justify={'space-evenly'}>

        {lotes.map((lote, index) => {
          var status = lote.estado
          var colors = ["white", "#9481fe", "#49adfe", "#ff7655", "#7bfe56"]
          var colors = Array(status + 1).fill(colors[status]);
          for (var i = 0; i < 4-status; i++) colors.push("white")
          console.log(colors)
          return (
            <Link to={`/lote/${lote.producto_id}`} style={{ textDecoration: 'none' }}>
              <Card
              style={{
                width: "300px"
              }}
                title={`Lote ${lote.lote_id}`}
              onClick={ () =>
                console.log(lote)
              }
              >
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Fecha de Creación: ${lote.fecha_creacion}`}
                />
                <Meta
                  style={{ textAlign: "left" }}
                  title={`Cantidad Total: ${lote.cantidad_total}`}
                />
                  <div className="cardLoteIcons">
                    <Tooltip title="Corte">
                    <div className={`cardLoteIcon`} style={{backgroundColor: colors[1]}}>
                      <img className="cardSvgLote" src="/svg/lote/1.svg" alt="" />
                    </div>
                    </Tooltip>
                    <Tooltip title="Lavandería">
                    <div className={`cardLoteIcon`} style={{backgroundColor: colors[2]}}>

                      <img className="cardSvgLote" src="/svg/lote/2.svg" alt="" />
                    </div>
                    </Tooltip>
                    <Tooltip title="Taller">
                    <div className={`cardLoteIcon`} style={{backgroundColor: colors[3]}}>

                      <img className="cardSvgLote" src="/svg/lote/3.svg" alt="" />
                    </div>
                    </Tooltip>
                    <Tooltip title="Almacen">
                    <div className={`cardLoteIcon`} style={{backgroundColor: colors[4]}}>

                      <img className="cardSvgLote" src="/svg/lote/4.svg" alt="" />
                    </div>
                    </Tooltip>
                  </div>
              </Card>
              </Link>
          );
        })}
            </Flex>

      <FloatButton tooltip="Añadir Lote" icon={<PlusOutlined />} onClick={()=>setOpenAddProductoModal(true)}/>

      <AddProductoModal
        openModal = {OpenAddProductoModal}
        closeModal={() => setOpenAddProductoModal(false)}
        reload = {()=>setReload(!reload)}
      />
    </>
  );
};

export default LotesCards;
