import{u as p,r as e,j as f}from"./index-DnZSuapv.js";import{a as m}from"./apiClient-DNqqoRi2.js";import{F as d}from"./Table-UylViyS0.js";const g=({columnas:s,rowKey:n,url:t=null,reload:i,dataSource:c=null})=>{const u=p(),[l,r]=e.useState(c??[]);return e.useEffect(()=>{if(t){async function a(){try{const o=await m.get(t);r(o.data)}catch{r([])}}a()}},[i]),f.jsx(d,{columns:s,pagination:{pageSize:5},dataSource:l,rowKey:n,onRow:a=>a.trabajador_id?{onClick:()=>u(`/trabajadores/${a.trabajador_id}`),style:{cursor:"pointer"}}:{},scroll:{x:"min-content"}})};export{g as T};
