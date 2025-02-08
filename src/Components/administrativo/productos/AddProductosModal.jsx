import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Card, Form, Input, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { getProductosNuevos, addProductoDetalle } from "@AA/Producto"; // Importa funciones para manejar productos
import { getColoresProductos } from '@AA/Color'; // Importa función para obtener colores
import FormItem from "antd/es/form/FormItem";

const { Option } = Select;

const AddProductosModal = ({
  openModal, // Estado de apertura del modal
  closeModal, // Cierra el modal
  id, // ID de referencia
  reload // Función para recargar la lista principal
}) => {
  
  const [form] = Form.useForm(); // Instancia del formulario
  const [productos, setProductos] = useState([]); // Estado para productos disponibles
  const [colores, setColores] = useState({}); // Estado para colores por producto

  useEffect(() => {
    getProductosNuevos(id, setProductos); // Carga productos nuevos al montar o cambiar ID
  }, [id]);

  const addColor = async (value) => {
    await getColoresProductos(value, setColores); // Obtiene colores al seleccionar un producto
  };

  return (
    <>
      <Modal
        forceRender // Fuerza renderizado del modal
        getContainer={false} // Evita que el modal salga del contenedor actual
        title="Formulario Dinámico" // Título del modal
        open={openModal} // Controla visibilidad
        onCancel={closeModal} // Cierra el modal
        footer={null} // Sin pie de modal
      >
        <Form
          labelCol={{ span: 6 }} // Etiquetas alineadas al lado izquierdo
          wrapperCol={{ span: 18 }} // Ajusta los campos
          form={form} // Asocia el formulario
          name="addProductos" // Nombre del formulario
          style={{ maxWidth: 600 }} // Ancho máximo
          autoComplete="off"
          initialValues={{ items: [{}] }} // Inicializa con una lista vacía
        >
          {/* Manejo de lista dinámica de productos */}
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                {fields.map((field) => (
                  <Card
                    size="small" // Tamaño pequeño para cada producto
                    title={`Item ${field.name + 1}`} // Título dinámico
                    key={field.key}
                    extra={
                      <CloseOutlined onClick={() => remove(field.name)} /> // Remueve el item
                    }
                  >
                    <Form.Item label="Producto" name={[field.name, 'producto_id']}>
                      <Select onChange={addColor}>
                        {productos.map((producto) => (
                          <Option key={producto.producto_id} value={producto.producto_id}>
                            {producto.nombre}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {/* Sublista dinámica para detalles */}
                    <Form.Item label="detalle">
                      <Form.List name={[field.name, 'detalle']}>
                        {(subFields, subOpt) => (
                          <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item noStyle name={[subField.name, 'color_id']}>
                                  <Select placeholder="Elije un color">
                                    {colores[form.getFieldValue().items[field.name]?.producto_id]?.map(color => (
                                      <Select.Option key={color.color_id} value={color.color_id}>
                                        {color.nombre}
                                      </Select.Option>
                                    )) || (
                                      <Select.Option disabled>Sin Colores</Select.Option>
                                    )}
                                  </Select>
                                </Form.Item>
                                <Form.Item noStyle name={[subField.name, 'talla']}>
                                  <Input placeholder="Talla" />
                                </Form.Item>
                                <Form.Item noStyle name={[subField.name, 'stock']}>
                                  <Input placeholder="Stock" />
                                </Form.Item>
                                <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
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

          {/* Muestra los valores del formulario para depuración */}
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue().items, null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>

          {/* Botón para enviar datos */}
          <FormItem>
            <Button
              onClick={async () => {
                const values = form.getFieldsValue().items; // Obtiene los valores
                await addProductoDetalle(id, values); // Añade productos y detalles
                getProductosNuevos(id, setProductos); // Refresca productos disponibles
                form.resetFields(); // Limpia formulario
                reload(); // Recarga lista principal
                closeModal(); // Cierra modal
              }}
              type="primary"
            >
              Crear
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductosModal; // Exporta el componente