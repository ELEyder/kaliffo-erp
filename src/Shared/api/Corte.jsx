import { showNotificationAdd } from "../Notifications"
export const getCorte = async (id, setData) => {
    const response = await fetch(`http://localhost:3000/cortes/1`)
    const Telas = [
        {
          "taller": "Taller A",
          "producto": "Jeans Slim Fit",
          "cantidad": 120,
          "talla": "M",
          "tela": "Denim",
          "metraje": 150.5,
          "merma": 2.5,
          "neto": 148
        },
        {
          "taller": "Taller B",
          "producto": "Jeans Regular",
          "cantidad": 80,
          "talla": "L",
          "tela": "Denim Stretch",
          "metraje": 100.0,
          "merma": 1.8,
          "neto": 98.2
        },
        {
          "taller": "Taller C",
          "producto": "Jeans Skinny",
          "cantidad": 60,
          "talla": "S",
          "tela": "Denim Ligero",
          "metraje": 75.3,
          "merma": 1.0,
          "neto": 74.3
        }
      ]
    const productoData = await response.json()
    console.log(productoData)
    setData(productoData)
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
  