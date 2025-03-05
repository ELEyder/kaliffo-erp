import {ApiClient} from '../ApiClient';

export const getDatosCliente = async (tipo,datos) =>{
    try {
        const response = await ApiClient.get(`/venta/datos_cliente/${datos}?tipo=${tipo}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}