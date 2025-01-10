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
import { getTiendas } from "@AA/Tienda"; // Obtiene la lista de tiendas
import { addCompra, getEmpresas, getProductos } from "@AL/Compras"; // Funciones para agregar compra, obtener empresas y productos

const AddCompraModal = ({ openModal, closeModal, reload, setReload }) => {
  const [form] = Form.useForm();
  const [tiendas, setTiendas] = useState([]); // Estado para almacenar las tiendas
  const [empresas, setEmpresas] = useState([]); // Estado para almacenar las empresas
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos

  // Calcula el total y la cantidad total de los productos
  const calculoTotal = (detalle) => {
    const cantidad = detalle.reduce(
      (acc, curr) => acc + (curr?.cantidad || 0),
      0
    );
    const total = detalle.reduce((acc, curr) => acc + (curr?.total || 0), 0);

    form.setFieldsValue({
      cantidad_total: cantidad, // Actualiza el campo de cantidad total
      total_neto: total, // Actualiza el campo de total neto
    });
  };

  // Efecto que se ejecuta al montar el componente para obtener tiendas, empresas y productos
  useEffect(() => {
    getTiendas(setTiendas); // Obtiene las tiendas
    getEmpresas(setEmpresas); // Obtiene las empresas
    getProductos(setProductos); // Obtiene los productos
  }, []);

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Añadir nueva compra`}
      open={openModal} // Controla la visibilidad del modal
      onCancel={() => closeModal(false)} // Cierra el modal
      style={{ textTransform: "uppercase" }}
      okText="Añadir" // Texto del botón de acción
      onOk={form.submit} // Ejecuta la acción de agregar compra al hacer clic en el botón "Añadir"
      centered={true} // Centra el modal
      width={800} // Ancho del modal
    >
      <Form
        style={{ maxWidth: 700, margin: "0 auto", marginTop: "30px" }}
        size="large"
        form={form} // Vincula el formulario al estado de Ant Design
        layout="vertical"
        labelAlign="left"
        id="formulariocrear"
        onFinish={async (values) => {
          await addCompra(values); // Agrega la compra
          setReload(!reload); // Fuerza la recarga de los datos
          closeModal(false); // Cierra el modal
          form.resetFields(); // Resetea los campos del formulario
        }}
        initialValues={{ detalle: [{}] }} // Inicializa el formulario con un producto por defecto
        onValuesChange={(changedValues, allValues) => {
          calculoTotal(allValues.detalle); // Calcula el total cada vez que cambian los valores
        }}
      >
        {/* Sección para los datos de la compra */}
        <Row gutter={24} style={{ textAlign: "center" }}>
          <Col span={17}>
            <Card title="Datos compra" style={{ width: "100%", textAlign: "center" }}>
              <Row gutter={16}>
                {/* Selección de tienda */}
                <Col span={12}>
                  <Form.Item
                    label="Tienda"
                    name="tienda"
                    rules={[{ required: true, message: "Obligatorio" }]}>
                    <Select
                      options={tiendas.map((tienda) => ({
                        value: tienda.tienda_id,
                        label: tienda.tienda,
                        key: tienda.tienda_id,
                      }))}
                    />
                  </Form.Item>
                </Col>

                {/* Selección de empresa */}
                <Col span={12}>
                  <Form.Item
                    label="Empresa"
                    name="empresa"
                    rules={[{ required: true, message: "Obligatorio" }]}>
                    <AutoComplete
                      options={empresas.map((empresa) => ({
                        value: empresa.empresa_proveedor,
                        label: empresa.empresa_proveedor,
                      }))}
                      filterOption={(inputValue, option) =>
                        option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Fecha de compra */}
              <Form.Item
                label="Fecha Compra"
                name="fecha_compra"
                rules={[{ required: true, message: "Obligatorio" }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Card>
          </Col>

          {/* Sección de datos totales */}
          <Col span={7} style={{ textAlign: "center" }}>
            <Card title="Datos Total" style={{ width: "100%", textAlign: "center" }}>
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

        {/* Lista de productos */}
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
                  {/* Selección de producto */}
                  <Form.Item
                    {...restField}
                    name={[name, "producto"]}
                    rules={[{ required: true, message: "Obligatorio" }]}>
                    <AutoComplete
                      style={{ width: "240px" }}
                      placeholder="Nombre del Producto"
                      options={productos.map((producto) => ({
                        value: producto.producto,
                        label: producto.producto,
                      }))}
                      filterOption={(inputValue, option) =>
                        option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>

                  {/* Cantidad del producto */}
                  <Form.Item
                    {...restField}
                    name={[name, "cantidad"]}
                    rules={[{ required: true, message: "Obligatorio" }]}>
                    <InputNumber placeholder="Cantidad" style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Total del producto */}
                  <Form.Item
                    {...restField}
                    name={[name, "total"]}
                    rules={[{ required: true, message: "Obligatorio" }]}>
                    <InputNumber placeholder="Total" style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Botón para eliminar producto */}
                  {fields.length > 1 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()} // Añadir un nuevo producto a la lista
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
