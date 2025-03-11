import{c as y,F as r,r as l,j as e,Z as p,a3 as f,B as b,aG as C}from"./index-Bunp8VmX.js";import{b as _,d as k,e as T}from"./Corte-DVOiRUog.js";import{b as S}from"./Producto-BhDx9a2R.js";import{g as F}from"./Usuario-C8RuNjFp.js";import{M as I}from"./index-DCZRlB0p.js";import{g as v}from"./Lote-D_Ldw2rP.js";import{P as E}from"./index-BYkL8nB6.js";import{F as O}from"./Table-azPtpNCw.js";import{F as A}from"./index-qnTMOKQ7.js";import"./ApiClient-CwTlTqVt.js";import"./moment-C5S46NFB.js";import"./ActionButton-DynUVMgy.js";import"./index-BkpqA939.js";import"./Skeleton-DQ75DhjH.js";import"./styleChecker-BYYi54FN.js";import"./index-CWZRQiGq.js";import"./Dropdown-CAg5ab4S.js";import"./gapSize-U1swVQyS.js";import"./scrollTo-CK3_7m1G.js";import"./useBreakpoint-RvYD15SG.js";const P=({openModal:c,closeModal:n,reload:x})=>{const{id:s}=y(),[o]=r.useForm(),[i,g]=l.useState([]),[h,u]=l.useState([]);return l.useEffect(()=>{S(s,g),F("talleres",u)},[]),e.jsx(I,{getContainer:!1,title:"NUEVOS CORTES",styles:{header:{textAlign:"center"}},open:c,onCancel:()=>n(!1),okText:"Añadir",onOk:o.submit,centered:!0,width:600,children:e.jsxs(r,{style:{margin:"0 auto"},size:"large",form:o,labelAlign:"center",layout:"vertical",onFinish:async t=>{await _(s,t),o.resetFields(),x(),n(!1)},initialValues:{detalles:[{cantidad_enviada:null,talla:null,taller_id:null}]},children:[e.jsx(r.Item,{name:"producto_id",label:"Producto",rules:[{required:!0,message:"Producto es requerido"}],children:e.jsx(p,{placeholder:"Seleccione productos",children:i==null?void 0:i.map(t=>e.jsxs(p.Option,{value:t.producto_id,children:[t.nombre," "]},`producto_${t.producto_id}`))})}),e.jsx(r.List,{name:"detalles",children:(t,{add:j,remove:d})=>e.jsxs(e.Fragment,{children:[t.map(a=>e.jsxs("div",{style:{display:"flex",gap:"10px",alignItems:"center"},children:[e.jsx(r.Item,{name:[a.name,"cantidad_enviada"],label:"Cantidad Enviada",rules:[{required:!0,message:"Cantidad enviada es requerida"}],children:e.jsx(f,{style:{width:"100%"},min:1})}),e.jsx(r.Item,{name:[a.name,"talla"],label:"Talla",rules:[{required:!0,message:"Talla es requerida"}],children:e.jsx(f,{style:{width:"100%"}})}),e.jsx(r.Item,{name:[a.name,"taller_id"],label:"Taller",children:e.jsx(p,{placeholder:"Seleccione el taller",children:h.map(m=>e.jsxs(p.Option,{value:m.trabajador_id,children:[`${m.nombre} ${m.ap_paterno} ${m.ap_materno}`," "]},`taller_${m.trabajador_id}`))})}),e.jsx(b,{type:"danger",onClick:()=>d(a.name),children:"Eliminar"})]},a.key)),e.jsx(r.Item,{children:e.jsx(b,{type:"dashed",onClick:()=>j(),block:!0,children:"Agregar Detalle"})})]})})]})})},Y=()=>{const{id:c}=y(),[n,x]=l.useState([]),{reload:s,setReload:o}=C(),[i,g]=l.useState([]),[h,u]=l.useState(!1);l.useEffect(()=>{k(c,x),v(c,1,g)},[c,s]);const t=n.some(d=>d.estado===1),j=[{key:"taller",dataIndex:"taller",title:"Taller",align:"center"},{key:"producto",dataIndex:"producto",title:"Producto",align:"center"},{key:"cantidad_enviada",dataIndex:"cantidad_enviada",title:"Cantidad Enviada",align:"center"},...n.some(d=>d.estado===3)?[{key:"cantidad_recibida",dataIndex:"cantidad_recibida",title:"Cantidad Recibida",align:"center"}]:[],{key:"talla",dataIndex:"talla",title:"Talla",align:"center"},...t?[{title:"Opciones",key:"opciones",align:"center",render:(d,a)=>e.jsx(E,{title:"Eliminar",description:"¿Desea eliminar este corte?",okText:"Confirmar",cancelText:"No",onConfirm:()=>{T(a.corte_id,a.estado),o(!s)},children:e.jsx(b,{block:!0,style:{background:"#f54242",color:"white"},danger:!0,children:"Eliminar"})})}]:[]];return e.jsxs(e.Fragment,{children:[e.jsx(O,{scroll:{x:"min-content"},dataSource:n,columns:j,rowKey:"corte_id"}),i===0||i===1?e.jsxs(e.Fragment,{children:[e.jsx(A,{onClick:()=>u(!0),tooltip:"Añadir Corte"}),e.jsx(P,{openModal:h,closeModal:()=>u(!1),reload:()=>o(!s)})]}):null]})};export{Y as default};
