import React from "react";
import LotesCards from "@CP/lotes/LotesCards";
import { Divider } from "antd";
import "@/assets/css/lotes/lotes.css"


const LotesView = () =>{

    return(
        <>
            <Divider style={{textTransform: "uppercase"}}> Lotes </Divider>
            <LotesCards/>
        </>
    )
}

export default LotesView