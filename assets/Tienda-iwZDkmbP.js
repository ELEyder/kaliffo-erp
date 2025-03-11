import{A as e}from"./ApiClient-CwTlTqVt.js";const r=async a=>{try{const t=await e.get("/tienda");a(t.data)}catch(t){console.log("Error al obtener las tiendas",t)}};export{r as g};
