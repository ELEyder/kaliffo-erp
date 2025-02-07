import { Button } from "antd"
import { apiClient } from "../../../API/apiClient"
import { useNavigate, useParams } from "react-router-dom"

const Almacen = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const imprimirCodigo = async () => {
        const response = await apiClient.get(`producto/imprimir/${id}`, { responseType: 'blob' })

        const pdf = response.data;
        const url = window.URL.createObjectURL(pdf);
        window.open(url);

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