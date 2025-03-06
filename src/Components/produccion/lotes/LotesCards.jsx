import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Flex, FloatButton, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getLotes } from "@AP/Lote";  // Función para obtener los lotes
import AddLoteModal from "@CP/lotes/AddLoteModal";  // Modal para agregar lote
import styles from './LotesCards.module.css';  // Estilos CSS específicos para las tarjetas

const { Meta } = Card;

const LotesCards = () => {
  const [lotes, setLotes] = useState([]);  // Estado para almacenar los lotes
  const [openModal, setOpenModal] = useState(false);  // Controlar el estado del modal
  const colors = ["white", "#9481fe", "#49adfe", "#ff7655", "#7bfe56"];  // Colores de estado
  const [reload, setReload] = useState(false);  // Controlar la recarga de datos
  const allFases = [
    {
      title: "Corte",
      url: "corte"
    },
    {
      title: "Lavandería",
      url: "lavanderia"
    },
    {
      title: "Taller de Acabados Finales",
      url: "acabados"
    },
    {
      title: "Almacén",
      url: "almacen"
    }
  ]
  // Obtener los lotes al cargar el componente o cuando cambia el estado de reload
  useEffect(() => {
    getLotes(setLotes);
  }, [reload]);

  return (
    <>
      {/* Tarjetas de los lotes */}
      <Flex wrap gap="middle" justify="center">
        {lotes.map((lote) => {
          // Colores de estado según el lote
          const statusColors = Array(lote.estado + 1).fill(colors[lote.estado]);
          statusColors.push(...Array(4 - lote.estado).fill("white"));
          return (
            <Link key={lote.lote_id} to={`/lotes/${lote.lote_id}/${allFases[lote.estado - 1].url}`} style={{ textDecoration: 'none' }}>
              <Card
                style={{ width: "300px", textAlign: "center" }}
                title={`LOTE ${lote.lote_id}`}
              >
                {/* Meta información sobre el lote */}
                <Meta title={`Fecha de Creación: ${lote.fecha_creacion}`} />
                <br />
                <Meta title={`Cantidad Total: ${lote.cantidad_total}`} />

                {/* Íconos de estado del lote */}
                <div className={styles.cardLoteIcons}>
                  {allFases.map((f, index) => (
                    <Tooltip key={index} title={f.title}>
                      <div className={styles.cardLoteIcon} style={{ backgroundColor: statusColors[index + 1] }}>
                        <img className={styles.cardSvgLote} src={`/svg/lote/${index + 1}.svg`} alt={f.title} />
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </Card>
            </Link>
          );
        })}
      </Flex>

      {/* Botón flotante para abrir el modal de agregar lote */}
      <FloatButton tooltip="Añadir Lote" icon={<PlusOutlined />} onClick={() => setOpenModal(true)} />

      {/* Modal para agregar lote */}
      <AddLoteModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}  // Cerrar modal
        reload={() => setReload(!reload)}  // Recargar los lotes al agregar uno
      />
    </>
  );
};

export default LotesCards;
