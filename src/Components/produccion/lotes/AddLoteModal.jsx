import { Form, Modal, Input, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { addLote } from "@AP/Lote";
import { getProductos } from "@AA/Producto";
import { getTelas } from "@AP/Tela";

const AddLoteModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();
  const [productos, setProductos] = useState();
  const [telas, setTelas] = useState();

  useEffect(()=> {
    getProductos(setProductos)
    getTelas(setTelas)
  }, [])
  return (
    <Modal
      getContainer={false}
      title={"Nuevo Lote"}
      open={openModal}
      onCancel={() => closeModal(false)}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={400}
    >
      <Form
        style={{ margin: "0 auto" }}
        size="large"
        form={form}
        labelAlign="center"
        id="formulariocrear" 
        layout="vertical"
        onFinish={async (values) => {
          await addLote(values);
          form.resetFields();
          reload();
          closeModal(false);
        }}
      >
        <Form.Item
          style={{ marginTop: 20 }}
          name="tipo_tela"
          label="Tipo de Tela"
          rules={[
            {
              required: true,
              message: "Tipo de tela requerido",
            },
          ]}
        >
          <Select
            placeholder="Seleccione telas"
          >
            {telas?.map((tela, index) => (
              <Select.Option key={index} value={tela.tipo}>
                {tela.tipo}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginTop: 20 }}
          name="metraje"
          label="Metraje"
          rules={[
            {
              required: true,
              message: "Metraje requerido",
            },
          ]}
        >
          <InputNumber min={0} step={0.001} />
        </Form.Item>
        <Form.Item
          style={{ marginTop: 20 }}
          name="productos"
          label="Productos"
          rules={[
            {
              required: true,
              message: "Seleccione al menos un producto",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Seleccione productos"
          >
            {productos?.map((producto, index) => (
              <Select.Option key={index} value={producto.nombre}>
                {producto.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLoteModal;
