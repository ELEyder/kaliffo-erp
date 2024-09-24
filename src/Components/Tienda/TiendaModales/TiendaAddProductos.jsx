import React from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

const TiendaAddProductos = ({
  ModalProductoAddTiendaAbierto,
  closeModalProductoAddTiendaAbierto,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      getContainer={false}
      title={`Añadir nuevo trabajador`}
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
                    <Input />
                  </Form.Item>

                  <Form.Item label="Detalle">
                    <Form.List name={[campo.name, "lista"]}>
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
                                <Input placeholder="COLOR" />
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
                          <Button type="dashed" onClick={()=>subopt.add()} block>
                            AÑADIR
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={()=>add()} block>
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
