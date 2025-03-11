import{F as T,r as j,j as a,D as y,B as b}from"./index-Bunp8VmX.js";import"./ApiClient-CwTlTqVt.js";import{u as I}from"./useTrabajadores-BLGXokh3.js";import{u as x}from"./useTrabajador-CG2NXYvR.js";import{T as g}from"./index-1LFFKiN5.js";import{A as h}from"./AddIncidenciaModal-CYqPXxuC.js";import{D as M}from"./index-DGSKjoIJ.js";import{u as A}from"./useTiendas-DooPxEv9.js";import{U as F}from"./UpdateTrabajadorModal-CVTmog7b.js";import{F as C}from"./index-qnTMOKQ7.js";import{F as D}from"./index-BJT4Palo.js";import{P as _}from"./index-BYkL8nB6.js";import{D as v}from"./index-B_8r9Za8.js";import"./useApiRequest-GF_nNgjO.js";import"./Table-azPtpNCw.js";import"./styleChecker-BYYi54FN.js";import"./index-CWZRQiGq.js";import"./Dropdown-CAg5ab4S.js";import"./gapSize-U1swVQyS.js";import"./scrollTo-CK3_7m1G.js";import"./useBreakpoint-RvYD15SG.js";import"./index-DCZRlB0p.js";import"./ActionButton-DynUVMgy.js";import"./index-BkpqA939.js";import"./Skeleton-DQ75DhjH.js";const E=({openModal:m,closeModal:s,onAdded:p})=>{const[r]=T.useForm(),{tiendas:c}=A(),{addTrabajador:i}=x(p),[d,n]=j.useState(0),u=[{type:"text",label:"Nombres",name:"nombre"},{type:"text",label:"Apellido Paterno",name:"ap_paterno"},{type:"text",label:"Apellido Materno",name:"ap_materno"},{type:"date",label:"Fecha Nacimiento",name:"fecha_nacimiento"},{type:"number",label:"Teléfono",name:"telefono",max:9},{type:"number",label:"DNI",name:"dni",max:8},{type:"number",label:"Sueldo",name:"sueldo"},{type:"select",label:"Rol",name:"rol",value:d,onChange:t=>n(t),options:[{value:1,label:"Ventas"},{value:2,label:"Talleres"},{value:3,label:"Miscelaneos"},{value:4,label:"Costureros"}]},...d==1?[{type:"select",label:"Tienda Asignada",name:"tienda_id",options:c.map(t=>({value:t.tienda_id,label:t.tienda}))}]:[],{type:"hidden",name:"trabajador_id"}],o=async t=>{await i(t),s(!1)};return a.jsx(M,{title:"Añadir Trabajador",isOpen:m,onClose:s,onOk:r.submit,children:a.jsx(y,{form:r,onFinish:o,rows:u})})},P=({filtros:m})=>{const{trabajadores:s,loading:p,getTrabajadores:r}=I(m),{deleteTrabajador:c}=x(r),[i,d]=j.useState({}),[n,u]=j.useState({updT:!1,addT:!1,addI:!1}),o=(l,e)=>{u(f=>({...f,[l]:e}))};let t=[{title:"Nombres",dataIndex:"nombres"},{title:"DNI",dataIndex:"dni"},{title:"Teléfono",dataIndex:"telefono"},{title:"Incidencias",dataIndex:"total_incidencias"},{title:"Sueldo",dataIndex:"sueldo"},{title:"Rol",dataIndex:"rol"},{title:"Tienda",dataIndex:"tienda"},{title:"Opciones",render:l=>a.jsxs(D,{gap:"small",justify:"center",align:"middle",wrap:"wrap",children:[a.jsx(b,{type:"primary",onClick:e=>{e.stopPropagation(),d(l),o("updT",!0)},children:"Editar"}),a.jsx(b,{onClick:e=>{e.stopPropagation(),d(l),o("addI",!0)},children:"+ Incidencia"}),a.jsx(_,{title:"¿ELIMINAR?",description:"¿Estás seguro de eliminar este usuario?",okText:"Confirmar",cancelText:"Cancelar",onConfirm:async e=>{e.stopPropagation(),await c(l.trabajador_id)},children:a.jsx(b,{type:"primary",danger:!0,onClick:e=>e.stopPropagation(),children:"Eliminar"})})]})}];return a.jsxs(a.Fragment,{children:[a.jsx(g,{columnas:t,rowKey:"trabajador_id",dataSource:s,loading:p}),a.jsx(C,{onClick:()=>o("addT",!0)}),a.jsx(F,{openModal:n.updT,closeModal:()=>o("updT",!1),data:i,onUpdated:r}),a.jsx(E,{openModal:n.addT,closeModal:()=>o("addT",!1),onAdded:r}),a.jsx(h,{openModal:n.addI,closeModal:()=>o("addI",!1),id:i.trabajador_id,onAdded:r})]})},ta=()=>a.jsxs(a.Fragment,{children:[a.jsx(v,{children:"TRABAJADORES"}),a.jsx(P,{})]});export{ta as default};
