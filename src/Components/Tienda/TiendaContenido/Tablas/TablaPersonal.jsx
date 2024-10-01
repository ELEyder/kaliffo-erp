import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Popconfirm, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { getusuariosTienda } from "../../../../Shared/Funciones/Fucniones_Tienda";
import TiendaPersonalModal from "../../TiendaModales/TiendaPersonalModal";
import { EliminarUsuario } from "../../../../Shared/Funciones/Funciones_Fetch";
import TiendaAddPersonal from "../../TiendaModales/TiendaAddPersonal";

const TiendaPersonal = ({ id,handlerefrescarSideCard1 }) => {
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
    getusuariosTienda(id, setusuariostienda);
    if (Refrescar) {
      getusuariosTienda(id, setusuariostienda);
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
