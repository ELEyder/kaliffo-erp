import React, { Children, useState } from "react";
import Plantilla from "../../Shared/Plantilla";
import { useParams,Navigate } from "react-router-dom";
import { Divider, FloatButton } from "antd";
import Modal_añadir from "./TrabajadoresVentanasModal/Modal_añadir";
import Tabla_Trabajadores from "./TrabajadoresTablas/Tabla_Trabajadores";
import Modal_editar from "./TrabajadoresVentanasModal/Modal_editar";
import Modal_incidencias from "./TrabajadoresVentanasModal/Modal_Incidencias";
import { EliminarUsuario } from "../../Shared/Funciones/Funciones_Fetch";

const Trabajadores_main = () => {
  const { tipo_trabajador } = useParams();
  const [id, SetID] = useState(null);

  const tiposValidos = ["ventas", "talleres", "miscelaneos"];

  if (tipo_trabajador && !tiposValidos.includes(tipo_trabajador)) {
    return <Navigate to="/error" />;
  } else {
    const [ModalAñadirAbierto, setModalAñadirAbierto] = useState(false);
    const [ModalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [ModalIncidenciasAbierto, setModalIncidenciasAbierto] =
      useState(false);

    const [Refrescar, setRefrescar] = useState(false);

    const refrescarTabla = () => {
      setRefrescar(true);
      setTimeout(() => setRefrescar(false), 500);
    };

    const showModalAñadir = () => {
      setModalAñadirAbierto(true);
    };

    const closeModalAñadir = () => {
      setModalAñadirAbierto(false);
    };

    const handleAñadirExitoso = () => {
      closeModalAñadir();
      refrescarTabla();
    };

    const showModalEditar = (id) => {
      SetID(id);
      setModalEditarAbierto(true);
    };

    const closeModalEditar = () => {
      setModalEditarAbierto(false);
    };

    const handleEditarExitoso = () => {
      closeModalEditar();
      refrescarTabla();
    };

    const showModalIncidencias = (id) => {
      SetID(id);
      setModalIncidenciasAbierto(true);
    };

    const closeModalIncidencias = () => {
      setModalIncidenciasAbierto(false);
    };

    const handleIncidenciaExitoso = () => {
      closeModalIncidencias();
      refrescarTabla();
    };

    const eliminar = (id) => {
      if (EliminarUsuario(id)) {
        refrescarTabla();
      }
    };

    return (
      <Plantilla>
        <Divider style={{fontSize:"20px",textTransform:"uppercase",fontWeight:"bold"}}>{tipo_trabajador}</Divider>
        <Tabla_Trabajadores
          tipo_trabajador={tipo_trabajador}
          Refrescar={Refrescar}
          editar={showModalEditar}
          incidencias={showModalIncidencias}
          eliminar={eliminar}
        />

        <FloatButton tooltip="Añadir Nuevo" onClick={showModalAñadir} />

        <Modal_añadir
          ModalAñadirAbierto={ModalAñadirAbierto}
          closeModalAñadir={closeModalAñadir}
          tipo_trabajador={tipo_trabajador}
          AñadidoExitoso={handleAñadirExitoso}
        />

        <Modal_editar
          ModalEditarAbierto={ModalEditarAbierto}
          closeModalEditar={closeModalEditar}
          tipo_trabajador={tipo_trabajador}
          id={id}
          EdicionExitosa={handleEditarExitoso}
        />

        <Modal_incidencias
          ModalIncidenciasAbierto={ModalIncidenciasAbierto}
          closeModalIncidencias={closeModalIncidencias}
          id={id}
          IncidenciaExitosa={handleIncidenciaExitoso}
        />
      </Plantilla>
    );
  }
};

export default Trabajadores_main;
