import{r as j,e as k,j as e}from"./index-DnZSuapv.js";import{D as f}from"./index-DnZuPcqL.js";import{F as a}from"./index-eEjfzd7p.js";import{R as u,C as l}from"./row-Bgu54Vpq.js";import{I as m}from"./index-CfhjOVlK.js";import{B as C}from"./button-DxAvYtf7.js";import{C as R}from"./index-BLOaBrrf.js";import{S as B}from"./index-CAw0ik1A.js";import{T as E}from"./index-CU-hXdd1.js";import"./EllipsisOutlined-BC2kcC9O.js";import"./useMergedState-xnIRtK6W.js";import"./useSize-DL9WfM8p.js";import"./ContextIsolator-X51Zuf7C.js";import"./index-OoAlQgr1.js";import"./responsiveObserver-P31G7zPC.js";import"./TextArea-D6coABml.js";import"./EyeOutlined-Dgph3YEA.js";import"./Skeleton-C8RXkADb.js";import"./index-rbW2pF-2.js";import"./CheckOutlined-CxFn5oU1.js";import"./DownOutlined-DfCZxesi.js";import"./EditOutlined-Bm2pbz4p.js";import"./styleChecker-BPMTEHVB.js";const Q=()=>{const{Title:g,Text:c}=E,[d,p]=j.useState({}),[n,b]=j.useState(""),{tipo:x}=k();j.useEffect(()=>{const t=o=>{o.key==="Enter"?(n==="016485"?p(r=>{var s,i;return{...r,"lectora de codigos":{cantidad:(((s=r["lectora de codigos"])==null?void 0:s.cantidad)||0)+1,precio:20,codigos:[...((i=r["lectora de codigos"])==null?void 0:i.codigos)||[],n]}}}):n==="78600027"&&p(r=>{var s,i;return{...r,Caramelos:{cantidad:(((s=r.Caramelos)==null?void 0:s.cantidad)||0)+1,precio:12,codigos:[...((i=r.Caramelos)==null?void 0:i.codigos)||[],n]}}}),b("")):b(r=>r+o.key)};return document.addEventListener("keypress",t),()=>{document.removeEventListener("keypress",t)}},[n]);const v=t=>{p(o=>{const{[t]:r,...s}=o;return s})},I=Object.values(d).reduce((t,{cantidad:o})=>t+o,0),h=Object.values(d).reduce((t,{cantidad:o,precio:r})=>t+o*r,0),y=Math.floor(h*.18),T=h+y;return e.jsxs(e.Fragment,{children:[e.jsx(f,{orientation:"center",style:{textTransform:"uppercase",fontSize:"1.4rem",fontWeight:"bold",color:"#4A90E2"},children:x==="boleta"?"Boleta":"Factura"}),e.jsx(a,{size:"large",labelAlign:"left",layout:"vertical",children:e.jsxs(u,{gutter:16,children:[e.jsx(l,{span:16,children:e.jsxs(u,{children:[e.jsx(l,{span:24,children:e.jsx(g,{level:3,style:{backgroundColor:"#181c34",textAlign:"center",borderRadius:"10px",color:"#fff",padding:"10px 0"},children:"Productos"})}),e.jsx(l,{span:24,style:{marginTop:"10px",fontSize:"1rem",textAlign:"center",color:"#333",maxHeight:"250px",overflowY:"auto"},children:e.jsx("div",{id:"productos_lista",style:{color:"white"},children:Object.entries(d).map(([t,o])=>e.jsxs(u,{gutter:[16,16],style:{margin:"10px 0",padding:"10px",backgroundColor:"#1e1e2f",borderRadius:"8px",alignItems:"center"},children:[e.jsx(l,{span:10,style:{textAlign:"left",color:"#fff"},children:e.jsx("span",{style:{fontSize:"1rem",fontWeight:"bold"},children:`${t}: ${o.cantidad}`})}),e.jsx(l,{span:8,children:e.jsx(a.Item,{style:{margin:0},children:e.jsx(m,{value:o.precio,onChange:r=>{const s=parseFloat(r.target.value)||0;p(i=>({...i,[t]:{...i[t],precio:s}}))},style:{borderRadius:"5px",textAlign:"center",fontWeight:"bold"}})})}),e.jsx(l,{span:6,children:e.jsx(C,{type:"primary",danger:!0,onClick:()=>v(t),style:{width:"100%",fontWeight:"bold",borderRadius:"5px"},children:"X"})})]},t))})}),e.jsx(f,{style:{margin:"15px 0"}}),e.jsxs(l,{span:24,style:{fontSize:"0.9rem",color:"#555",display:"flex",justifyContent:"space-between",padding:"10px",backgroundColor:"#f7f7f7",borderRadius:"8px",fontWeight:"bold"},children:[e.jsxs(c,{children:["Cantidad Total: ",I]}),e.jsxs(c,{children:["Total Bruto: ",h]}),e.jsxs(c,{children:["IGV Total: ",y]}),e.jsxs(c,{children:["Total Neto: ",T]})]})]})}),e.jsx(l,{span:1,children:e.jsx(f,{type:"vertical",style:{height:"100%",borderColor:"#e0e0e0"}})}),e.jsxs(l,{span:7,children:[e.jsxs(R,{size:"small",title:e.jsx(g,{level:4,style:{color:"white",textAlign:"center"},children:"Datos del Cliente"}),bordered:!1,children:[x==="boleta"?e.jsx(a.Item,{label:"DNI del Cliente",children:e.jsx(m,{maxLength:8})}):e.jsx(a.Item,{label:"RUC del Cliente",children:e.jsx(m,{maxLength:11})}),e.jsx(a.Item,{label:"Nombre del Cliente",children:e.jsx(m,{})}),e.jsx(a.Item,{label:"Tipo de Pago",children:e.jsx(B,{defaultValue:"1",options:[{value:"1",label:"Efectivo"},{value:"2",label:"Yape/Plin"},{value:"3",label:"Transferencia"}]})})]}),Object.keys(d).length>=1&&e.jsx("div",{style:{marginTop:"10px"},children:e.jsx(C,{type:"primary",block:!0,children:x==="boleta"?"Imprimir Boleta":"Imprimir Factura"})})]})]})})]})};export{Q as default};
