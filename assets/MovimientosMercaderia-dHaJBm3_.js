import{a as i}from"./ApiClient-DPIxiZ71.js";const r=async a=>{try{const t=await i.get("/movimiento/");a(t.data)}catch{a([])}},c=async(a,t,o)=>{try{const e=await i.get(`/movimiento/detalle/${o}?tipo=${t}`);a(e.data)}catch{a([])}},s=async(a,t)=>{let o={almacen_id:a.almacen,tienda_id:a.tienda,detalle:t};try{await i.post("/movimiento/create?tipo=AT",o)}catch(e){console.log("Error al añadir la tienda",e)}};export{c as a,s as c,r as g};
