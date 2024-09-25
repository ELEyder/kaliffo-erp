import React, { useState } from "react";
import Plantilla from "../../Shared/Plantilla";
import { useParams, Navigate } from "react-router-dom";
import { Divider, FloatButton } from "antd";
import Modal_añadir from "./TrabajadoresVentanasModal/Modal_añadir";
import Tabla_Trabajadores from "./TrabajadoresTablas/Tabla_Trabajadores";
import Modal_editar from "./TrabajadoresVentanasModal/Modal_editar";
import Modal_incidencias from "./TrabajadoresVentanasModal/Modal_Incidencias";
import { EliminarUsuario } from "../../Shared/Funciones/Funciones_Fetch";

const Trabajadores_main = () => {
  const { tipo_trabajador } = useParams();
  const [id, setId] = useState(null);
  const [modalState, setModalState] = useState({
    añadir: false,
    editar: false,
    incidencias: false,
  });
  const [refrescar, setRefrescar] = useState(false);

  const tiposValidos = ["ventas", "talleres", "miscelaneos"];
  if (tipo_trabajador && !tiposValidos.includes(tipo_trabajador)) {
    return <Navigate to="/error" />;
  }

  const abrirModal = (tipo, id = null) => {
    setId(id);
    setModalState((prevState) => ({ ...prevState, [tipo]: true }));
  };

  const cerrarModal = (tipo) => {
    setModalState((prevState) => ({ ...prevState, [tipo]: false }));
  };

  const refrescarTabla = () => {
    setRefrescar(true);
    setTimeout(() => setRefrescar(false), 500);
  };

  const manejarAccionExitosa = (tipo) => {
    cerrarModal(tipo);
    refrescarTabla();
  };

  const eliminar = (id) => {
    if (EliminarUsuario(id)) {
      refrescarTabla();
    }
  };

  return (
    <Plantilla>
      <Divider style={{textTransform: "uppercase"}}>
        {tipo_trabajador}
      </Divider>
      <Tabla_Trabajadores
        tipo_trabajador={tipo_trabajador}
        Refrescar={refrescar}
        editar={(id) => abrirModal("editar", id)}
        incidencias={(id) => abrirModal("incidencias", id)}
        eliminar={eliminar}
      />

      <FloatButton tooltip="Añadir Nuevo" onClick={() => abrirModal("añadir")} />

      <Modal_añadir
        ModalAñadirAbierto={modalState.añadir}
        closeModalAñadir={() => cerrarModal("añadir")}
        tipo_trabajador={tipo_trabajador}
        AñadidoExitoso={() => manejarAccionExitosa("añadir")}
      />

      <Modal_editar
        ModalEditarAbierto={modalState.editar}
        closeModalEditar={() => cerrarModal("editar")}
        tipo_trabajador={tipo_trabajador}
        id={id}
        EdicionExitosa={() => manejarAccionExitosa("editar")}
      />

      <Modal_incidencias
        ModalIncidenciasAbierto={modalState.incidencias}
        closeModalIncidencias={() => cerrarModal("incidencias")}
        id={id}
        IncidenciaExitosa={() => manejarAccionExitosa("incidencias")}
      />
    </Plantilla>
  );
};

export default Trabajadores_main;
