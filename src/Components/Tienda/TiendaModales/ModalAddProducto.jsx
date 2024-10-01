import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Space, Select } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import { getColoresProductos, getProductosNuevos } from "../../../Shared/Funciones/Fucniones_Tienda";
const { Option } = Select;
const ModalAddProducto = ({
  ModalProductoAddTiendaAbierto,
  closeModalProductoAddTiendaAbierto,
  id,
}) => {
  const [form] = Form.useForm();
  const [entries, setEntries] = useState([{ key: Date.now(), data: ['', '', ''] }]);
  const [productos, setProductos] = useState([]);
  const [colores, setColores] = useState([]);

  useEffect(() => {
    getProductosNuevos(id, setProductos)
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    closeModalProductoAddTiendaAbierto(ModalProductoAddTiendaAbierto ? false : true);
    // Reset form and entries when closing the modal
    form.resetFields();
    setEntries([{ key: Date.now(), data: ['', '', ''] }]);
  };

  const addEntry = () => {
    setEntries([...entries, { key: Date.now(), data: ['', '', ''] }]);
  };
  const removeEntry = (key) => {
    setEntries(entries.filter(entry => entry.key !== key));
  };

  const handleInputChange = (key, index, value) => {
    const updatedEntries = entries.map(entry => {
      if (entry.key === key) {
        entry.data[index] = value;
      }
      return entry;
    });
    setEntries(updatedEntries);
  };

  const handleNameChange = (value) => {
    // Reset entries when the name field changes
    form.setFieldsValue({ name: value });
    setEntries([{ key: Date.now(), data: ['', '', ''] }]);
    getColoresProductos(value, setColores)
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    console.log('Entries:', entries);
    // Close modal after submission
    handleCancel();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Abrir Formulario
      </Button>

      <Modal
        title="Formulario Dinámico"
        open={ModalProductoAddTiendaAbierto}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item 
          name="name" 
          label="Nombre" 
          rules={[{ required: true, message: 'Por favor, selecciona un nombre' }]}
        >
          <Select onChange={handleNameChange} placeholder="Selecciona un nombre">
            {productos.map(producto => (
                <Select.Option key={producto.producto_id} value={producto.producto_id}> {/* Cambia 'id' y 'value' según tu API */}
                  {producto.nombre} {/* Cambia 'label' según tu API */}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
          
          <div>
          {entries.map(entry => (
            <Space key={entry.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item>
                <Select
                  onChange={(value) => handleInputChange(entry.key, 0, value)} 
                  placeholder="Selecciona un dato 1" 
                  required 
                >
                  {colores.map(color => (
                    <Select.Option key={color.color_id} value={color.color_id}> {/* Cambia 'id' y 'value' según tu API */}
                      {color.nombre} {/* Cambia 'label' según tu API */}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Input 
                  value={entry.data[1]} 
                  onChange={(e) => handleInputChange(entry.key, 1, e.target.value)} 
                  placeholder="Dato 2" 
                  required 
                />
              </Form.Item>
              <Form.Item>
                <Input 
                  value={entry.data[2]} 
                  onChange={(e) => handleInputChange(entry.key, 2, e.target.value)} 
                  placeholder="Dato 3" 
                  required 
                />
              </Form.Item>
              <Button type="link" onClick={() => removeEntry(entry.key)}>Eliminar</Button>
            </Space>
          ))}
          </div>
          
          <Form.Item>
            <Button type="dashed" onClick={addEntry} style={{ width: '100%' }}>
              Añadir Más Entradas
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddProducto;
