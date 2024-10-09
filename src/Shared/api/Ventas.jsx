import { showNotificationAdd, showNotificationDelete, showNotificationError } from "../Notifications"

export const getVentas = async (tipo, setTablaDatos) => {
    const Ventas = [
        {
            "id": 1,
            "codigo": 0,
            "tipo": 1,
            "fechaVenta": "2024-09-12",
            "cantidad": 2,
            "totalBruto": 2,
            "totalNeto": 2,
            "IGV": 2,
            "tipoPago": "Tarjeta de crédito",
            "RUC" : 123145143,
            "tiendaId" : 123145143,
        },
        {
            "id": 1,
            "codigo": 0,
            "tipo": 1,
            "fechaVenta": "2024-09-12",
            "cantidad": 2,
            "totalBruto": 2,
            "totalNeto": 2,
            "IGV": 2,
            "tipoPago": "Tarjeta de crédito",
            "RUC" : 123145143,
            "tiendaId" : 123145143,
        },
        {
            "id": 1,
            "codigo": 0,
            "tipo": 1,
            "fechaVenta": "2024-09-12",
            "cantidad": 2,
            "totalBruto": 2,
            "totalNeto": 2,
            "IGV": 2,
            "tipoPago": "Tarjeta de crédito",
            "RUC" : 123145143,
            "tiendaId" : 123145143,
        },

    ];
    setTablaDatos(Ventas)
}

export const SearchVenta = async (id) => {
    showNotificationDelete("Venta eliminada")
}

export const deleteVenta = async (id) => {
    showNotificationDelete("Venta eliminada")
}