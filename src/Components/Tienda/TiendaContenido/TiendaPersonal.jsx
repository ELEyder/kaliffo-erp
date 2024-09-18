import { Table, Button, Flex, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { getusuariosTienda } from "../../../Shared/Funciones/Fucniones_Tienda";
import TiendaPersonalModal from "../TiendaModales/TiendaPersonalModal";
import { EliminarUsuario } from "../../../Shared/Funciones/Funciones_Fetch";

const TiendaPersonal = ({ id }) => {
  const [usuariostienda, setusuariostienda] = useState([]);
  const [id_personal, setIDPersonal] = useState(null);
  const [Refrescar, setRefrescar] = useState(false);

  const [ModalPersonalTiendaAbierto, setModalPersonalTiendaAbierto] = useState(false);

  const showModalPersonalTiendaAbierto = (id_personal) => {
    setIDPersonal(id_personal);
    setModalPersonalTiendaAbierto(true);
  };

  const closeModalPersonalTiendaAbierto = () => {
    setModalPersonalTiendaAbierto(false);
    setIDPersonal(null);
  };

  const refrescarTabla = () => {
    setRefrescar(true);
  };

  const handleEditarExitoso = () => {
    closeModalPersonalTiendaAbierto();
    refrescarTabla();
  };

  const eliminar = (id) =>{
    if(EliminarUsuario(id)){
      refrescarTabla()
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
          <Flex
            gap="small"
            align="center"
            horizontal="true"
            style={{ width: "100%" }}
            className="opciones-botones"
          >
            <Button type="primary" block onClick={() => showModalPersonalTiendaAbierto(record.usuario_id)}>
              Editar
            </Button>
            <Popconfirm
              title="ELIMINAR"
              description="DESEA ELIMINAR A"
              okText="Confirmar"
              cancelText="NO"
              onConfirm={() => eliminar(record.usuario_id)}
            >
              <Button block style={{ background: "#f54242", color: "white" }} danger>
                Eliminar
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
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
    </>
  );
};

export default TiendaPersonal;
