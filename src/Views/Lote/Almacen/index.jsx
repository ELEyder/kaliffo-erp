import { Button } from "antd"
import { apiClientFiles } from "../../../API/apiClient"
import { useParams } from "react-router-dom"

const Almacen = () => {
    const { id } = useParams()

    const imprimirCodigo = async () => {
        await apiClientFiles.get(`producto/imprimir/${id}`)
    }

    const redirigirAlmacen = () => {
        navigate("/almacen"); // Redirige al almacén
    };

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
        <Button onClick={redirigirAlmacen}>Regirigir al Almacen</Button>
        </div>
    )
}

export default Almacen