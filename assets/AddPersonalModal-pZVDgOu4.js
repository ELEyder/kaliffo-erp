import{F as p,j as a,D as u,L as j}from"./index-Bunp8VmX.js";import"./ApiClient-CwTlTqVt.js";import{u as b}from"./useTrabajadores-BLGXokh3.js";import{u as c}from"./useTrabajador-CG2NXYvR.js";import{D as f}from"./index-DGSKjoIJ.js";const v=({openModal:t,closeModal:r,tienda_id:s,onAdded:n})=>{const[e]=p.useForm(),{trabajadores:i}=b({rol:1,antiTienda_id:s}),{updateTrabajador:m}=c(n),l=[{type:"select",name:"personal",label:"Personal",options:i.map(o=>({value:o.trabajador_id,label:o.nombres}))}],d=async o=>{await m(o.personal,{tienda_id:s}),r()};return a.jsx(a.Fragment,{children:a.jsxs(f,{title:"Añadir Personal",isOpen:t,onClose:r,onOk:e.submit,children:[a.jsx(u,{rows:l,onFinish:d,form:e}),a.jsx(j,{to:"/administrativo/trabajadores",children:"¿Trabajador Nuevo?"})]})})};export{v as A};
