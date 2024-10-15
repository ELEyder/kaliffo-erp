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
            "id": 2,
            "codigo": 2,
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

export const getVentasByTienda = async (id, setTablaDatos) => {
    const datos = [
        {
            "id": 3,
            "codigo": 3,
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
            "id": 4,
            "codigo": 4,
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
    setTablaDatos(datos)
}

export const getVentaById = async (id, setTablaDatos) => {
    const Ventas = [
        {
            "id": 1,
            "nombre": "Producto1",
            "codigo": "A001",
            "cantidad": 10,
            "precio_u": 25.50,
            "preciototal": 255.00,
            "igv": 45.90,
            "neto": 300.90
          }
    ];
    setTablaDatos(Ventas)
}