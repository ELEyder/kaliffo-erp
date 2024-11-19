import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Modal, Button, Card, InputNumber, Select } from "antd";

import { getAddTaller, changeStatusCorte } from "@AP/Corte";
import { getUsuarios } from "@AA/Usuario";

const AddTaller = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [talleres, setTalleres] = useState([]);

  useEffect(() => {
    getUsuarios("talleres", setTalleres);
    getAddTaller(id, setData, form);
  }, [reload]);

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
          form={form}
          name="addTaller"
          style={{ maxWidth: 600, display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
          <Form.List name="items">
            {(fields) => (
              <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
                {data?.map((field, index) => (
                  <Card size="small" title={`Corte ${field.corte_id}`} key={index}>
                    <Form.Item label="corte_id" name={[index, "corte_id"]}>
                      <InputNumber max={field.corte_id} />
                    </Form.Item>
                    <Form.Item label="Taller" name={[index, "taller_id"]}>
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
                console.log("Taler Añadido:", values)
                await changeStatusCorte(id, values);
                form.resetFields();
                reload();
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
