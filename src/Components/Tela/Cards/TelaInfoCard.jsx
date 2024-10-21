import { Card, List, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoById } from "../../../Shared/api/Producto";

const TelaInfoCard = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    getProductoById(id, setProducto);
  }, [id]);

  return (
    <>
      {producto && (
        <Card
          style={{ maxWidth: 300, textAlign: "center", margin: "auto" }}
          title={"PREMIUM"}
        >
          <List
            itemLayout="horizontal"
            dataSource={[
              { title: "STOCK TOTAL", value: producto.stockTotal },
            ]}
            renderItem={(item) => (
              <List.Item>
                <b>{item.title}</b>
                <span style={{ float: "right" }}>{item.value}</span>
              </List.Item>
            )}
          />
        </Card>
      )}
    </>
  );
}

export default TelaInfoCard