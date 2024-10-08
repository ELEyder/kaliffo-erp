import React,{useState,useEffect}from "react";
import { useParams } from "react-router-dom";
import { getTiendaById } from "../../../Shared/api/Tienda";
import { Card, List,Button } from "antd";

const InfoTiendaCard = () =>{

  const { id } = useParams();

  const [tienda, setTienda] = useState([]);

  useEffect(() => {
    getTiendaById(id, setTienda);
  }, [id]);


    return(
        <Card
        style={{ maxwidth: 300, margin: "auto", textAlign: "center" }}
      >
        <h3>{tienda.tienda}</h3>
        <p className="text-muted">{tienda.direccion}</p>        
        <p className="text-muted">{tienda.telefono}</p>
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "STOCK TOTAL", value: tienda.total_stock == null ? '0' : `${tienda.total_stock}` },
            { title: "Ventas Totales", value: `12`  },
            { title: "Personal asignado", value: `${tienda.total_usuarios}` },
          ]}
          renderItem={(item) => (
            <List.Item>
              <b>{item.title}</b>
              <a style={{ float: "right" }}>{item.value}</a>
            </List.Item>
          )}
        />
  
        <Button type="primary" block>
          Obtener reporte
        </Button>
      </Card>
    )
}

export default InfoTiendaCard