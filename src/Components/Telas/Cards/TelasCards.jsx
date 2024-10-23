import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddTelaModal from "../Modals/AddTelaModal";
import AddTelasModal from "../Modals/AddTelasModal";
import DeleteProductoModal from "../Modals/DeleteProductoModal";
import UpdateProductoModal from "../Modals/UpdateProductoModal"
import { getTelas} from "../../../Shared/api/Tela";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Flex, List, FloatButton, Tooltip } from "antd";

const {Meta} = Card


const TelasCards = () => {

  const [id, setId] = useState(0)
  const [telas, setTelas] = useState([]);
  const [OpenAddTela,setOpenAddTela] = useState(false)
  const [OpenUpdateProducto,setOpenUpdateProducto] = useState(false)
  const [OpenDeleteProducto,setOpenDeleteProducto] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getTelas(setTelas);
  }, [reload]);

  return (
    <>
    <link rel="stylesheet" href="/css/tela/card.css" />
    <Flex wrap gap="middle" justify={'space-evenly'}>
    {telas.map((tela, index) => {
      return(

            <Card title={tela.tipo} className="cardTela">
              <p>Stock por tela</p>
              <div className="body">      
                <img src="/svg/tela/box.svg" alt="" className="box"/>
                <p className="number">{tela.STOCK}</p>
              </div>
               </Card>
      )
        })}
    </Flex>

      <FloatButton tooltip="Añadir Tela" onClick={()=>setOpenAddTela(true)}/>

      <AddTelasModal
        openModal = {OpenAddTela}
        closeModal={() => setOpenAddTela(false)}
        reload = {()=>setReload(!reload)}
      />
      <UpdateProductoModal
        openModal = {OpenUpdateProducto}
        closeModal={() => setOpenUpdateProducto(false)}
        id = {id}
        reload = {()=>setReload(!reload)}
      />
      <DeleteProductoModal
        openModal = {OpenDeleteProducto}
        closeModal={() => setOpenDeleteProducto(false)}
        reload = {()=>setReload(!reload)}
      />
    </>
  );
};

export default TelasCards;
