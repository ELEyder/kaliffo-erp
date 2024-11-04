import React from "react";
import ProductosCards from "./Cards/ProductosCards";
import { Divider } from "antd";


const Productos = () =>{

    return(
        <>
            <Divider style={{textTransform: "uppercase"}}>
                Productos
            </Divider>
            <ProductosCards/> 
        </>
    )
}

export default Productos