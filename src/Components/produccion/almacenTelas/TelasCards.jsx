import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AddTelasModal from "./AddTelasModal";
import { getTelas} from "@AP/Tela";
import { Card, Flex, FloatButton } from "antd";

const TelasCards = () => {
  const navigate = useNavigate(); 
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
    <Flex wrap gap="middle">
    {telas.map((tela, index) => {
      return(

            <Card key={index} title={tela.tipo} className="cardTela" onClick={() => navigate(`/telas/${tela.tipo}`)}>
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
    </>
  );
};

export default TelasCards;
