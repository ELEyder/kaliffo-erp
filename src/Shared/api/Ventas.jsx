import { showNotificationAdd, showNotificationDelete, showNotificationError } from "../Notifications"
const metodosPago = ["Efectivo", "Yape", "Transefencia"]
const tipoVenta = ["Por Mayor", "Por Menor"]
const tienda = ["Almacen", "Tienda 1", "Tienda 2"]

export const getVentas = async (tipo, setTablaDatos) => {
    const response = await fetch(`http://localhost:3000/venta`)
    const usuarioData= await response.json()
    let count = 0
    const detallesConNuevoParametro = usuarioData.map(detalle => { 
        count = count + 1
        const fecha_creacion = new Date(detalle.fecha);
        return {
            ...detalle,
            tipoPago: metodosPago[detalle.tipoPago - 1],
            tipoVenta: tipoVenta[detalle.tipoVenta - 1],
            fecha: fecha_creacion.toLocaleDateString("es-ES"),
            id: count,
        };
    });
    console.log(detallesConNuevoParametro)
    setTablaDatos(detallesConNuevoParametro)
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
    const datos = [
        {
            "nombre": "Producto1",
            "codigo": "A001",
            "cantidad": 10,
            "precio_u": 25.50,
            "preciototal": 255.00,
            "igv": 45.90,
            "neto": 300.90
          }
    ];
    setTablaDatos(datos)
}