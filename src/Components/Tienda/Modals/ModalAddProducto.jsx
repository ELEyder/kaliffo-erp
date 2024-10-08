import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Space, Select, Card } from 'antd';
import { getColoresProductos, getProductosNuevos } from "../../../Shared/api/Producto";

const { Option } = Select;

const ModalAddProducto = ({
  ModalProductoAddTiendaAbierto,
  closeModalProductoAddTiendaAbierto,
  id,
}) => {
  const [cont, setCont] = useState(1)
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const [form4] = Form.useForm()
  const [form5] = Form.useForm()
  const [forms, setForms] = useState([
    form1, form2, form3 ,form4 , form5
  ])

  const [cards, setCards] = useState([{ id: 0, entries: [{ key: 0, data: ['', '', ''] }] }]);
  const [productos, setProductos] = useState([]);
  const [colores, setColores] = useState({});

  useEffect(() => {
    getProductosNuevos(id, setProductos);
  }, [cards, id]);

  const handleCancel = () => {
    closeModalProductoAddTiendaAbierto(false);
    // Reset form and cards when closing the modal
    for (const form of forms) {
      form.resetFields();
    }
    setCont(1)
    setCards([{ id: 0, entries: [{ key: Date.now(), data: ['', '', ''] }] }]);
  };

  const addCard = () => {
    const newId = cont;
    setCards([...cards, { id: newId, entries: [{ key: Date.now(), data: ['', '', ''] }] }]);
    console.log(cont)
  };

  const removeCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const addEntry = (cardId) => {
    setCards(cards.map(card =>
      card.id === cardId ? 
      { ...card, entries: [...card.entries, { key: card.entries.length - 1, data: ['', '', ''] }] } 
      : card
    ));
  };

  const removeEntry = (cardId, key) => {
    setCards(cards.map(card => 
      card.id === cardId ? 
      { ...card, entries: card.entries.filter(entry => entry.key !== key) } 
      : card
    ));
  };

  const handleInputChange = (cardId, key, index, value) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const updatedEntries = card.entries.map(entry => {
          if (entry.key === key) {
            entry.data[index] = value;
          }
          return entry;
        });
        return { ...card, entries: updatedEntries };
      }
      return card;
    }));
  };

  const handleNameChange = (value, cardId) => {
    // Reset entries when the name field changes
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const newEntries = [{ key: Date.now(), data: ['', '', ''] }];
        getColoresProductos(value, setColores);
        console.log(colores)
        return { ...card, entries: newEntries };
      }
      return card;
    }));
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    console.log('Cards:', cards);
    // Close modal after submission
    handleCancel();
  };

  const enviarData = () => {
    let dataArray = []
    for (const form of forms) {
      let data = form.getFieldsValue()
      dataArray.push(data)
    }
    console.log(dataArray)
  }
  return (
    <>
      <Modal
        forceRender
        getContainer={false}
        title="Formulario Dinámico"
        open={ModalProductoAddTiendaAbierto}
        onCancel={handleCancel}
        footer={null}
      >
        <Button type="dashed" onClick={addCard} style={{ marginBottom: 16 }}>
          Añadir Más Tarjetas
        </Button>

        {cards.map((card) => {
          return (
          <Card key={card.id} style={{ marginBottom: 16 }}>
            <Form form={forms[card.id]} onFinish={onFinish} layout="vertical">
              <Form.Item 
                name={`producto_id`} 
                label="Nombre" 
                rules={[{ required: true, message: 'Por favor, selecciona un nombre' }]}
              >
                <Select
                onChange={(value) => handleNameChange(value, card.id)} placeholder="Selecciona un nombre">
                  {productos.map(producto => (
                    <Select.Option key={producto.producto_id} value={producto.producto_id}>
                      {producto.nombre}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <div>
                {card.entries.map(entry => (
                  <Space key={entry.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                    name={`color_id_${entry.key}`}
                    >
                      <Select
                        
                        onChange={(value) => handleInputChange(card.id, entry.key, 0, value)} 
                        placeholder="Selecciona un dato 1" 
                        required 
                      >
                        {colores[forms[card.id]?.getFieldValue(`producto_id`)]?.map(color => (
                          <Select.Option key={color.color_id} value={color.color_id}>
                            {color.nombre}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Input 
                        value={entry.data[1]} 
                        onChange={(e) => handleInputChange(card.id, entry.key, 1, e.target.value)} 
                        placeholder="Dato 2" 
                        required 
                      />
                    </Form.Item>
                    <Form.Item>
                      <Input 
                        value={entry.data[2]} 
                        onChange={(e) => handleInputChange(card.id, entry.key, 2, e.target.value)} 
                        placeholder="Dato 3" 
                        required 
                      />
                    </Form.Item>
                    <Button type="link" onClick={() => removeEntry(card.id, entry.key)}>Eliminar</Button>
                  </Space>
                ))}
              </div>

              <Form.Item>
                <Button type="dashed" onClick={() => addEntry(card.id)} style={{ width: '100%' }}>
                  Añadir Más Entradas
                </Button>
              </Form.Item>

              <Form.Item>
                <Button type="link" onClick={() => removeCard(card.id)} style={{ color: 'red' }}>
                  Eliminar Tarjeta
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )})}

        <Form.Item>
          <Button type="primary" onClick={enviarData}>
            Enviar
          </Button>
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalAddProducto;
