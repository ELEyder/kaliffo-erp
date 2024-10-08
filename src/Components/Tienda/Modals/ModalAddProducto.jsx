import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Card, Form, Input, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getColoresProductos, getProductosNuevos, addProductoDetalle } from "../../../Shared/api/Producto";
import FormItem from "antd/es/form/FormItem";

const { Option } = Select;

const ModalAddProducto = ({
  openModal,
  closeModal,
  id,
  reload
}) => {
  
  const [form] = Form.useForm();
  const [productos, setProductos] = useState([])
  const [colores, setColores] = useState({});

  useEffect(()=> {
    getProductosNuevos(id, setProductos)
  }, [id])

  const addColor = async (value) => {
    await getColoresProductos(value, setColores);
    console.log("Los colores son")
    console.log(JSON.stringify(colores, null, 2))
  }
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
                <Form.Item label="Producto" name={[field.name, 'producto_id']}>
                  <Select onChange={addColor}>
                    {
                      productos.map(producto =>{
                        return (
                          <Option key={producto.producto_id} value={producto.producto_id}>{producto.nombre}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>

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

      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}

      <FormItem>
        <Button onClick={ async ()=> {
          const values = form.getFieldsValue().items
          console.log(values)
          await addProductoDetalle(id, values)
          reload()
          closeModal()
        }} type="primary">Crear</Button>
      </FormItem>
    </Form>
      </Modal>
    </>
  );
};

export default ModalAddProducto;
