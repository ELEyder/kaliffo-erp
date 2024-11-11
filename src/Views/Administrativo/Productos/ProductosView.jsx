import React from "react";
import ProductosCards from "@C/Cards/ProductosCards";
import { Divider } from "antd";


const ProductosView = () =>{
    return(
        <>
            <Divider style={{textTransform: "uppercase"}}>
                Productos
            </Divider>
            <ProductosCards/> 
        </>
    )
}
export default ProductosView