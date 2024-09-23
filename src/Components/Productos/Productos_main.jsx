import React, { useState } from "react";
import Plantilla from "../../Shared/Plantilla"
import Productos_Cards from "./ProductosCards/Productos_cards";
import Modal_añadir from "./ProductosModal/Modal_Añadir";
import { FloatButton } from "antd";

const Productos_main = () =>{

    const [ModalAñadirAbierto,setModalAñadirAbierto]=useState(false)
    const [Refrescar,setRefrescar] = useState(false)

    const refrescarCards = () =>{
        setRefrescar(true)
        setTimeout(() => setRefrescar(false), 500);
    }

    const showModalAñadir = () =>{
        setModalAñadirAbierto(true)
    }

    const closeModalAñadir = () => {
        setModalAñadirAbierto(false)
    }

    const handleAñadirExitoso = () =>{
        closeModalAñadir();
        refrescarCards()
    }

    return(
        <Plantilla>
            <FloatButton tooltip="Añadir" onClick={showModalAñadir}/>
            <Productos_Cards refrescar={Refrescar}/>
            <Modal_añadir ModalAñadirAbierto={ModalAñadirAbierto}
            closeModalAñadir={closeModalAñadir} añadidoexitoso={handleAñadirExitoso}/>
        </Plantilla>
    )
}

export default Productos_main