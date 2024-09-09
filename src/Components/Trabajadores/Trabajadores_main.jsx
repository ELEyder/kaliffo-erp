import React, { Children, useState } from "react";
import Plantilla from "../../Shared/Plantilla"
import { useParams } from "react-router-dom";
import { FloatButton } from "antd";
import Modal_añadir from "./TrabajadoresVentanasModal/Modal_añadir";
import Tabla_Trabajadores from "./TrabajadoresTablas/Tabla_Trabajadores";

const Trabajadores_main = () =>{

    const { tipo_trabajador } = useParams();
    const [ModalAñadirAbierto,setModalAñadirAbierto] = useState(false)
    const [Refrescar,setRefrescar] = useState(false)
    
    const refrescarTabla = () =>{
        setRefrescar(true)
    }

    const showModalAñadir = () =>{
        setModalAñadirAbierto(true)
    }

    const closeModalAñadir = () =>{
        setModalAñadirAbierto(false)
    }

    return(
        <Plantilla>
            <Tabla_Trabajadores tipo_trabajador={tipo_trabajador}/>
            <FloatButton tooltip={<div>Añadir Nuevo</div>} onClick={showModalAñadir}/>
            <Modal_añadir ModalAñadirAbierto={ModalAñadirAbierto} closeModalAñadir={closeModalAñadir} tipo_trabajador={tipo_trabajador}/>
        </Plantilla>
    )
}

export default Trabajadores_main