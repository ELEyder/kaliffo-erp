import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddTelaModal from "../Modals/AddTelaModal";
import AddTelasModal from "../Modals/AddTelasModal";
import DeleteProductoModal from "../Modals/DeleteProductoModal";
import UpdateProductoModal from "../Modals/UpdateProductoModal"
import { getTelas} from "../../../Shared/api/Tela";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Col, Row, List, FloatButton, Tooltip } from "antd";

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
      <Row gutter={16}>
        {telas.map((tela, index) => {
          return (
            <Col key={index} span={5} style={{ margin: "0 0 24px 0", textAlign: "center" }}>
              <Card
                title="SIN DATOS"
                actions={[
                  <Tooltip title="Ver Detalles" className={"card-view"}>
                    {/* <Link to={`/tela/${tela.tela}`}> */}
                    <Link to={`/almacen/tela/1`}>
                      <EyeOutlined style={{color: "white"}} key="view" />
                    </Link>
                  </Tooltip>,
                ]}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { title: "STOCK DE ROLLOS", value: tela.stock },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <b>{item.title}</b>
                      <span style={{ float: "right" }}>{item.value}</span>
                    </List.Item>
                  )}/>
              </Card>
            </Col>
          );
        })}
      </Row>

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
