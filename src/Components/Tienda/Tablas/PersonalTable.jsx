import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import UpdateUsuarioModal from "../Modals/UpdateUsuarioModal";
import TiendaAddPersonal from "../Modals/TiendaAddPersonal";
import { getUsuariosTienda, deleteUsuario } from "../../../Shared/api/Usuario";
import { Table, Button, Row, Col, Popconfirm, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

const PersonalTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuariostienda, setusuariostienda] = useState([]);
  const [idPersonal, setIdPersonal] = useState(null);
  const [Refrescar, setRefrescar] = useState(false);
  const [reload, setReload] = useState(false);

  const [OpenModalUpdate, setOpenModalUpdate] = useState(false);
  const [ModalTiendaAddPersonalAbierto,setModalTiendaAddPersonalAbierto] = useState(false)
  const [OpenAddPersonalModal,setOpenAddPersonalModal] = useState(false)

  const closeModalPersonalTiendaAbierto = () => {
    setModalPersonalTiendaAbierto(false);
    setIDPersonal(null);
  };

  const showModalTiendaAddPersonalAbierto = () =>{
    
  }

  const closeModalTiendaAddPersonalAbierto = () =>{
    setModalTiendaAddPersonalAbierto(false)
  }

  const refrescarTabla = () => {
    setRefrescar(true);
  };

  const handleAddExitoso = () => {
    closeModalTiendaAddPersonalAbierto();
    refrescarTabla();
    handlerefrescarSideCard1()
  };

  const eliminar = (id) =>{
    if(EliminarUsuario(id)){
      refrescarTabla()
      handlerefrescarSideCard1()
    }
  }

  useEffect(() => {
    getUsuariosTienda(id, setusuariostienda);
  }, [id, reload]);

  const columns = [
    {
      title: "Nombre",
      key: "nombre",
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
      align: "center",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      align: "center",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
    },
    {
      title:"Ver mas",
      dataIndex: "usuario_id",
      key:"verMas",
      align:"center",
      render:(text) =>{
        return(
          <Button type="primary" block
          onClick={() => {
            navigate(`/trabajador/${text}`)
          }}
          >+</Button>
        )
      }
    },
    {
      title: "Opciones",
      dataIndex: "usuario_id",
      key: "opciones",
      align: "center",
      render: (text) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle">
            <Col>
                <Button type="primary" block onClick={() => {
                  setIdPersonal(text)
                  setOpenModalUpdate(true)
                  }}>Editar</Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                cancelText="NO"
                onConfirm={() => {
                  deleteUsuario(text)
                  setReload(!reload)
                }}
              >
              <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <>

      <FloatButton tooltip="Añadir Nuevo Pago" onClick={() => setOpenAddPersonalModal(true)} type="primary" icon={<FileAddOutlined />}/>

      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        dataSource={[...usuariostienda]}
        rowKey={(record) => record.usuario_id}
      />

      <UpdateUsuarioModal
        openModal={OpenModalUpdate}
        closeModal={()=>setOpenModalUpdate(false)}
        id={idPersonal}
        reload={() => setReload(!reload)}
      />

      <TiendaAddPersonal
        openModal={OpenAddPersonalModal}
        closeModal={() => setOpenAddPersonalModal(false)}
        id={id}
        reload={() => setReload(!reload)}
      />

    </>
  );
};

export default PersonalTable;
