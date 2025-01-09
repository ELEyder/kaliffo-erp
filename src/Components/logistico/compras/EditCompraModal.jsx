import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Card,
  Input,
  Divider,
  AutoComplete,
  DatePicker,
  InputNumber,
} from "antd";
import { getComprasDetalle, getEmpresas, getProductos, updateCompra } from "@AL/Compras";
import moment from "moment";

const EditCompraModal = ({ openModal, closeModal, idC, reload }) => {
  const [form] = Form.useForm();
  const [valoresO, setValoresO] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const [productos, setProductos] = useState([]);

  // Recalcula el total de la compra basado en los detalles.
  const recalcularTotales = (detalles) => {
    const totalCantidad = detalles.reduce(
      (acc, curr) => acc + (curr?.cantidad || 0),
      0
    );
    const totalNeto = detalles.reduce(
      (acc, curr) => acc + (curr?.total || 0),
      0
    );

    form.setFieldsValue({
      cantidad: totalCantidad,
      total: totalNeto,
    });
  };

  useEffect(() => {
    if (idC) {
      getComprasDetalle((data) => {
        setValoresO(data);
        form.setFieldsValue({
          tienda: data.tienda,
          empresa_proveedor: data.empresa_proveedor,
          fecha_compra: data.fecha_compra ? moment(data.fecha_compra) : undefined,
          cantidad: data.cantidad,
          total: data.total,
          detalle: data.detalle?.map((item) => ({
            producto: item.producto,
            cantidad: item.cantidad,
            total: item.total,
            compraDetalle_id: item.compraDetalle_id,
          })) || [],
        });
      }, idC);
      getEmpresas(setEmpresas);
      getProductos(setProductos);
    }
  }, [idC]);

  return (
    <Modal
      title={`Editar Compra ${idC}`}
      open={openModal}
      style={{ textAlign: "center" }}
      onCancel={() => closeModal(false)}
      onOk={form.submit}
      okText="Guardar"
      centered
      width={800}
    >
      <Form
        form={form}
        size="large"
        layout="vertical"
        onFinish={async (values) => {
          await updateCompra(idC, values, valoresO);
          reload();
          closeModal(false);
        }}
        onValuesChange={(changedValues, allValues) => {
          if (changedValues.detalle) {
            recalcularTotales(allValues.detalle);
          }
        }}
      >
        <Row gutter={24}>
          <Col span={17}>
            <Card title="Datos de la Compra">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Tienda" name="tienda">
                    <Input style={{ textAlign: "center" }} readOnly />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Empresa" name="empresa_proveedor">
                    <AutoComplete
                      style={{ alignItems: "center" }}
                      options={empresas.map((empresa) => ({
                        value: empresa.empresa_proveedor,
                        label: empresa.empresa_proveedor,
                      }))}
                      filterOption={(inputValue, option) =>
                        option?.value?.toUpperCase().includes(inputValue.toUpperCase())
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Fecha Compra" name="fecha_compra">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Card>
          </Col>

          <Col span={7}>
            <Card title="Totales">
              <Form.Item label="Cantidad Total" name="cantidad">
                <InputNumber readOnly style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Total Neto" name="total">
                <InputNumber readOnly style={{ width: "100%" }} />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider />

        <div>
          {form.getFieldValue("detalle")?.map((detalle, index) => (
            <Row key={detalle.compraDetalle_id || index} gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Producto"
                  name={["detalle", index, "producto"]}
                  initialValue={detalle.producto}
                >
                  <AutoComplete
                    options={productos.map((producto) => ({
                      value: producto.producto,
                      label: producto.producto,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Cantidad"
                  name={["detalle", index, "cantidad"]}
                  initialValue={detalle.cantidad}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Total"
                  name={["detalle", index, "total"]}
                  initialValue={detalle.total}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Form.Item
                name={["detalle", index, "compraDetalle_id"]}
                initialValue={detalle.compraDetalle_id}
              >
                <Input type="hidden" />
              </Form.Item>
            </Row>
          ))}
        </div>
      </Form>
    </Modal>
  );
};

export default EditCompraModal;
