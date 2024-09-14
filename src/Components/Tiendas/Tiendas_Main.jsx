import React, { useState } from "react";
import Plantilla from "../../Shared/Plantilla"
import Tiendas_cards from "./TiendasCards/Tiendas_cards";
import { FloatButton } from "antd";
import Modal_añadir from "./TiendasModal/Modal_Añadir";

const Tiendas_main = () =>{

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
            <Tiendas_cards refrescar={Refrescar}/>
            <Modal_añadir ModalAñadirAbierto={ModalAñadirAbierto}
            closeModalAñadir={closeModalAñadir} añadidoexitoso={handleAñadirExitoso}/>
        </Plantilla>
    )
}

export default Tiendas_main