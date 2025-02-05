import{r as d,j as e,e as I}from"./index-DnZSuapv.js";import{a as S}from"./apiClient-DNqqoRi2.js";import{F as V}from"./Table-UylViyS0.js";import{F as c}from"./index-eEjfzd7p.js";import{M as D}from"./index-CQoRxuqN.js";import{C as P}from"./index-BLOaBrrf.js";import{R as f,C as m}from"./row-Bgu54Vpq.js";import{L as j}from"./index-BCdAvJOG.js";import{D as w}from"./index-DnZuPcqL.js";import{p as g,o as b,a as T,b as k,c as C,d as E,e as $}from"./Tools-BXmtYGau.js";import{a as K}from"./Usuario-BLIord41.js";import{g as _}from"./Tienda-DchRzPO6.js";import{I as h}from"./index-CfhjOVlK.js";import{D as L}from"./index-CuAlWmBO.js";import{S as Y}from"./index-CAw0ik1A.js";import"./useMergedState-xnIRtK6W.js";import"./useSize-DL9WfM8p.js";import"./styleChecker-BPMTEHVB.js";import"./EllipsisOutlined-BC2kcC9O.js";import"./addEventListener-BGVn8IVC.js";import"./DownOutlined-DfCZxesi.js";import"./index-nq-gG-E2.js";import"./button-DxAvYtf7.js";import"./ContextIsolator-X51Zuf7C.js";import"./LeftOutlined-DUJeaJ5E.js";import"./index-OoAlQgr1.js";import"./responsiveObserver-P31G7zPC.js";import"./index-8gkIUhhz.js";import"./index-BsZC5oSy.js";import"./gapSize-U1swVQyS.js";import"./scrollTo-DvbmuEp_.js";import"./useBreakpoint-CHVb293n.js";import"./TextArea-D6coABml.js";import"./ActionButton-HZPJWirw.js";import"./Skeleton-C8RXkADb.js";import"./index-rbW2pF-2.js";import"./moment-64TmN0UP.js";import"./EyeOutlined-Dgph3YEA.js";import"./CheckOutlined-CxFn5oU1.js";const v=["Efectivo","Yape","Transferencia"],N=["Por Mayor","Por Menor"],M=["Almacen","Tienda 1","Tienda 2"],R=async(r,s)=>{try{const{data:a}=await S.get("/venta");let l=0;const o=a.map(i=>{l+=1;const t=new Date(i.fecha);return{...i,tipoPago:v[i.tipoPago-1],tipoVenta:N[i.tipoVenta-1],tienda:M[i.tienda_id-1],fecha:t.toLocaleDateString("es-ES"),id:l}});s(o)}catch(a){console.error("Error al obtener las ventas:",a),s([])}},q=async(r,s)=>{try{const{data:a,status:l}=await S.get(`/venta/${r}`);let o=0;const i=a.detalles.map(t=>{o+=1;const x=new Date(t.fecha);return{...t,tipoPago:v[t.tipoPago-1],precioTotal:t.cantidad*t.precioUnitario,tipoVenta:N[t.tipoVenta-1],fecha:x.toLocaleDateString("es-ES"),id:o}});a.tienda=M[a.tienda_id-1],a.tipoPago=v[a.tipoPago-1],a.detalles=i,s(l!=500?a:[])}catch(a){console.error(`Error al obtener la venta con ID ${r}:`,a),s([])}},B=({id:r,data:s})=>{var i;const[a,l]=d.useState([]);d.useEffect(()=>{q(r,l)},[r]);const o=[{title:"Nombre",dataIndex:"nombre",key:"nombre",align:"center"},{title:"Código",dataIndex:"codigo",key:"codigo",align:"center"},{title:"Cantidad",dataIndex:"cantidad",key:"cantidad",align:"center"},{title:"Precio Unitario",dataIndex:"precioUnitario",key:"precioUnitario",align:"center",render:t=>`S/${t}`},{title:"Precio Total",dataIndex:"precioTotal",key:"precioTotal",align:"center",render:t=>`S/${t}`},{title:"IGV",dataIndex:"igv",key:"igv",align:"center"},{title:"Neto",dataIndex:"precioNeto",key:"precioNeto",align:"center",render:t=>`S/${t}`}];return e.jsx(e.Fragment,{children:e.jsx(V,{scroll:{x:"min-content"},columns:o,dataSource:(i=a==null?void 0:a.detalles)==null?void 0:i.map((t,x)=>({...t,key:x})),rowKey:t=>t.id,bordered:!0})})},O=({openModal:r,closeModal:s,id:a})=>{const{tipoVenta:l}=I();c.useForm();const[o,i]=d.useState(["detalles"]);return d.useEffect(()=>{q(a,i)},[a]),e.jsx(D,{forceRender:!0,getContainer:!1,title:`${l} ${a}`,open:r,onCancel:s,style:{textTransform:"uppercase"},okText:"Aceptar",cancelText:"Cerrar",onOk:s,centered:!0,width:"800px",children:e.jsxs(P,{style:{textAlign:"center",margin:"auto"},children:[e.jsxs(f,{gutter:24,style:{marginTop:"16px"},children:[e.jsx(m,{span:12,style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(P,{style:{width:"100%"},children:e.jsx(j,{itemLayout:"horizontal",dataSource:[{title:o.tienda,value:o.codigo},{title:"RUC",value:o.ruc},{title:o.tipoPago,value:`S/${o.totalNeto}`}],renderItem:t=>e.jsxs(j.Item,{children:[e.jsx("b",{children:t.title}),e.jsx("span",{style:{float:"right"},children:t.value})]})})})}),e.jsx(m,{span:12,children:e.jsx(P,{style:{textAlign:"center",margin:"auto"},children:e.jsx(j,{itemLayout:"horizontal",dataSource:[{title:"Cantidad",value:"Sin Datos"},{title:"Total Bruto",value:`S/${o.totalBruto}`},{title:"IGV",value:`S/${o.totalIgv}`},{title:"Total Neto",value:`S/${o.totalNeto}`}],renderItem:t=>e.jsxs(j.Item,{children:[e.jsx("b",{children:t.title}),e.jsx("span",{style:{float:"right"},children:t.value})]})})})})]}),e.jsx(f,{children:e.jsxs(m,{span:24,children:[e.jsx(w,{}),e.jsx(B,{id:a})," "]})})]})})},U=({openModal:r,closeModal:s,tipoTrabajador:a,reload:l,setReload:o})=>{const{tipoVenta:i}=I(),[t]=c.useForm(),[x,y]=d.useState([]);return d.useEffect(()=>{a==="ventas"&&_(y)},[a,t]),e.jsx(D,{forceRender:!0,getContainer:!1,title:`Añadir nueva ${i}`,open:r,onCancel:()=>s(!1),style:{textTransform:"uppercase"},okText:"Añadir",onOk:t.submit,centered:!0,width:500,children:e.jsxs(c,{autoComplete:"off",style:{maxWidth:500,margin:"0 auto"},size:"large",form:t,layout:"vertical",labelAlign:"center",id:"formulariocrear",onFinish:async u=>{await K(a,u),o(!l),s(!1),t.resetFields()},children:[e.jsx(c.Item,{style:{marginTop:20},name:"nombre",label:"Nombres",rules:[{required:!0,message:"Nombres requeridos"}],children:e.jsx(h,{onPaste:g,onKeyDown:b,onInput:T})}),e.jsxs(f,{gutter:[16,16],children:[e.jsx(m,{span:12,children:e.jsx(c.Item,{name:"ap_paterno",label:"Apellido Paterno",rules:[{required:!0,message:"Apellido Paterno requerido"}],children:e.jsx(h,{onPaste:g,onKeyDown:b,onInput:T})})}),e.jsx(m,{span:12,children:e.jsx(c.Item,{name:"ap_materno",label:"Apellido Materno",rules:[{required:!0,message:"Apellido Materno requerido"}],children:e.jsx(h,{onPaste:g,onKeyDown:b,onInput:T})})})]}),e.jsxs(f,{gutter:[16,16],children:[e.jsx(m,{span:12,children:e.jsx(c.Item,{label:"Fecha Nacimiento",name:"fecha_nacimiento",rules:[{required:!0,message:"Fecha de nacimiento requerida"}],children:e.jsx(L,{placeholder:"YYYY-MM-DD",format:"YYYY-MM-DD"})})}),e.jsx(m,{span:12,children:e.jsx(c.Item,{name:"telefono",label:"Teléfono",rules:[{required:!0,message:"Teléfono requerido"}],children:e.jsx(h,{showCount:!0,maxLength:9,onPaste:g,onKeyDown:k,onInput:C})})})]}),e.jsxs(f,{gutter:[16,16],children:[e.jsx(m,{span:12,children:e.jsx(c.Item,{name:"dni",label:"DNI",rules:[{required:!0,message:"DNI requerido"}],children:e.jsx(h,{showCount:!0,maxLength:8,onPaste:g,onKeyDown:k,onInput:C})})}),e.jsx(m,{span:12,children:e.jsx(c.Item,{name:"sueldo",label:"Sueldo",rules:[{required:!0,message:"Sueldo requerido"}],children:e.jsx(h,{onPaste:g,onKeyDown:E,onInput:$})})})]}),a==="ventas"&&e.jsx(c.Item,{name:"tienda_id",label:"Tienda Asignada",rules:[{required:!0,message:"Tienda requerida"}],children:e.jsx(Y,{options:x.map(u=>({value:u.tienda_id,label:u.tienda,key:u.tienda_id}))})})]})})},z=()=>{const{tipo:r}=I(),[s,a]=d.useState(1),[l,o]=d.useState([]),[i,t]=d.useState(!1),[x,y]=d.useState(!1),[u,A]=d.useState(!1);d.useEffect(()=>{R(r,o)},[r,u]);const F=[{title:"Nº",dataIndex:"id",key:"id",align:"center"},{title:"Código",dataIndex:"codigo",key:"codigo",align:"center"},{title:"Tipo de Venta",dataIndex:"tipoVenta",key:"tipoVenta",align:"center",sorter:{compare:(n,p)=>n.tipoVenta.localeCompare(p.tipoVenta),multiple:2}},{title:"Fecha de Venta",dataIndex:"fecha",key:"fecha",align:"center"},{title:"Cantidad",dataIndex:"cantidad",key:"cantidad",align:"center",sorter:{compare:(n,p)=>n.cantidad.localeCompare(p.cantidad),multiple:2}},{title:"Total Bruto",dataIndex:"totalBruto",key:"totalBruto",align:"center"},{title:"Total Neto",dataIndex:"totalNeto",key:"totalNeto",align:"center",sorter:{compare:(n,p)=>n.totalNeto.localeCompare(p.totalNeto),multiple:2}},{title:"IGV",dataIndex:"totalIgv",key:"totalIgv",align:"center"},{title:"Tipo de Pago",dataIndex:"tipoPago",key:"tipoPago",align:"center",onCell:n=>({style:{background:n.tipoPago==="Efectivo"?"#248304":n.tipoPago==="Yape"?"#8522a3":"#6fceea",color:n.tipoPago==="Transferencia"?"black":"white"}}),sorter:{compare:(n,p)=>n.tipoPago.localeCompare(p.tipoPago),multiple:2}},{title:"RUC",dataIndex:"ruc",key:"ruc",align:"center"},{title:"Tienda",dataIndex:"tienda",key:"tienda",align:"center"}];return e.jsxs(e.Fragment,{children:[e.jsx(V,{scroll:{x:"min-content"},columns:F,pagination:{pageSize:7},dataSource:l.map((n,p)=>({...n,key:p})),rowKey:n=>n.id,bordered:!0,className:"tabla_trabajadores",onRow:n=>({onClick:()=>{a(n.id),y(!0)},style:{cursor:"pointer"}})}),e.jsx(U,{openModal:i,closeModal:()=>t(!1),tipoTrabajador:r,reload:u,setReload:A}),e.jsx(O,{openModal:x,closeModal:()=>y(!1),id:s})]})},Me=()=>{const{tipo:r}=I();return e.jsxs(e.Fragment,{children:[e.jsxs(w,{style:{textTransform:"uppercase"},children:[" ",r," "]}),e.jsx(z,{})]})};export{Me as default};
