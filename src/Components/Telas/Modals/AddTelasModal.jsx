import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Card, Form, Input, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getProductosNuevos, addProductoDetalle } from "../../../Shared/api/Producto";
import FormItem from "antd/es/form/FormItem";
import { getTiposTela } from "../../../Shared/api/Tela";

const { Option } = Select;

const AddTelasModal = ({
  openModal,
  closeModal,
  reload
}) => {
  
  const [form] = Form.useForm();
  const [productos, setProductos] = useState([])
  const [tiposTela, setTiposTela] = useState([]);

  useEffect(()=> {
    getTiposTela(setTiposTela)
  }, [reload])

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
                <Form.Item label="Tipo de Tela" name={[field.name, 'producto_id']} rules={[
                    {
                      required: true,
                      message: "Tipo requerido",
                    },
                  ]}>
                  <Select>
                    {
                      tiposTela.map(tipo =>{
                        return (
                          <Option key={tipo.id} value={tipo.id}>{tipo.nombre}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item
                  name={[field.name, 'metraje']}
                  label="Metraje"
                  rules={[
                    {
                      required: true,
                      message: "Metraje requerido",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[field.name, 'articulo']}
                  label="Artículo"
                  rules={[
                    {
                      required: true,
                      message: "Artículo requerido",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[field.name, 'empresa']}
                  label="Empresa de Compra"
                  rules={[
                    {
                      required: true,
                      message: "Empresa requerida",
                    },
                  ]}
                >
                  <Input />
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

      <FormItem>
        <Button onClick={ async ()=> {
          const values = form.getFieldsValue().items
          console.log(values)
          await addProductoDetalle(values)
          getProductosNuevos(setProductos)
          form.resetFields()
          reload()
          closeModal()
        }} type="primary">Crear</Button>
      </FormItem>
    </Form>
      </Modal>
    </>
  );
};

export default AddTelasModal;
