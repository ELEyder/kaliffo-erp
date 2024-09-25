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
  }, []);

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
        id="formularioTiendaAddProductos"
        initialValues={{ productos: [{}] }}
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <Form.List name="productos">
          {(campos, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {campos.map((campo) => (
                <Card
                  size="small"
                  title={`PRODUCTO ${campo.name + 1}`}
                  key={campo.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(campo.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Producto" name={[campo.name, "producto"]}>
                    <Select
                      showSearch
                      placeholder="Seleccionar Producto"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={getColoresProductos(form, setColores)}
                      options={Productos.map((producto) => ({
                        value: producto.producto_id,
                        label: producto.nombre,
                        key: producto.producto_id,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Detalle">
                    <Form.List name={[campo.name, "detalle"]}>
                      {(subcampos, subopt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subcampos.map((subcampo) => (
                            <Space key={subcampo.key}>
                              <Form.Item
                                noStyle
                                name={[subcampo.name, "color"]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Seleccionar color"
                                  filterOption={(input, option) =>
                                    (option?.label ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  onChange={getColoresProductos(
                                    form,
                                    setColores
                                  )}
                                  options={Colores.map((color) => ({
                                    value: color.color_id,
                                    label: color.nombre,
                                    key: color.color_id,
                                  }))}
                                />
                              </Form.Item>

                              <Form.Item
                                noStyle
                                name={[subcampo.name, "talla"]}
                              >
                                <Input placeholder="Talla" />
                              </Form.Item>

                              <Form.Item
                                noStyle
                                name={[subcampo.name, "cantidad"]}
                              >
                                <Input placeholder="Cantidad" />
                              </Form.Item>

                              <CloseOutlined
                                onClick={() => {
                                  subopt.remove(subcampo.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subopt.add()}
                            block
                          >
                            AÑADIR
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
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
