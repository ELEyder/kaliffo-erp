import{r as n,j as a,B as x,F as y,D as b,c as E}from"./index-Bunp8VmX.js";import{D as F,a as S}from"./index-AKhf147z.js";import{A as g}from"./ApiClient-CwTlTqVt.js";import{u as T}from"./useTrabajador-CG2NXYvR.js";import{u as w}from"./useReporte-R8BIfgOV.js";import{D as H}from"./Table-azPtpNCw.js";import{T as I}from"./index-1LFFKiN5.js";import{u as D}from"./useApiRequest-GF_nNgjO.js";import{P as h}from"./index-BYkL8nB6.js";import{u as j,A as k}from"./AddIncidenciaModal-CYqPXxuC.js";import{D as P}from"./index-DGSKjoIJ.js";import{F as _}from"./index-qnTMOKQ7.js";import{F as A}from"./index-BJT4Palo.js";import{D as C}from"./index-B_8r9Za8.js";import{T as R}from"./index-B00MmLCC.js";import"./index-BD1DMr01.js";import"./Skeleton-DQ75DhjH.js";import"./index-BkpqA939.js";import"./useBreakpoint-RvYD15SG.js";import"./index-DokvF9RQ.js";import"./styleChecker-BYYi54FN.js";import"./index-CWZRQiGq.js";import"./Dropdown-CAg5ab4S.js";import"./gapSize-U1swVQyS.js";import"./scrollTo-CK3_7m1G.js";import"./ActionButton-DynUVMgy.js";import"./index-DCZRlB0p.js";const M=e=>{const{handleRequest:o,loading:t,error:c}=D(e);return{loading:t,error:c,deleteHorario:async i=>{await o(async()=>{await g.delete(`/asistencia/delete/${i}`)},"Horario eliminado")}}},O=e=>{const[o,t]=n.useState([]),[c,s]=n.useState(!1),[i,d]=n.useState(null),l=async()=>{if(e){s(!0);try{const r=await g.get(`/asistencia?usuario_id=${e}`);t(r.data),d(i)}finally{s(!1)}}};return n.useEffect(()=>{(async()=>{await l()})()},[tipo]),{horarios:o,loading:c,error:i,getHorarios:l}},v=e=>{const[o,t]=n.useState([]),[c,s]=n.useState(!1),[i,d]=n.useState(null),l=async()=>{if(e){s(!0);try{const r=await g.get(`/incidencia?trabajador_id=${e}`);t(r.data)}catch(r){d(r)}finally{s(!1)}}};return n.useEffect(()=>{(async()=>{await l()})()},[e]),{incidencias:o,loading:c,error:i,getIncidencias:l}},N=e=>{const[o,t]=n.useState([]),[c,s]=n.useState(!1),[i,d]=n.useState(null),l=["Pagado","En Proceso"],r=async()=>{if(e){s(!0);try{const m=await g.get(`/pago/${e}`);t(m.data.map(u=>({...u,estado:l[u.estado]}))),d(i)}finally{s(!1)}}};return n.useEffect(()=>{(async()=>{await r()})()},[tipo]),{pagos:o,loading:c,error:i,getPagos:r}},B=({id:e})=>{const{horarios:o,getHorarios:t}=O(e),{deleteHorario:c}=M(t),s=[{title:"Fecha",dataIndex:"fecha"},{title:"Hora de Ingreso",dataIndex:"hora_entrada"},{title:"Hora de Salida",dataIndex:"hora_salida"},{title:"Horas Trabajadas",dataIndex:"horas_trabajadas"},{title:"Opciones",dataIndex:"horario_id",render:i=>a.jsx(h,{title:"ELIMINAR",description:"¿Desea eliminar el horario?",okText:"Confirmar",onConfirm:async()=>{await c(i)},children:a.jsx(x,{block:!0,type:"primary",danger:!0,children:"Eliminar"})})}];return a.jsx(a.Fragment,{children:a.jsx(I,{columnas:s,rowKey:"horario_id",dataSource:o})})},L=({openModal:e,closeModal:o,data:t,onUpdated:c})=>{const[s]=y.useForm(),{updateIncidencia:i}=j(c);n.useEffect(()=>{s.setFieldsValue({tipo:t.tipo,descripcion:t.descripcion})},[e]);const d=[{type:"select",label:"Tipo de Incidencia",name:"tipo",options:[{label:"Familiar",value:1},{label:"Salud",value:2},{label:"Personal",value:3}]},{type:"text",label:"Descripcion",name:"descripcion"}],l=async r=>{await i(t.incidencia_id,r),o(!1)};return a.jsx(P,{title:"Actualizar Incidencia",isOpen:e,onClose:o,onOk:s.submit,children:a.jsx(b,{form:s,onFinish:l,rows:d})})},$=({id:e})=>{const{incidencias:o,getIncidencias:t}=v(e),{deleteIncidencia:c}=j(t),[s,i]=n.useState({}),[d,l]=n.useState({addI:!1,updI:!1}),r=(u,f)=>{l(p=>({...p,[u]:f}))};let m=[{title:"N°",dataIndex:"id",render:(u,f,p)=>p+1},{title:"Incidencia",dataIndex:"tipo"},{title:"Descripción",dataIndex:"descripcion"},{title:"Fecha",dataIndex:"fecha"},{title:"Opciones",render:u=>a.jsxs(A,{gap:"small",justify:"center",align:"middle",wrap:"wrap",children:[a.jsx(x,{type:"primary",block:!0,onClick:()=>{i(u),r("updI",!0)},children:"Editar"}),a.jsx(h,{title:"¿Estás seguro de que deseas eliminar esta incidencia?",okText:"Confirmar",cancelText:"Cancelar",onConfirm:async()=>{await c(u.incidencia_id)},children:a.jsx(x,{block:!0,style:{background:"#f54242",color:"white"},danger:!0,children:"Eliminar"})})]})}];return a.jsxs(a.Fragment,{children:[a.jsx(I,{columnas:m,rowKey:"incidencia_id",dataSource:o}),a.jsx(_,{onClick:()=>r("addI",!0)}),a.jsx(k,{openModal:d.addI,closeModal:()=>r("addI",!1),id:e,onAdded:t}),a.jsx(L,{openModal:d.updI,closeModal:()=>r("updI",!1),data:s,onUpdated:t})]})},U=({id:e})=>{const{pagos:o}=N(e);let t=[{title:"Monto Pagado",dataIndex:"montoPagado"},{title:"Monto Faltante",dataIndex:"montoFaltante"},{title:"Fecha",dataIndex:"fecha"},{title:"Estado",dataIndex:"estado"}];return a.jsx(a.Fragment,{children:a.jsx(I,{columnas:t,rowKey:"pago_id",dataSource:o})})},q=[{key:"1",label:"Histórico"},{key:"2",label:"Último Mes"}],K=({id:e})=>{const{trabajador:o,getTrabajador:t}=T(),{getReporteTrabajador:c}=w();n.useEffect(()=>{t(e)},[e]);const s=f=>({key:p})=>c(f,p),{nombres:i,dni:d,telefono:l,total_horas_trabajadas:r,total_incidencias:m,sueldo:u}=o;return a.jsx(F,{title:i,image:`./img/usuarios/${e}.jpg`,list:[{title:"DNI",value:d},{title:"TELÉFONO",value:l},{title:"HORAS TRABAJADAS",value:r},{title:"NUM. INCIDENCIAS",value:m},{title:"SALARIO",value:`S/ ${u||0}`}],children:a.jsx(H.Button,{menu:{items:q,onClick:s(e)},block:!0,size:"large",style:{fontWeight:"bold"},children:"OBTENER REPORTE"})})},he=()=>{const{id:e}=E(),o=[{key:"Incidencias",label:"Incidencias",children:a.jsx($,{id:e})},{key:"Horario",label:"Horario",children:a.jsx(B,{id:e})},{key:"Pagos",label:"Pagos",children:a.jsx(U,{id:e})}];return a.jsxs(a.Fragment,{children:[a.jsx(C,{children:"Detalles del Usuario"}),a.jsxs(S,{children:[a.jsx(K,{id:e}),a.jsx(R,{items:o})]})]})};export{he as default};
