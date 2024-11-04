import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddTiendaModal from "../Modals/AddTiendaModal";
import { getTiendas } from "../../../Shared/api/Tienda";
import DeleteTiendaModal from "../Modals/DeleteTiendaModal";
import UpdateTiendaModal from "../Modals/UpdateTiendaModal"
import { Card, Flex, Row, FloatButton, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const {Meta} = Card


const Tiendas_cards = () => {
  const [tiendas, setTiendas] = useState([]);
  const [reload, setReload] =useState(true)
  const [OpenAddTienda, setOpenAddTienda] = useState(false);
  const [OpenUpdateTienda, setOpenUpdateTienda] = useState(false);
  const [OpenDeleteTienda, setOpenDeleteTienda] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    getTiendas(setTiendas);
  }, [reload]);

  return (
    <>
    <Flex gap={"small"} justify="space-evenly" gutter={16}>
      {tiendas.map((tienda, index) => (
          <Card style={{textAlign:"center", width: "300px"}} title={
            <div style={{marginTop:"10px"}}>
              <h3 style={{fontSize:"20px",fontWeight:"bold"}}>{tienda.tienda}</h3>
            </div>
          }
          actions={[
            <Tooltip title="Editar Tienda"
            className={"card-update"}
                onClick={(e) => {
                  e.stopPropagation();
                  setId(tienda.tienda_id);
                  setOpenUpdateTienda(true);
                }}>
                <EditOutlined style={{ color: "black" }} />
            </Tooltip>,
            <Tooltip title="Ver Detalles" className={"card-view"}>
            <Link to={`/tiendas/${tienda.tienda_id}`}>
            <EyeOutlined style={{color: "white"}} key="view" />
            </Link>
            </Tooltip>,

            <Popconfirm
            title="ELIMINAR"
            description="DESEA ELIMINAR ESTA TIENDA"
            okText="Confirmar"
            placement="bottom"
            onConfirm={(e) =>{
              e.stopPropagation();
              setId(tienda.tienda_id)
              setOpenDeleteTienda(true)
            }} 
            cancelText="NO"
            >
              <Tooltip title="Eliminar Tienda" className={"card-delete"}>
              <DeleteOutlined  key="delete" style={{color: "white"}} />
              </Tooltip>
            </Popconfirm>
            ,
          ]}
          >
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
      ))}
    </Flex>

    <FloatButton tooltip="Añadir" onClick={() => setOpenAddTienda(true)}/>

    <AddTiendaModal 
        openModal={OpenAddTienda}
        closeModal={() => setOpenAddTienda(false)} 
        reload={()=>setReload(!reload)}
      />
      <UpdateTiendaModal
        openModal = {OpenUpdateTienda}
        closeModal={() => setOpenUpdateTienda(false)} 
        id = {id}
        reload = {()=>setReload(!reload)}
      />
      <DeleteTiendaModal
        openModal = {OpenDeleteTienda}
        closeModal={() => setOpenDeleteTienda(false)} 
        id = {id}
        reload = {()=>setReload(!reload)}
      />
    </>
  );
};

export default Tiendas_cards;
