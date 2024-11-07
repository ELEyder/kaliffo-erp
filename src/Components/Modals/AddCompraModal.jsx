import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Card,
  Form,
  Input,
  Modal,
  Row,
  InputNumber,
  Divider,
  Select,
  Space,
  Button,
  AutoComplete,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getTiendas } from "../../API/Tienda";
import { addCompra, getEmpresas, getProductos } from "../../API/Compras";

const AddCompraModal = ({ openModal, closeModal, reload, setReload }) => {
  const [form] = Form.useForm();
  const [tiendas, setTiendas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [productos, setProductos] = useState([]);

  const calculoTotal = (detalle) => {
    const cantidad = detalle.reduce(
      (acc, curr) => acc + (curr?.cantidad || 0),
      0
    );
    const total = detalle.reduce((acc, curr) => acc + (curr?.total || 0), 0);

    // Actualiza los valores en el formulario
    form.setFieldsValue({
      cantidad_total: cantidad,
      total_neto: total,
    });
  };

  useEffect(() => {
    getTiendas(setTiendas);
    getEmpresas(setEmpresas);
    getProductos(setProductos);
  }, []);

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Añadir nueva compra`}
      open={openModal}
      onCancel={() => closeModal(false)}
      style={{ textTransform: "uppercase" }}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={800}
    >
      <Form
        style={{ maxWidth: 700, margin: "0 auto", marginTop: "30px" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="left"
        id="formulariocrear"
        onFinish={async (values) => {
          await addCompra(values)
          setReload(!reload)
          closeModal(false)
          form.resetFields()
        }}
        initialValues={{
          detalle: [{}],
        }}
        onValuesChange={(changedValues, allValues) => {
          calculoTotal(allValues.detalle);
        }}
      >
        <Row gutter={24} style={{ textAlign: "center" }}>
          <Col span={17}>
            <Card
              title="Datos compra"
              style={{
                width: "100%",
                border: "solid 1px",
                textAlign: "center",
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Tienda"
                    name="tienda"
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <Select
                      options={tiendas.map((tienda) => ({
                        value: tienda.tienda_id,
                        label: tienda.tienda,
                        key: tienda.tienda_id,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Empresa"
                    name="empresa"
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <AutoComplete
                      options={empresas.map((empresa) => ({
                        value: empresa.empresa_proveedor,
                        label: empresa.empresa_proveedor,
                      }))}
                      filterOption={(inputValue, option) =>
                        option?.value
                          ?.toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Fecha Compra"
                name="fecha_compra"
                rules={[{ required: true, message: "Obligatorio" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Card>
          </Col>

          <Col span={7} style={{ textAlign: "center" }}>
            <Card
              title="Datos Total"
              style={{
                width: "100%",
                border: "solid 1px",
                textAlign: "center",
              }}
            >
              <Form.Item label="Cantidad" name="cantidad_total">
                <InputNumber placeholder="Cantidad" style={{ width: "100%" }} readOnly />
              </Form.Item>
              <Form.Item label="Total" name="total_neto">
                <InputNumber placeholder="Total" style={{ width: "100%" }} readOnly />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider style={{ borderColor: "black" }} />

        <Form.List name="detalle">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    justifyContent: "space-between",
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "producto"]}
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <AutoComplete
                      style={{ width: "240px" }}
                      placeholder="Nombre del Producto"
                      options={productos.map((producto) => ({
                        value: producto.producto,
                        label: producto.producto,
                      }))}
                      filterOption={(inputValue, option) =>
                        option?.value
                          ?.toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "cantidad"]}
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <InputNumber placeholder="Cantidad" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "total"]}
                    rules={[{ required: true, message: "Obligatorio" }]}
                  >
                    <InputNumber placeholder="Total" style={{ width: "100%" }} />
                  </Form.Item>

                  {fields.length > 1 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ marginTop: "10px" }}
                >
                  Añadir producto
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddCompraModal;
