import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Modal,
  Button,
  Card,
  Select,
  Divider,
  Input,
  Row,
  Col,
} from "antd";

import { getAddTaller, changeStatusCorte } from "@AP/Corte";
import { getUsuarios } from "@AA/Usuario";

const AddTaller = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [talleres, setTalleres] = useState([]);

  // Efecto para cargar datos iniciales
  useEffect(() => {
    getUsuarios("talleres", setTalleres);
    getAddTaller(id, setData, form);
  }, [id, reload]);

  // Estilos reutilizables
  const cardHeaderStyle = { textAlign: "center" };
  const columnStyle = { textAlign: "center" };

  // Handler para guardar los datos
  const handleSave = async () => {
    try {
      const values = form.getFieldsValue().items;
      console.log("Taller Añadido:", values);

      await changeStatusCorte(id, values);
      form.resetFields();
      reload();
      closeModal();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <Modal
      forceRender
      getContainer={false}
      title="ASIGNAR TALLER AL CORTE"
      open={openModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="addTaller"
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
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {data?.map((field, index) => (
                <Card
                  key={index}
                  size="small"
                  title={`Corte ${field.corte_id}`}
                  style={cardHeaderStyle}
                >
                  <Row justify="center">
                    <Col span={24} style={columnStyle}>
                      {field.datos_corte}
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Taller"
                        name={[index, "taller_id"]}
                        rules={[{ required: true, message: "Seleccione un taller" }]}
                      >
                        <Select placeholder="Seleccione el taller">
                          {talleres.map((taller) => (
                            <Select.Option
                              key={taller.usuario_id}
                              value={taller.usuario_id}
                            >
                              {`${taller.nombre} ${taller.ap_paterno} ${taller.ap_materno}`}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Input
                    type="hidden"
                    name={[index, "corte_id"]}
                    value={field.corte_id}
                  />
                </Card>
              ))}
            </div>
          )}
        </Form.List>

        <Divider />

        <Form.Item>
          <Button type="primary" onClick={handleSave}>
            Crear
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaller;
