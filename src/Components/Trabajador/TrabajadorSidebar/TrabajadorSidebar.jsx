import React from "react";
import TrabajadorInfo from "./TrabajadorInfo";
import TrabajadorLista from "./TrabajadorLista";
import { useParams } from "react-router-dom";
import { Divider } from "antd";

const TrabajadorSidebar = () =>{
    const { id } = useParams();
    return(
        <>
            <TrabajadorInfo
            />
            <Divider></Divider>
            {/* <TrabajadorLista/> */}
        </>
    )
}

export default TrabajadorSidebar