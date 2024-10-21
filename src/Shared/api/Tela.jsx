import { showNotificationAdd } from "../Notifications"
export const getTelas = async (setProducto) => {
    // const response = await fetch(`http://localhost:3000/telas/`)
    const Telas = [{
        id : "1",
        nombre : "Sin datos",
        tipo : "Sin datos",
        stock : "Sin datos"
    },
    {
        id : "1",
        nombre : "Sin datos",
        tipo : "Sin datos",
        stock : "Sin datos"
    }]
    // const productoData = await response.json()
    // console.log(productoData)
    setProducto(Telas)
  }
  
  export const getTelasActivas = async (setProducto) => {
    // const response = await fetch(`http://localhost:3000/telas/`)
    const Telas = [
        {
          n: 1,
          metraje: "5m",
          articulo: "Tela de Jean",
          empresaCompra: "Textiles S.A.",
          fechaCompra: "2024-10-17",
        },
        {
          n: 2,
          metraje: "10m",
          articulo: "Cierre Metálico",
          empresaCompra: "Accesorios SRL",
          fechaCompra: "2024-09-30",
        },
        {
          n: 3,
          metraje: "15m",
          articulo: "Botones de Metal",
          empresaCompra: "Metalurgica Peruana",
          fechaCompra: "2024-09-25",
        }
      ];
    // const productoData = await response.json()
    // console.log(productoData)
    setProducto(Telas)
  }
  
  export const getTelasInactivas = async (setProducto) => {
    // const response = await fetch(`http://localhost:3000/telas/`)
    const Telas = [
        {
          n: 1,
          metraje: "5m",
          articulo: "Tela de Jean",
          empresaCompra: "Textiles S.A.",
          fechaCompra: "2024-10-17",
        },
        {
          n: 2,
          metraje: "10m",
          articulo: "Cierre Metálico",
          empresaCompra: "Accesorios SRL",
          fechaCompra: "2024-09-30",
        },
        {
          n: 3,
          metraje: "15m",
          articulo: "Botones de Metal",
          empresaCompra: "Metalurgica Peruana",
          fechaCompra: "2024-09-25",
        }
      ];
    // const productoData = await response.json()
    // console.log(productoData)
    setProducto(Telas)
  }
  
  export const getTiposTela = async (setProducto) => {
    // const response = await fetch(`http://localhost:3000/telas/`)
    const Telas = [
        {
          id: 1,
          nombre: "Premium",
        },
        {
          id: 2,
          nombre: "Clásica",
        },
      ];
    // const productoData = await response.json()
    // console.log(productoData)
    setProducto(Telas)
  }

  export const addTela = async (values) => {
    // const response = await fetch(`http://localhost:3000/telas/`)
    // const productoData = await response.json()
    // console.log(productoData)
    values["fecha"] = Date.now()
    console.log(values)
    showNotificationAdd("Tela agregada")
  }
  