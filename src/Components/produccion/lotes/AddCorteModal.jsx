import { Form, Modal, Select, Input, InputNumber, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { addCorte } from "@AP/Corte";
import { getUsuarios } from "@AA/Usuario";
import { getProductos } from "@AA/Producto";
import { getTelas } from "@AP/Tela";
import { useParams } from "react-router-dom";
const { Option } = Select;

const AddCorteModal = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [ lote_id, setId ] = useState(0);
  const [talleres, setTalleres] = useState([]);
  const [productos, setProductos] = useState([]);
  const [telas, setTelas] = useState([]);
  const [metraje, setMetraje] = useState(1);
  const [merma, setMerma] = useState(1);
  const [neto, setNeto] = useState(0);

  useEffect(() => {
    getUsuarios(2, setTalleres);
    getProductos(setProductos);
    getTelas(setTelas);
    setId(id)
  }, [reload]);

  const calculateNeto = (newMerma, newMetraje) => {
    const mermaFactor = 1 + newMerma / 100;
    const calculatedNeto = newMetraje * mermaFactor;
    setNeto(calculatedNeto.toFixed(2));
    form.setFieldsValue({ neto: calculatedNeto.toFixed(2) });
  };

  return (
    <Modal
      title="Nuevo Producto"
      open={openModal}
      onCancel={() => closeModal(false)}
      okText="Añadir"
      onOk={form.submit}
      centered
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={async (values) => {
          await addCorte(lote_id, values);
          form.resetFields();
          reload();
          closeModal(false);
        }}
        size="large"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="taller"
              label="Taller"
              rules={[{ required: true, message: "Taller requerido" }]}
            >
              <Select>
                {talleres.map((taller, index) => (
                  <Option key={index} value={taller.usurio_id}>
                    {taller.nombre} {taller.ap_paterno} {taller.ap_materno}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="producto"
              label="Producto"
              rules={[{ required: true, message: "Producto requerido" }]}
            >
              <Select>
                {productos.map((producto, index) => (
                  <Option key={index} value={producto.producto_id}>
                    {producto.nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="cantidad"
              label="Cantidad"
              rules={[{ required: true, message: "Cantidad requerida" }]}
            >
              <Input type="number" placeholder="Ingresa la cantidad" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="talla"
              label="Talla"
              rules={[{ required: true, message: "Talla requerida" }]}
            >
              <Input placeholder="Ingresa la talla" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="tela"
              label="Tela"
              rules={[{ required: true, message: "Tela requerida" }]}
            >
              <Select>
                {telas.map((tela, index) => (
                  <Option key={index} value={tela.tela_id}>
                    {tela.tipo}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="metraje"
              label="Metraje"
              rules={[{ required: true, message: "Metraje requerido" }]}
            >
              <Input
                type="number"
                placeholder="Ingresa el metraje asignado"
                value={metraje}
                onChange={(e) => {
                  const newMetraje = parseFloat(e.target.value) || 0;
                  setMetraje(newMetraje);
                  calculateNeto(merma, newMetraje);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="merma"
              label="Merma"
              rules={[{ required: true, message: "Merma requerida" }]}
            >
              <InputNumber
                min={1}
                max={50}
                type="number"
                placeholder="%"
                value={merma}
                onChange={(value) => {
                  const newMerma = value || 0;
                  setMerma(newMerma);
                  calculateNeto(newMerma, metraje);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="neto"
              label="Neto"
              rules={[{ required: true, message: "Neto requerido" }]}
            >
              <Input
                readOnly
                type="number"
                placeholder="Ingresa el neto"
                value={neto}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddCorteModal;
