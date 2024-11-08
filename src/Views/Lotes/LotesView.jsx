import React from "react";
import LotesCards from "../../Components/Cards/LotesCards";
import { Divider } from "antd";
import "@/assets/css/lotes/lotes.css"


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