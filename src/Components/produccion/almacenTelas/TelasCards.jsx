import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AddTelasModal from "./AddTelasModal";
import { getTelas } from "@AP/Tela";
import { Card, Flex, FloatButton } from "antd";
import styles from './TelasCards.module.css'

const TelasCards = () => {
  const navigate = useNavigate();
  const [telas, setTelas] = useState([]);
  const [OpenAddTela, setOpenAddTela] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getTelas(setTelas);
  }, [reload]);

  return (
    <>
      <Flex wrap gap="middle" align="start" justify="space-evenly">
        {telas.map((tela, index) => {
          return (
            <Card hoverable key={index} title={tela.tipo} className={styles.cardTela} onClick={() => navigate(`/prod/telas/${tela.tipo}`)}>
              <p>Stock por tela</p>
              <div className={styles.body}>
                <img src="/svg/tela/box.svg" alt="" className={styles.box} />
                <p className={styles.number}>{tela.STOCK}</p>
              </div>
            </Card>
          )
        })}
      </Flex>

      <FloatButton tooltip="Añadir Tela" onClick={() => setOpenAddTela(true)} />

      <AddTelasModal
        openModal={OpenAddTela}
        closeModal={() => setOpenAddTela(false)}
        reload={() => setReload(!reload)}
      />
    </>
  );
};

export default TelasCards;
