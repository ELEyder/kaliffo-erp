import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Button, Row, Col, Popconfirm, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { getUsuariosTienda } from "../../../../Shared/api/Usuario";
import { deleteUsuario } from "../../../../Shared/api/Usuario";
import TiendaPersonalModal from "../../TiendaModales/TiendaPersonalModal";
import TiendaAddPersonal from "../../TiendaModales/TiendaAddPersonal";

const TiendaPersonal = ({ id,handlerefrescarSideCard1 }) => {
  const navigate = useNavigate();

  const [usuariostienda, setusuariostienda] = useState([]);
  const [id_personal, setIDPersonal] = useState(null);
  const [Refrescar, setRefrescar] = useState(false);

  const [ModalPersonalTiendaAbierto, setModalPersonalTiendaAbierto] = useState(false);
  const [ModalTiendaAddPersonalAbierto,setModalTiendaAddPersonalAbierto] = useState(false)


  const showModalPersonalTiendaAbierto = (id_personal) => {
    setIDPersonal(id_personal);
    setModalPersonalTiendaAbierto(true);
  };

  const closeModalPersonalTiendaAbierto = () => {
    setModalPersonalTiendaAbierto(false);
    setIDPersonal(null);
  };

  const showModalTiendaAddPersonalAbierto = () =>{
    setModalTiendaAddPersonalAbierto(true)
  }

  const closeModalTiendaAddPersonalAbierto = () =>{
    setModalTiendaAddPersonalAbierto(false)
  }

  const refrescarTabla = () => {
    setRefrescar(true);
  };

  const handleEditarExitoso = () => {
    closeModalPersonalTiendaAbierto();
    refrescarTabla();
    handlerefrescarSideCard1()
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
    if (Refrescar) {
      getUsuariosTienda(id, setusuariostienda);
      setRefrescar(false); 
    }
  }, [id, Refrescar]);

  const columns = [
    {
      title: "Nombre",
      key: "nombre",
      render: (text, record) =>
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
      dataIndex:"",
      key:"f",
      align:"center",
      render:(text,record) =>{
        return(
          <Button type="primary" block
          onClick={() => {
            navigate(`/trabajador/${record.usuario_id}`)
          }}
          >+</Button>
        )
      }
    },
    {
      title: "Opciones",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (text, record) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle">
            <Col>
                <Button type="primary" block onClick={() => showModalPersonalTiendaAbierto(record.usuario_id)}>Editar</Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                cancelText="NO"
                onConfirm={() => {
                  deleteUsuario(record.usuario_id, refrescarTabla)
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

      <FloatButton tooltip="Añadir Nuevo Pago" onClick={() => showModalTiendaAddPersonalAbierto()} type="primary" icon={<FileAddOutlined />}/>

      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        dataSource={[...usuariostienda]}
        rowKey={(record) => record.usuario_id}
      />

      <TiendaPersonalModal
        ModalPersonalTiendaAbierto={ModalPersonalTiendaAbierto}
        closeModalPersonalTiendaAbierto={closeModalPersonalTiendaAbierto}
        id_personal={id_personal}
        handleEditarExitoso={handleEditarExitoso}
      />

      <TiendaAddPersonal
        ModalTiendaAddPersonalAbierto={ModalTiendaAddPersonalAbierto}
        closeModalTiendaAddPersonalAbierto={closeModalTiendaAddPersonalAbierto}
        id={id}
        handleAddExitoso={handleAddExitoso}
      />

    </>
  );
};

export default TiendaPersonal;
