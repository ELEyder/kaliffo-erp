import{r as b,e as R,j as e}from"./index-VOe2vgqy.js";import{i as S}from"./Producto-aVoRwkLl.js";import{c as V}from"./Ventas-Bi6iFSJf.js";import{a as k}from"./ApiClient-DPIxiZ71.js";import{F as c}from"./index-CC7smcAL.js";import{D as v}from"./index-BK0r8Jws.js";import{R as _,C as s}from"./row-B9VIZwhG.js";import{I as u}from"./index-DN4pQfum.js";import{B as w}from"./button-BkK1HIrY.js";import{C as z}from"./index-CbSnFLG8.js";import{S as A}from"./index-MILUAy1A.js";import{T as P}from"./index-MbbRLu9s.js";import"./ContextIsolator-BCW6I3vM.js";import"./useSize-C1OhOW7A.js";import"./EllipsisOutlined-Dvj6DMPu.js";import"./useMergedState-BLg108Rf.js";import"./index-CpO96mgP.js";import"./responsiveObserver-NkQ2BBL7.js";import"./TextArea-YowM3xaT.js";import"./EyeOutlined-CS0JsWFM.js";import"./Skeleton-CmZq7VAa.js";import"./index-DgHYd8On.js";import"./Dropdown-C9Rkt24_.js";import"./CheckOutlined-DNK-T4Ox.js";import"./DownOutlined-qBagt-Zf.js";import"./EditOutlined-_LseL3yE.js";import"./styleChecker-BQJ6aNOb.js";const B=async(h,p)=>{try{return(await k.get(`/venta/datos_cliente/${p}?tipo=${h}`)).data}catch(n){console.log(n)}},me=()=>{const{Title:h,Text:p}=P,[n,f]=b.useState({}),[d,F]=b.useState("");b.useState(!1);const[x]=c.useForm(),{tipo:g}=R();b.useEffect(()=>{const r=t=>{t.key==="Enter"&&d.trim()!==""?(Object.values(n).some(a=>a.detalles.some(o=>o.codigo===d))?f(a=>{const o={...a};return Object.keys(o).forEach(l=>{o[l].detalles=o[l].detalles.map(i=>i.codigo===d?{...i,cantidad:i.cantidad+1}:i),o[l].cantidad=o[l].detalles.reduce((i,{cantidad:C})=>i+C,0)}),o}):S(d).then(a=>{a&&f(o=>{const l=[a.producto_nombre,a.nombre,a.talla].join("-"),i=o[l]?o[l].detalles.reduce((C,{cantidad:E})=>C+E,0)+1:1;return o[l]?{...o,[l]:{...o[l],cantidad:i,detalles:[...o[l].detalles,{detalle_id:a.productoDetalle_id,codigo:d,cantidad:1}]}}:{...o,[l]:{producto_id:a.producto_id,color_id:a.color_id,talla:a.talla,cantidad:i,precio:a.precioBase,detalles:[{detalle_id:a.productoDetalle_id,codigo:d,cantidad:1}]}}})}),F("")):F(m=>m+t.key)};return document.addEventListener("keypress",r),()=>{document.removeEventListener("keypress",r)}},[d]);const D=r=>{f(t=>{const{[r]:m,...a}=t;return a})},I=Object.values(n).reduce((r,{cantidad:t})=>r+t,0),j=Object.values(n).reduce((r,{cantidad:t,precio:m})=>r+t*m,0),y=Math.floor(j*.18),T=(j+y).toFixed(1);return e.jsxs(e.Fragment,{children:[e.jsx(v,{orientation:"center",style:{textTransform:"uppercase",fontSize:"1.4rem",fontWeight:"bold",color:"#4A90E2"},children:g==="boleta"?"Boleta":"Factura"}),e.jsx(c,{size:"large",labelAlign:"left",layout:"vertical",form:x,onFinish:async r=>{await V(g,r,n,I,j,y,T)},children:e.jsxs(_,{gutter:16,children:[e.jsx(s,{span:16,children:e.jsxs(_,{children:[e.jsx(s,{span:24,children:e.jsx(h,{level:3,style:{backgroundColor:"#181c34",textAlign:"center",borderRadius:"10px",color:"#fff",padding:"10px 0"},children:"Productos"})}),e.jsx(s,{span:24,style:{marginTop:"10px",fontSize:"1rem",textAlign:"center",color:"#333",maxHeight:"250px",overflowY:"auto"},children:e.jsx("div",{id:"productos_lista",style:{color:"white"},children:Object.entries(n).map(([r,t])=>e.jsxs(_,{gutter:[16,16],style:{margin:"10px 0",padding:"10px",backgroundColor:"#1e1e2f",borderRadius:"8px",alignItems:"center"},children:[e.jsx(s,{span:10,style:{textAlign:"left",color:"#fff"},children:e.jsx("span",{style:{fontSize:"1rem",fontWeight:"bold"},children:`${r}: ${t.cantidad}`})}),e.jsx(s,{span:8,children:e.jsx(c.Item,{style:{margin:0},children:e.jsx(u,{value:t.precio,onChange:m=>{const a=parseFloat(m.target.value)||0;f(o=>({...o,[r]:{...o[r],precio:a}}))},style:{borderRadius:"5px",textAlign:"center",fontWeight:"bold"}})})}),e.jsx(s,{span:6,children:e.jsx(w,{type:"primary",danger:!0,onClick:()=>D(r),style:{width:"100%",fontWeight:"bold",borderRadius:"5px"},children:"X"})})]},r))})}),e.jsx(v,{style:{margin:"15px 0"}}),e.jsxs(s,{span:24,style:{fontSize:"0.9rem",color:"yellow",display:"flex",justifyContent:"space-between",padding:"10px",backgroundColor:"#f7f7f7",borderRadius:"8px",fontWeight:"bold"},children:[e.jsxs(p,{children:["Cantidad Total: ",I]}),e.jsxs(p,{children:["Total Bruto: ",j]}),e.jsxs(p,{children:["IGV Total: ",y]}),e.jsxs(p,{children:["Total Neto: ",T]})]})]})}),e.jsx(s,{span:1,children:e.jsx(v,{type:"vertical",style:{height:"100%",borderColor:"#e0e0e0"}})}),e.jsxs(s,{span:7,children:[e.jsxs(z,{size:"small",title:e.jsx(h,{level:4,style:{color:"white",textAlign:"center"},children:"Datos del Cliente"}),bordered:!1,children:[g==="boleta"?e.jsx(c.Item,{name:"dni",label:"DNI del Cliente",children:e.jsx(u,{maxLength:8,count:{show:!0,max:8},onChange:r=>{r.target.value.length===8&&B("dni",r.target.value).then(t=>{t?x.setFieldValue("nombre",[t.name,t.motherLastName,t.lastName].join(" ")):x.setFieldValue("nombre",[])})}})}):e.jsxs(e.Fragment,{children:[e.jsx(c.Item,{name:"ruc",label:"RUC del Cliente",children:e.jsx(u,{maxLength:11,count:{show:!0,max:11},onChange:r=>{r.target.value.length===11?B("ruc",r.target.value).then(t=>{t&&x.setFieldsValue({nombre:t.social_reason,direccion:[t.type_road,t.name_road,t.number,t.zone_code,t.type_zone].join(" ")})}):x.setFieldValue("nombre",[])}})}),e.jsx(c.Item,{name:"direccion",label:"Direccion",children:e.jsx(u,{})})]}),e.jsx(c.Item,{name:"nombre",label:"Nombre del Cliente",children:e.jsx(u,{readOnly:!0})}),e.jsx(c.Item,{name:"metodo",label:"Tipo de Pago",children:e.jsx(A,{defaultValue:"1",options:[{value:1,label:"Efectivo"},{value:2,label:"Yape/Plin"},{value:3,label:"Transferencia"}]})})]}),Object.keys(n).length>=1&&e.jsx("div",{style:{marginTop:"10px",marginBottom:"20px"},children:e.jsx(w,{type:"primary",block:!0,htmlType:"submit",children:g==="boleta"?"Imprimir Boleta":"Imprimir Factura"})})]})]})})]})};export{me as default};
