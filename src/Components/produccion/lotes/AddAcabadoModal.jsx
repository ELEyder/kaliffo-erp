import { Form, Modal, Input, InputNumber, Button, Select, DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductoByLote } from "@AA/Producto";
import { addAcabado } from "@AP/Acabado";


const AddAcabadoModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductoByLote(id, setProductos)

  }, [id]);

  return (
    <Modal
      getContainer={false}
      title="Nuevo Acabado"
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
          await addAcabado(values);
          form.resetFields();
          reload();
          closeModal(false);
        }}
        initialValues={{
          lote_id: id,
        }}
      >
        {/* Campo Lote */}
        <Form.Item
          name="lote_id"
          label="Lote"
          hidden
          rules={[{ required: true, message: "El Lote es requerido" }]}
        >
          <Input disabled />
        </Form.Item>

        {/* Campo Producto */}
        <Form.Item
          name="producto_id"
          label="Producto"
          rules={[{ required: true, message: "El Producto es requerido" }]}
        >
          <Select placeholder="Seleccione un producto">
            {productos?.map((producto) => (
              <Select.Option key={producto.producto_id} value={producto.producto_id}>
                {producto.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Campo Color */}
        <Form.Item
          name="color_id"
          label="Color"
          rules={[{ required: true, message: "El Color es requerido" }]}
        >
          <Input min={1} placeholder="Ingrese el color" />
        </Form.Item>

        {/* Campo Talla */}
        <Form.Item
          name="talla"
          label="Talla"
          rules={[{ required: true, message: "La Talla es requerida" }]}
        >
          <InputNumber min={1} placeholder="Ingrese la talla" />
        </Form.Item>

        {/* Fecha Inicio */}
        <Form.Item
          name="fecha_inicio"
          label="Fecha Inicio"
          rules={[{ required: true, message: "La Fecha de inicio es requerida" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        {/* Fecha Final */}
        <Form.Item
          name="fecha_final"
          label="Fecha Final"
          rules={[{ required: true, message: "La Fecha final es requerida" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        {/* Cantidad Recibida */}
        <Form.Item
          name="cantidad_recibida"
          label="Cantidad Recibida"
          rules={[{ required: true, message: "La Cantidad recibida es requerida" }]}
        >
          <InputNumber min={1} placeholder="Ingrese la cantidad recibida" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAcabadoModal;
