import { showNotificationAdd } from "../Notifications"
export const getTelas = async (setData) => {
  const response = await fetch(`http://localhost:3000/telas/`)
  const data = await response.json()
  console.log(data)
  setData(data)
}
export const getTelasActivas = async (tipo,setData) => {
  const response = await fetch(`http://localhost:3000/telas/${tipo}?estado=1`)
  var data = await response.json()
  var count = 0
  data = data.map(tela => { 
    const fecha_compra = new Date(tela.fecha_compra);
    count = count + 1
    return {
        ...tela,
        fecha_compra: fecha_compra.toLocaleDateString("es-ES"),
        n: count,
    };
});
  console.log(data)
  setData(data)
}
export const getTelasInactivas = async (tipo,setData) => {
  const response = await fetch(`http://localhost:3000/telas/${tipo}?estado=2`)
  var data = await response.json()
  var count = 0
  data = data.map(tela => { 
    const fecha_compra = new Date(tela.fecha_compra);
    count = count + 1
    return {
        ...tela,
        fecha_compra: fecha_compra.toLocaleDateString("es-ES"),
        n: count,
    };
});
  console.log(data)
  setData(data)
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
