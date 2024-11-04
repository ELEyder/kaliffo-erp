import { Form, Modal, Select, Input, Button, Card, Typography } from "antd";
import { getCorte } from "../../../../Shared/api/Corte";

import { CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { Option } = Select;

const ChangeStatusModal = ({ openModal, closeModal }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [ lote_id, setId ] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    getCorte(id, setData);
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
          form={form}
          name="addProductos"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >

                {/* Nest Form.List */}
                <Form.Item label="detalle">
                  <Form.List name={[field.name, 'detalle']}>
                    {(subFields, subOpt) => (
                      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'color_id']}>
                            <Select placeholder="Elije un color">
                            {colores[form.getFieldValue().items[field.name].producto_id]?.map(color => (
                              <Select.Option key={color.color_id} value={color.color_id}>
                                {color.nombre}  
                              </Select.Option>
                            )) || <Select.Option disabled>Sin Colores</Select.Option>}
                            </Select>
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'talla']}>
                              <Input placeholder="Talla" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'stock']}>
                              <Input placeholder="Stock" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue().items, null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>

      <Form.Item>
        <Button onClick={ async ()=> {
          const values = form.getFieldsValue().items
          await addProductoDetalle(id, values)
          getProductosNuevos(id, setProductos)
          form.resetFields()
          reload()
          closeModal()
        }} type="primary">Crear</Button>
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};

export default ChangeStatusModal;
