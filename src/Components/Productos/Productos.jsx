import React from "react";
import Plantilla from "../../Shared/Plantilla"
import ProductosCards from "./Cards/ProductosCards";
import { Divider } from "antd";


const Productos = () =>{

    return(
        <Plantilla>
            <Divider style={{textTransform: "uppercase"}}>
                Productos
            </Divider>
            <ProductosCards/> 
        </Plantilla>
    )
}

export default Productos