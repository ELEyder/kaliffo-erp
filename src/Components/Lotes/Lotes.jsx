import React from "react";
import Plantilla from "../../Shared/Plantilla"
import LotesCards from "./Cards/LotesCards";
import { Divider } from "antd";


const Productos = () =>{

    return(
        <Plantilla>
            <Divider style={{textTransform: "uppercase"}}>
                Lotes
            </Divider>
            <LotesCards/>
            <Divider/>
        </Plantilla>
    )
}

export default Productos