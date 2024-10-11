import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddTiendaModal from "../Modals/AddTiendaModal";
import { getTiendas } from "../../../Shared/api/Tienda";
import { Card, Col, Row, FloatButton } from "antd";

const {Meta} = Card


const Tiendas_cards = () => {
  const [tiendas, setTiendas] = useState([]);
  const [reload, setReload] =useState(true)
  const [OpenAddTienda, setOpenAddTienda] = useState(false);

  useEffect(() => {
    getTiendas(setTiendas);
  }, [reload]);

  return (
    <>
    <Row gutter={16}>
      {tiendas.map((tienda, index) => (
        <Col key={index} span={8}>
          <Card style={{textAlign:"center"}} title={
            <div style={{marginTop:"10px"}}>
              <h3 style={{fontSize:"20px",fontWeight:"bold"}}>{tienda.tienda}</h3>
            </div>
          }
          actions={[
            <>
              <Link to={`/tienda/${tienda.tienda_id}`}>VER MAS</Link>
            </>
          ]}>
            <Meta
            title={
              <>
                <p>TELEFONO: {tienda.telefono}</p>
              </>
            }
            description={
              <>
                <p>STOCK: {tienda.total_stock}</p>
                <p>DIRECCION: {tienda.direccion}</p>
              </>
            }/>
          </Card>
        </Col>
      ))}
    </Row>

    <FloatButton tooltip="Añadir" onClick={() => setOpenAddTienda(true)}/>

    <AddTiendaModal 
        openModal={OpenAddTienda}
        closeModal={() => setOpenAddTienda(false)} 
        reload={()=>setReload(!reload)}
      />
    </>
  );
};

export default Tiendas_cards;
