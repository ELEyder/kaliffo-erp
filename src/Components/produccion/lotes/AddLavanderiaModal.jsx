import React, { useState, useEffect } from "react";
import {
  Form,
  Modal,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Flex,
} from "antd";
import { getCorte } from "@AP/Corte";
import { getColores } from "@AA/Color";
import { addLavanderia } from "@AP/Lavanderia";
import { useParams } from "react-router-dom";

const AddLavanderiaModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [cortes, setCortes] = useState([]);
  const [colores, setColores] = useState([]);
  const [maxValues, setMaxValues] = useState({}); // Estado para valores máximos dinámicos

  useEffect(() => {
    getCorte(id, setCortes);
    getColores(setColores);
  }, [id]);

  const handleCorteChange = (fieldKey, corteId) => {
    const corte = cortes.find((c) => c.corte_id === corteId);
    if (corte) {
      setMaxValues((prev) => ({
        ...prev,
        [fieldKey]: corte.cantidad_restante || 0,
      }));
      // Establecer el valor máximo en el campo de talla
      form.setFieldsValue({
        detalles: form
          .getFieldValue("detalles")
          .map((detalle, index) =>
            index === fieldKey ? { ...detalle, talla: corte.talla } : detalle
          ),
      });
    }
  };

  return (
    <Modal
      title="Nueva Lavandería"
      open={openModal}
      styles={{header:{textAlign:"center"}}}
      onCancel={() => closeModal(false)}
      onOk={form.submit}
      okText="Añadir"
      centered
      width={550}
    >
      <Form
        form={form}
        layout="vertical"
        size="large"
        labelAlign="left"
        onFinish={async (values) => {
          await addLavanderia(id, values);
          form.resetFields();
          reload();
          closeModal(false);
        }}
      >
        <Form.List name="detalles">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field}>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "corte_id"]}
                        label="Corte"
                        rules={[
                          { required: true, message: "Seleccione un corte" },
                        ]}
                      >
                        <Select
                          placeholder="Selecciona la prenda - talla"
                          onChange={(value) =>
                            handleCorteChange(field.name, value)
                          }
                        >
                          {cortes.map((corte) => (
                            <Select.Option
                              key={corte.corte_id}
                              value={corte.corte_id}
                            >
                              {corte.producto} - {corte.talla}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "color_id"]}
                        label="Color"
                        rules={[
                          { required: true, message: "Seleccione un color" },
                        ]}
                      >
                        <Select placeholder="Selecciona el color">
                          {colores.map((color) => (
                            <Select.Option
                              key={color.nombre}
                              value={color.color_id}
                            >
                              {color.nombre}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "cantidad_enviada"]}
                        label="cantidad"
                        rules={[
                          {
                            required: true,
                            message: "Ingrese la cantidad enviada",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (value > 0) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "La cantidad enviada debe ser mayor a 0"
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <InputNumber
                        style={{width:"100%"}}
                          min={0}
                          max={maxValues[field.name] || 0}
                          placeholder={`Máx: ${maxValues[field.name] || "-"}`}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "precio_unidad"]}
                        label="Precio"
                        rules={[
                          {
                            required: true,
                            message: "Ingrese el precio por unidad",
                          },
                        ]}
                      >
                        <InputNumber style={{width:"100%"}} min={0} placeholder="Precio" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        name={[field.name, "lavanderia_asignada"]}
                        label="Lavandería"
                        rules={[
                          {
                            required: true,
                            message: "Ingrese la lavandería asignada",
                          },
                        ]}
                      >
                        <Input placeholder="Lavandería Asignada" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button
                    type="danger"
                    style={{background:"red",marginBottom:"10px"}}
                    onClick={() => remove(field.name)}
                    block
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Agregar Detalle
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddLavanderiaModal;
