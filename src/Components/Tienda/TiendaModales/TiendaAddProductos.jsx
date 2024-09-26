import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal, Select, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  getColoresProductos,
  getProductosNuevos,
} from "../../../Shared/Funciones/Fucniones_Tienda";

const TiendaAddProductos = ({
  ModalProductoAddTiendaAbierto,
  closeModalProductoAddTiendaAbierto,
  id,
}) => {
  const [form] = Form.useForm();
  const [Productos, setProductos] = useState([]);
  const [Colores, setColores] = useState([]);
  
  useEffect(() => {
    getProductosNuevos(id, setProductos);
  }, [id]);

  const handleProductChange = (value) => {
    setColores([]);
    form.setFieldValue({})
    getColoresProductos(value, setColores);
  };

  return (
    <Modal
      getContainer={false}
      title={`Añadir nuevo producto`}
      open={ModalProductoAddTiendaAbierto}
      onCancel={closeModalProductoAddTiendaAbierto}
      style={{ textTransform: "uppercase" }}
      onOk={form.submit}
      okText="Guardar"
      centered={true}
      width={500}
    >
      <Form
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        initialValues={{ productos: [{}] }}
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <Form.List name="productos">
          {(campos, { add, remove }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {campos.map((campo, index) => (
                <Card
                  size="small"
                  title={`PRODUCTO ${campo.name + 1}`}
                  key={campo.key}
                  extra={
                    <CloseOutlined
                      onClick={() => remove(campo.name)}
                    />
                  }
                >
                  <Form.Item label="Producto" name={[campo.name, "producto"]}>
                    <Select
                      showSearch
                      placeholder="Seleccionar Producto"
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      onChange={handleProductChange}
                      options={Productos.map((producto) => ({
                        value: producto.producto_id,
                        label: producto.nombre,
                      }))}
                    />
                  </Form.Item>

                  {Colores.length > 0 ? (
                    <Form.Item label="Detalle">
                      <Form.List name={[campo.name, "detalle"]}>
                        {(subcampos, { add: addSubcampo, remove: removeSubcampo }) => (
                          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {subcampos.map((subcampo) => (
                              <Space key={subcampo.key}>
                                <Form.Item noStyle name={[subcampo.name, "color"]}>
                                  <Select
                                    showSearch
                                    placeholder="Seleccionar color"
                                    options={Colores.map((color) => ({
                                      value: color.color_id,
                                      label: color.nombre,
                                    }))}
                                  />
                                </Form.Item>

                                <Form.Item noStyle name={[subcampo.name, "talla"]}>
                                  <Input placeholder="Talla" />
                                </Form.Item>

                                <Form.Item noStyle name={[subcampo.name, "cantidad"]}>
                                  <Input placeholder="Cantidad" />
                                </Form.Item>

                                <CloseOutlined onClick={() => removeSubcampo(subcampo.name)} />
                              </Space>
                            ))}
                            <Button type="dashed" onClick={addSubcampo} block>
                              AÑADIR
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  ) : null}
                </Card>
              ))}

              <Button type="dashed" onClick={add} block>
                + AÑADIR
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default TiendaAddProductos;
