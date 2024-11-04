import { showNotification } from "../Notifications"

export const getCorte = async (id, setData) => {
    const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
    const data = await response.json()
    setData(data)
  }

  export const addCorte = async (id, data) => {
    const Corte = {
      lote_id: Number(id),
      taller_id: Number(data.taller),
      producto_id: Number(data.producto),
      cantidad_enviada: Number(data.cantidad),
      talla: data.talla,
      metraje_asignado: Number(data.metraje),
      tipo_tela: data.tela,
    };
    const response = await fetch(`http://localhost:3000/cortes/create`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(Corte),
    })
    showNotification("add", "Corte añadido")
}

export const getChangeCorte = async (id, setData, form) => {
    const response = await fetch(`http://localhost:3000/cortes/lote/${id}`)
    const data = await response.json()
    let count = -1
    const detallesConNuevoParametro = data.map(detalle => { 
        count = count + 1;
        return {
            corte_id: detalle.corte_id,
            cantidad_enviada: detalle.cantidad_enviada,
        };
    });
    setData(detallesConNuevoParametro)
    form.setFieldsValue({ items: detallesConNuevoParametro });
  }