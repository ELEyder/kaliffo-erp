import React from "react";
import TelasCards from "../../Components/Cards/TelasCards";
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