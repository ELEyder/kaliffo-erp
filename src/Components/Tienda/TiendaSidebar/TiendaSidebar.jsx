import React from "react";

import { Divider } from "antd";

const TiendaSidebar = ({id,refrescarSideCard1}) =>{
    return(
        <>
            <TiendaCard id={id} refrescarSideCard1={refrescarSideCard1}/>
            <Divider></Divider>
            <TiendaLista/>
        </>
    )
}

export default TiendaSidebar