import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddLoteModal from "../Modals/AddLoteModal";
import { getLotes } from "../../../Shared/api/Lote";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Flex, FloatButton, Tooltip } from "antd";

const { Meta } = Card;

const LotesCards = () => {
  const [lotes, setLotes] = useState([]);
  const [openAddProductoModal, setOpenAddProductoModal] = useState(false);
  const colors = ["white", "#9481fe", "#49adfe", "#ff7655", "#7bfe56"];
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getLotes(setLotes);
  }, [reload]);

  return (
    <>
      <Flex wrap gap="middle">
        {lotes.map((lote) => {
          const statusColors = Array(lote.estado + 1).fill(colors[lote.estado]);
          statusColors.push(...Array(4 - lote.estado).fill("white"));

          return (
            <Link key={lote.lote_id} to={`/lote/${lote.lote_id}`} style={{ textDecoration: 'none' }}>
              <Card
                style={{ width: "300px" }}
                title={`Lote ${lote.lote_id}`}
                onClick={() => console.log(lote)}
              >
                <Meta title={`Fecha de Creación: ${lote.fecha_creacion}`} />
                <Meta title={`Cantidad Total: ${lote.cantidad_total}`} />
                <div className="cardLoteIcons">
                  {["Corte", "Lavandería", "Taller", "Almacen"].map((title, index) => (
                    <Tooltip key={index} title={title}>
                      <div className="cardLoteIcon" style={{ backgroundColor: statusColors[index + 1] }}>
                        <img className="cardSvgLote" src={`/svg/lote/${index + 1}.svg`} alt={title} />
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </Card>
            </Link>
          );
        })}
      </Flex>
      <FloatButton tooltip="Añadir Lote" icon={<PlusOutlined />} onClick={() => setOpenAddProductoModal(true)} />
      <AddLoteModal
        openModal={openAddProductoModal}
        closeModal={() => setOpenAddProductoModal(false)}
        reload={() => setReload(!reload)}
      />
    </>
  );
};

export default LotesCards;
