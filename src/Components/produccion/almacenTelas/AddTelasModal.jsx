import React, { useEffect, useState } from "react";
import { CloseOutlined } from '@ant-design/icons';
import FormItem from "antd/es/form/FormItem";
import { getEmpresas} from "../../../API/Empresa";
import { getTiposTela, addTelas } from "../../API/Tela";
import { Modal, AutoComplete, Button, Card, Form, Input, Select, Typography, DatePicker } from 'antd';

const { Option } = Select;

const AddTelasModal = ({
  openModal,
  closeModal,
  reload
}) => {
  
  const [form] = Form.useForm();
  const [empresas, setEmpresas] = useState([]);
  const [tiposTela, setTiposTela] = useState([]);

  useEffect(()=> {
    getTiposTela(setTiposTela)
    getEmpresas(setEmpresas);
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
                title={`Tela ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Tipo de Tela" name={[field.name, 'tipo']} rules={[
                    {
                      required: true,
                      message: "Tipo requerido",
                    },
                  ]}>
                  <AutoComplete>
                    {
                      tiposTela.map((tipo, index) =>{
                        return (
                          <Option key={index} value={tipo.tipo}>{tipo.tipo}</Option>
                        )
                      })
                    }
                  </AutoComplete>
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
                  name={[field.name, 'empresa_compra']}
                  label="Empresa"
                  rules={[
                    {
                      required: true,
                      message: "Empresa requerida",
                    },
                  ]}
                >
                  <AutoComplete>
                    {
                      empresas.map((tipo, index) =>{
                        return (
                          <Option key={index} value={tipo.empresa_compra}>{tipo.empresa_compra}</Option>
                        )
                      })
                    }
                  </AutoComplete>
                </Form.Item>
                <Form.Item
                  name={[field.name, 'fecha_compra']}
                  label="Fecha"
                  rules={[
                    {
                      required: true,
                      message: "Fecha requerida",
                    },
                  ]}
                >
                  <DatePicker />
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
            <pre>{JSON.stringify(form.getFieldsValue().items, null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}

      <FormItem>
        <Button style= {
          {
            marginTop: "10px"
          }
        }
         onClick={ async ()=> {
          const values = form.getFieldsValue().items
          await addTelas(values)
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
