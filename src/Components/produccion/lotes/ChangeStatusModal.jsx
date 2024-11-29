import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Modal,
  Button,
  Card,
  InputNumber,
  Input,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";

import { getChangeCorte, changeStatusCorte } from "@AP/Corte";
import { getChangeLavanderia, changeStatusLavanderia } from "@AP/Lavanderia";

const ChangeStatusModal = ({ openModal, closeModal, reload, fase }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [faseText, setFaseText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (fase === 1) {
          setFaseText("Corte");
          await getChangeCorte(id, setData, form);
        } else if (fase === 2) {
          setFaseText("Lavandería");
          await getChangeLavanderia(id, setData, form);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, [id, fase, reload]);

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue().items;
      console.log("Values:", values);

      if (fase === 1) {
        await changeStatusCorte(id, values);
      } else if (fase === 2) {
        await changeStatusLavanderia(id, values);
      }

      form.resetFields();
      reload();
      closeModal();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Constantes de estilos
  const cardTitleStyle = { textAlign: "center"};
  const columnCenterStyle = { textAlign: "center" };

  return (
    <Modal
      forceRender
      getContainer={false}
      styles={{header:{textAlign:"center"}}}
      title="MERCADERÍA RECIBIDA"
      open={openModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="addProductos"
        style={{
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off"
      >
        <Form.List name="items">
          {() => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 20,
              }}
            >
              {data.map((field, index) => (
                <Card
                  key={index}
                  size="small"
                  title={`${faseText} ${index + 1}`}
                  style={cardTitleStyle}
                >
                  <Row justify="center">
                    <Col span={24} style={columnCenterStyle}>
                      {field.detallesCorte}
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Cantidad Recibida"
                        name={[index, "cantidad_recibida"]}
                        rules={[
                          {
                            required: true,
                            message: "Ingrese una cantidad válida",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          max={field.cantidad_recibida}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Input type="hidden" name={[index, "id"]} />
                </Card>
              ))}
            </div>
          )}
        </Form.List>

        <Divider />

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeStatusModal;
