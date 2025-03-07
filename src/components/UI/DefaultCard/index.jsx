import { Card, List, Typography, Image, Divider, Row, Col } from "antd";
import { useState } from "react";
const { Paragraph } = Typography;

const DefaultCard = ({ title, image, list, loading, children }) => {
  const [error, setError] = useState(false);

  return (
    <Card
      style={{ textAlign: "center" }}
      title={title || "Detalles"}
      loading={loading}
      {...image && {
        cover: (
          <Image
            height="300px"
            src={error ? "./img/usuarios/0.jpg" : image}
            onError={() => setError(true)}
          />
        ),
      }}
    >
      {/* Lista de detalles del trabajador */}
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "20px" }}>
              <strong>{item.title}:</strong>
              <Paragraph copyable>{item.value}</Paragraph>
            </div>
          </List.Item>
        )}
      />
      <Divider />
      {/* Botón para obtener el reporte del usuario */}
      <Row justify="center" align="middle">
        <Col>
            {children}
        </Col>
      </Row>
    </Card>
  );
};

export default DefaultCard;
