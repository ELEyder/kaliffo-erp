import React from "react";
import TiendaCard from "./TiendaCard";
import TiendaLista from "./TiendaLista";
import { Divider } from "antd";

const TiendaSidebar = ({tienda}) =>{
    return(
        <>
            <TiendaCard tienda={tienda}/>
            <Divider></Divider>
            <TiendaLista/>
        </>
    )
}

export default TiendaSidebar