import React,{useState,useEffect}from "react";
import { useParams } from "react-router-dom";
import { getTiendaById } from "../../API/Tienda";
import { Card, List,Button } from "antd";

const TiendaCard = () =>{

  const { id } = useParams();
  const [tienda, setTienda] = useState([]);

  useEffect(() => {
    getTiendaById(id, setTienda);
  }, [id]);

    return(
        <Card title={tienda.tienda}
        actions={[
          <Button type="primary" block>
          Obtener reporte
        </Button>
        ]}>
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "DIRECCIÓN", value: tienda.direccion == null ? '0' : `${tienda.direccion}` },
            { title: "TELÉFONO", value: tienda.telefono == null ? '0' : `${tienda.telefono}` },
            { title: "STOCK TOTAL", value: tienda.total_stock == null ? '0' : `${tienda.total_stock}` },
            { title: "VENTAS TOTALES", value: tienda.ventas == null ? '0' : `${tienda.ventas}`  },
            { title: "PERSONAL ASIGNADO", value: `${tienda.total_usuarios}` },
          ]}
          renderItem={(item) => (
            <List.Item>
              <b>{item.title}</b>
              <a style={{ float: "right" }}>{item.value}</a>
            </List.Item>
          )}
        />
      </Card>
    )
}

export default TiendaCard