import { showNotification } from "../../Shared/Notifications"

export const getTelas = async (setData) => {
  const response = await fetch(`http://localhost:3000/telas/`)
  const data = await response.json()
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
  setData(data)
}
export const getTelasInactivas = async (tipo,setData) => {
  const response = await fetch(`http://localhost:3000/telas/${tipo}?estado=0`)
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
  setData(data)
}

export const getTiposTela = async (setTelas) => {
  const response = await fetch(`http://localhost:3000/telas/tipo`)
  const data = await response.json()
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
  showNotification("add", "Tela agregada")
}

export const deleteTelaById = async (id) =>{
  const response = await fetch(`http://localhost:3000/telas/desactivar/${id}`, {
    method: "PUT",
  })
  showNotification("delete","Tela agregada")
}