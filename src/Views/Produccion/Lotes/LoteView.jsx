import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col } from "antd";
import CortesTable from "@CP/lotes/CortesTable";
import LavanderiaTable from "@CP/lotes/LavanderiaTable";
import TimeLine from "@CP/lotes/TimeLine";
import Status from "@CP/lotes/Status";
import { getFaseLote } from "@AP/Lote";
import { getStatusCorte } from "@AP/Corte";
import { getStatusLavanderia } from "@AP/Lavanderia";
import { getStatusAcabado } from "@AP/Acabado";
import TallerTable from "../../../Components/produccion/lotes/AcabadoTable";


const Lote = () => {
  const { id } = useParams();
  const [ fase, setFase ] = useState(0);
  const [ faseTimeline,setfaseTimeline ] = useState(0)
  const [ reload, setReload ] = useState(false);
  const [ statusCorte, setStatusCorte ] = useState(0);
  const [ statusLavanderia, setStatusLavanderia ] = useState(0);
  const [ statusAcabado, setStatusAcabado ] = useState(0);
  const [ contenido, setContenido ] = useState(null)
  const [ status, setStatus ] = useState(null)
  
  useEffect(()=> {
    getFaseLote(id, setFase, setfaseTimeline);
    getStatusCorte(id, setStatusCorte)
    getStatusLavanderia(id, setStatusLavanderia)
    getStatusAcabado(id, setStatusAcabado)
  }, [reload])
  
  useEffect(() => {
    if (fase == 1) {
      setContenido(<CortesTable reload={()=>setReload(!reload)} status={statusCorte} />);
      setStatus(<Status fase={fase} status={statusCorte} reload={()=>setReload(!reload)}/>)
    }
    else if (fase == 2) {
      setContenido(<LavanderiaTable  reload={()=>setReload(!reload)} status={statusLavanderia}/>);
      setStatus(<Status fase={fase} status={statusLavanderia} reload={()=>setReload(!reload)}/>)
    }
    else if (fase == 3) {
      setContenido(<TallerTable  reload={()=>setReload(!reload)} status={statusAcabado}/>);
      setStatus(<Status fase={fase} status={statusAcabado} reload={()=>setReload(!reload)}/>)
    }
  }, [reload, id, fase, statusCorte, statusLavanderia, statusAcabado]);



  return (
    <>
      <Divider>DETALLES DEL LOTE</Divider>
      <TimeLine fase={fase} setFase={setFase} faseTimeline={faseTimeline} reload={()=>setReload(!reload)}/>
      <Row>
        <Col span={18}>
          {contenido}
        </Col>
        <Col span={6}>
          {status}
        </Col>
      </Row>
    </>
  )
}

export default Lote