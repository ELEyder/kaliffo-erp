import React from "react";
import ProductoInfo from "./ProductoInfo";
import ProductoLista from "./ProductoLista";
import { useParams } from "react-router-dom";
import { Divider } from "antd";

const ProductoSidebar = () =>{
    const { id } = useParams();
    return(
        <>
            <ProductoInfo
            />
            <Divider></Divider>
            <ProductoLista/>
        </>
    )
}

export default ProductoSidebar