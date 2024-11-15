import React from "react";
import LotesCards from "@CP/lotes/LotesCards";
import { Divider } from "antd";

const LotesView = () =>{
    return(
        <>
            <Divider style={{textTransform: "uppercase"}}> Lotes </Divider>
            <LotesCards/>
        </>
    )
}

export default LotesView