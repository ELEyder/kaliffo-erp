import React from "react";
import TelasCards from "@C/Cards/TelasCards";
import { Divider } from "antd";


const TelasView = () =>{
    return(
        <>
            <Divider style={{textTransform: "uppercase"}}>
                Telas
            </Divider>
            <TelasCards/> 
        </>
    )
}
export default TelasView