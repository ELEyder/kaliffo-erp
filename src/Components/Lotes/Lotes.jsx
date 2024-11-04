import React from "react";
import Plantilla from "../../Shared/Plantilla"
import LotesCards from "./Cards/LotesCards";
import { Divider } from "antd";


const Lotes = () =>{

    return(
        <>
            <Divider style={{textTransform: "uppercase"}}>
                Lotes
            </Divider>
            <LotesCards/>
            <Divider/>
        </>
    )
}

export default Lotes