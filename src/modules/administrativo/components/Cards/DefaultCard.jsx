import { Card, List, Typography, Image, Divider, Row, Col } from "antd";
const { Paragraph } = Typography;

const DefaultCard = ({ title, image, list, children }) => {

  return (
    <Card
      style={{ textAlign: "center" }}
      title={title || "Detalles"} // Título de la tarjeta
      {...image && {
        cover: (
          <Image
            width="300px"
            src={image}
            fallback="./img/usuarios/0.jpg"
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
