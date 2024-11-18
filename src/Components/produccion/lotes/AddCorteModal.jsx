import { Form, Modal, Input, InputNumber, Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import { addCorte } from "@AP/Corte";
import { getProductoByLote } from "@AA/Producto";
import { getUsuarios } from "@AA/Usuario";
import { useParams } from "react-router-dom";

const AddCorteModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [productos, setProductos] = useState([]);
  const [talleres, setTalleres] = useState([]);
  useEffect(() => {
    getProductoByLote(id, setProductos)
    getUsuarios("talleres", setTalleres);
  }, []);

  return (
    <Modal
      getContainer={false}
      title="Nuevo Lote"
      open={openModal}
      onCancel={() => closeModal(false)}
      okText="Añadir"
      onOk={form.submit}
      centered
      width={600}
    >
      <Form
        style={{ margin: "0 auto" }}
        size="large"
        form={form}
        labelAlign="center"
        layout="vertical"
        onFinish={async (values) => {
          await addCorte(id, values);
          form.resetFields();
          reload();
          closeModal(false);
        }}
      >
        <Form.Item
          name="producto_id"
          label="Producto"
          rules={[
            {
              required: true,
              message: "Producto es requerido",
            },
          ]}
        >
          <Select placeholder="Seleccione productos">
            {productos.map((producto) => (
              <Select.Option key={producto.producto_id} value={producto.producto_id}>
                {producto.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="detalles">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <Form.Item
                    name={[field.name, "cantidad_enviada"]}
                    label="Cantidad Enviada"
                    rules={[{ required: true, message: "Cantidad enviada es requerida" }]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "talla"]}
                    label="Talla"
                    rules={[{ required: true, message: "Talla es requerida" }]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "taller_id"]}
                    label="Taller"
                    rules={[{ required: true, message: "Taller ID es requerido" }]}
                  >
                    <Select placeholder="Seleccione el taller">
                      {talleres.map((taller) => (
                        <Select.Option key={taller.usuario_id} value={taller.usuario_id}>
                          {`${taller.nombre} ${taller.ap_paterno} ${taller.ap_materno}`}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Button type="danger" onClick={() => remove(field.name)}>
                    Eliminar
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Agregar Detalle
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddCorteModal;
