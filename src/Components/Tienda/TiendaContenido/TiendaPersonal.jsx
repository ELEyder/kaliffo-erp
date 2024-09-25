import { Table, Button, Flex, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { getusuariosTienda } from "../../../Shared/Funciones/Fucniones_Tienda";
import TiendaPersonalModal from "../TiendaModales/TiendaPersonalModal";
import { EliminarUsuario } from "../../../Shared/Funciones/Funciones_Fetch";
import TiendaAddPersonal from "../TiendaModales/TiendaAddPersonal";

const TiendaPersonal = ({ id, handlerefrescarSideCard1 }) => {
  const [usuariosTienda, setUsuariosTienda] = useState([]);
  const [idPersonal, setIdPersonal] = useState(null);
  const [modalPersonalTiendaAbierto, setModalPersonalTiendaAbierto] = useState(false);
  const [modalTiendaAddPersonalAbierto, setModalTiendaAddPersonalAbierto] = useState(false);

  const toggleModalPersonalTienda = (id) => {
    setIdPersonal(id);
    setModalPersonalTiendaAbierto(!modalPersonalTiendaAbierto);
  };

  const toggleModalTiendaAddPersonal = () => {
    setModalTiendaAddPersonalAbierto(!modalTiendaAddPersonalAbierto);
  };

  const handleRefresh = () => {
    getusuariosTienda(id, setUsuariosTienda);
    handlerefrescarSideCard1();
  };

  const handleEditarExitoso = () => {
    toggleModalPersonalTienda(null);
    handleRefresh();
  };

  const handleAddExitoso = () => {
    toggleModalTiendaAddPersonal();
    handleRefresh();
  };

  const eliminarUsuario = (id) => {
    if (EliminarUsuario(id)) {
      handleRefresh();
    }
  };

  useEffect(() => {
    getusuariosTienda(id, setUsuariosTienda);
  }, [id]);

  const columns = [
    {
      title: "Nombre",
      key: "nombre",
      render: (_, record) => `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
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
      key: "opciones",
      align: "center",
      render: (_, record) => (
        <Flex gap="small" align="center" horizontal="true" style={{ width: "100%" }} className="opciones-botones">
          <Button type="primary" block onClick={() => toggleModalPersonalTienda(record.usuario_id)}>
            Editar
          </Button>
          <Popconfirm
            title="ELIMINAR"
            description="¿DESEA ELIMINAR A?"
            okText="Confirmar"
            cancelText="NO"
            onConfirm={() => eliminarUsuario(record.usuario_id)}
          >
            <Button block style={{ background: "#f54242", color: "white" }} danger>
              Eliminar
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div style={{ margin: "0 auto" }}>
        <Button onClick={toggleModalTiendaAddPersonal}>Añadir Nuevo Personal</Button>
      </div>

      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        dataSource={usuariosTienda}
        rowKey="usuario_id"
      />

      <TiendaPersonalModal
        ModalPersonalTiendaAbierto={modalPersonalTiendaAbierto}
        closeModalPersonalTiendaAbierto={() => toggleModalPersonalTienda(null)}
        id_personal={idPersonal}
        handleEditarExitoso={handleEditarExitoso}
      />

      <TiendaAddPersonal
        ModalTiendaAddPersonalAbierto={modalTiendaAddPersonalAbierto}
        closeModalTiendaAddPersonalAbierto={toggleModalTiendaAddPersonal}
        id={id}
        handleAddExitoso={handleAddExitoso}
      />
    </>
  );
};

export default TiendaPersonal;
