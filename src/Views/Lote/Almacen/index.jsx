import { Button } from "antd"
import { apiClient } from "../../../API/apiClient"
import { useParams } from "react-router-dom"

const Almacen = () => {
    const { id } = useParams()

    const imprimirCodigo = async () => {
        await apiClient.get(`producto/imprimir/${id}`)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }}>
        <Button onClick={imprimirCodigo}>Imprimir código de barras</Button>
        <Button onClick={imprimirCodigo}>Regirigir al Almacen</Button>
        </div>
    )
}

export default Almacen