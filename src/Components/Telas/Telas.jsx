import React from "react";
import Plantilla from "../../Shared/Plantilla"
import TelasCards from "./Cards/TelasCards";
import { Divider } from "antd";


const Telas = () =>{

    return(
        <>
            <Divider style={{textTransform: "uppercase"}}>
                Telas
            </Divider>
            <TelasCards/> 
        </>
    )
}

export default Telas