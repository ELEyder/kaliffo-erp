import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddTiendaModal from "../Modals/AddTiendaModal";
import { getTiendas } from "../../API/Tienda";
import DeleteTiendaModal from "../Modals/DeleteTiendaModal";
import UpdateTiendaModal from "../Modals/UpdateTiendaModal"
import { Card, Flex, FloatButton, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const {Meta} = Card


const Tiendas_cards = () => {
  const [id, setId] = useState(0);

  const [tiendas, setTiendas] = useState([]);
  const [reload, setReload] = useState(true)

  const [OpenAddTienda, setOpenAddTienda] = useState(false);
  const [OpenUpdateTienda, setOpenUpdateTienda] = useState(false);
  const [OpenDeleteTienda, setOpenDeleteTienda] = useState(false);

  const [values, setValues] = useState([]);

  useEffect(() => {
    getTiendas(setTiendas);
  }, [reload]);

  return (
    <>
    <Flex wrap gap={"middle"} justify="space-evenly" gutter={16}>
      {tiendas.map((tienda, index) => (
        <Link to={`/tiendas/${tienda.tienda_id}`} style={{ textDecoration: 'none' }}>
          <Card hoverable key={index} title={ tienda.tienda } style={{ width: 300, overflow: "hidden"}}
          actions={[
            <Tooltip title="Editar Tienda"
            className={"card-update"}
                onClick={(e) => {
                  e.stopPropagation();
                  setId(tienda.tienda_id);
                  setValues(tienda)
                  setOpenUpdateTienda(true);
                }}>
                <div>
                  <EditOutlined style={{ color: "white" }} />
                </div>
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
                <div>
                  <DeleteOutlined  key="delete" style={{color: "white"}} />
                </div>
              </Tooltip>
            </Popconfirm>
            ,
          ]}
          >
            <Meta
            title={<p>TELEFONO: {tienda.telefono}</p>}
            description={
              <>
                <p>STOCK: {tienda.total_stock}</p>
                <p>DIRECCION: {tienda.direccion}</p>
              </>
            }/>
          </Card>
          </Link>

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
        values = {values}
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
