import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Modal, Button, Card, InputNumber, Select } from "antd";

import { getChangeCorte, changeStatusCorte } from "@AP/Corte";
import { getUsuarios } from "@AA/Usuario";

const AddTaller = ({ openModal, closeModal }) => {
  const [form] = Form.useForm(); // Instancia creada correctamente
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [talleres, setTalleres] = useState([]);

  useEffect(() => {
    getUsuarios("talleres", setTalleres);
    getChangeCorte(id, setData, form);
  }, [id]);

  return (
    <>
      <Modal
        forceRender
        getContainer={false}
        title="Formulario Dinámico"
        open={openModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form} // Asegúrate de que la instancia se pasa aquí
          name="addTaller"
          style={{ maxWidth: 600, display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <Form.List name="items">
            {(fields) => (
              <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                {data.map((field, index) => (
                  <Card size="small" title={`Corte ${field.corte_id}`} key={index}>
                    <Form.Item label="corte_id" name={[index, "corte_id"]}>
                      <InputNumber max={field.corte_id} />
                    </Form.Item>
                    <Form.Item label="taller" name={[index, "taller"]}>
                      <Select placeholder="Seleccione el taller">
                        {talleres.map((taller) => (
                          <Select.Option key={taller.usuario_id} value={taller.usuario_id}>
                            {`${taller.nombre} ${taller.ap_paterno} ${taller.ap_materno}`}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Card>
                ))}
              </div>
            )}
          </Form.List>

          <Form.Item>
            <Button
              onClick={async () => {
                const values = form.getFieldsValue().items;
                await changeStatusCorte(id, values);
                form.resetFields();
                closeModal();
              }}
              type="primary"
            >
              Crear
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTaller;
