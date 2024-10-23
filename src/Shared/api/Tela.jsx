import { showNotificationAdd } from "../Notifications"
export const getTelas = async (setData) => {
    const response = await fetch(`http://localhost:3000/telas/`)
    const data = await response.json()
    console.log(data)
    setData(data)
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
  
  export const getTiposTela = async (setTelas) => {
    const response = await fetch(`http://localhost:3000/telas/tipo`)
    const data = await response.json()
    console.log(data)
    setTelas(data)
  }

  export const addTelas = async (values) => {
    const response = await fetch(`http://localhost:3000/telas/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)
    })
    console.log(response)
    showNotificationAdd("Tela agregada")
  }
  