import React, { useState, useEffect } from "react";
import { Form, Modal, Input, InputNumber, Button, Select } from "antd";
import { getCorte } from "@AP/Corte";
import { getColores } from "@AA/Color";
import { getUsuarios } from "@AA/Usuario";
import { useParams } from "react-router-dom";
import { addLavanderia } from "@AP/Lavanderia";

const AddLavanderiaModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [cortes, setCortes] = useState([]);
  const [colores, setColores] = useState([]);
  const [maxValues, setMaxValues] = useState({}); // Estado para los máximos dinámicos

  useEffect(() => {
    getCorte(id, setCortes);
    getColores(setColores);
  }, [id]);

  // Manejar cambios en el corte seleccionado
  const handleCorteChange = (fieldKey, corteId) => {
    const corte = cortes.find((c) => c.corte_id === corteId);
    if (corte) {
        setMaxValues((prev) => ({
          ...prev,
          [fieldKey]: corte.cantidad_restante || 0,
        }));
    }
    else {
      console.log("NO CORTES")
    }
  };

  return (
    <Modal
      title="Nueva Lavandería"
      open={openModal}
      onCancel={() => closeModal(false)}
      onOk={form.submit}
      okText="Añadir"
      centered
      width={600}
      getContainer={false}
    >
      <Form
        form={form}
        layout="vertical"
        size="large"
        labelAlign="center"
        onFinish={async (values) => {
          addLavanderia(id, values)
          form.resetFields();
          reload();
          closeModal(false);
        }}
        style={{ margin: "0 auto" }}
      >
        <Form.List name="detalles">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div
                  key={field.key}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {/* Select para elegir el corte */}
                  <Form.Item
                    name={[field.name, "corte_id"]}
                    label="Corte ID"
                    rules={[
                      { required: true, message: "Corte ID es requerido" },
                    ]}
                  >
                    <Select
                      placeholder="Seleccione corte"
                    >
                      {cortes.map((corte) => (
                        <Select.Option key={corte.corte_id} value={corte.corte_id}>
                          Corte {corte.corte_id}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name={[field.name, "talla"]}
                    label="talla Enviada"
                    rules={[
                      { required: true, message: "talla es requerida" },
                    ]}
                  >
                    <InputNumber
                      min={1}
                    />
                  </Form.Item>

                  {/* Select para elegir el color */}
                  <Form.Item
                    name={[field.name, "color_id"]}
                    label="Color"
                    rules={[
                      { required: true, message: "Color es requerido" },
                    ]}
                  >
                    <Select placeholder="Seleccione el color">
                      {colores.map((color) => (
                        <Select.Option key={color.nombre} value={color.nombre}>
                          {color.nombre}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "precio_unidad"]}
                    label="precio_unidad"
                    rules={[
                      { required: true, message: "precio_unidad es requerida" },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  {/* Input para el nombre de la lavandería */}
                  <Form.Item
                    name={[field.name, "lavanderia_asignada"]}
                    label="lavanderia_asignada"
                    rules={[
                      { required: true, message: "lavanderia_asignada es requerida" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* Botón para eliminar el detalle */}
                  <Button type="danger" onClick={() => remove(field.name)}>
                    Eliminar
                  </Button>
                </div>
              ))}

              {/* Botón para agregar un nuevo detalle */}
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
