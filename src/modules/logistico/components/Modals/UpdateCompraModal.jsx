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
import {
  getComprasDetalle,
  getEmpresas,
  getProductos,
  updateCompra,
} from "@AL/Compras";
import moment from "moment";

const UpdateCompraModal = ({ openModal, closeModal, idC, reload }) => {
  const [form] = Form.useForm();
  const [valoresO, setValoresO] = useState({}); // Estado para guardar los valores originales de la compra
  const [empresas, setEmpresas] = useState([]); // Estado para guardar las empresas
  const [productos, setProductos] = useState([]); // Estado para guardar los productos

  // Recalcula el total de la compra basado en los detalles
  const recalcularTotales = (detalles = []) => {
    const totalCantidad = detalles.reduce(
      (acc, curr) => acc + (curr?.cantidad || 0),
      0
    );
    const totalNeto = detalles.reduce(
      (acc, curr) => acc + (curr?.total || 0),
      0
    );

    form.setFieldsValue({
      cantidad: totalCantidad, // Establece el total de la cantidad
      total: totalNeto, // Establece el total neto
    });
  };

  // Carga los detalles de la compra, las empresas y los productos al montar el componente
  useEffect(() => {
    if (idC && openModal) {
      // Obtiene los detalles de la compra
      getComprasDetalle((data) => {
        if (data) {
          setValoresO(data); // Guarda los valores originales de la compra
          form.setFieldsValue({
            tienda: data.tienda,
            empresa_proveedor: data.empresa_proveedor,
            fecha_compra: moment(data.fecha_compra), // Convierte la fecha de compra a formato adecuado
            cantidad: data.cantidad,
            total: data.total,
            detalle:
              data.detalle?.map((item) => ({
                producto: item.producto,
                cantidad: item.cantidad,
                total: item.total,
                compraDetalle_id: item.compraDetalle_id,
              })) || [],
          });
        }
      }, idC);
  
      // Obtiene las empresas y productos
      getEmpresas(setEmpresas);
      getProductos(setProductos);
    }
  }, [idC, openModal]);
  

  return (
    <Modal
      title={`Editar Compra ${idC}`} // Título del modal con el ID de la compra
      open={openModal} // Controla la visibilidad del modal
      style={{ textAlign: "center" }}
      onCancel={() => closeModal(false)} // Cierra el modal
      onOk={form.submit} // Envía el formulario al hacer clic en "Guardar"
      okText="Guardar" // Texto del botón "Guardar"
      centered
      forceRender
      width={800} // Establece el ancho del modal
    >
     {openModal&&( <Form
        form={form} // Usamos el formulario de Ant Design
        size="large"
        layout="vertical"
        onFinish={async (values) => {
          // Cuando el formulario se envía, se actualiza la compra con los nuevos valores
          await updateCompra(idC, values, valoresO);
          reload(); // Recarga los datos después de la actualización
          closeModal(false); // Cierra el modal
        }}
        onValuesChange={(changedValues, allValues) => {
          // Recalcula los totales cada vez que cambia un valor en el detalle
          if (changedValues.detalle) {
            recalcularTotales(allValues.detalle);
          }
        }}
      >
        <Row gutter={24}>
          {/* Sección de Datos de la Compra */}
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
                        option?.value
                          ?.toUpperCase()
                          .includes(inputValue.toUpperCase())
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

          {/* Sección de Totales */}
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

        {/* Listado de detalles de la compra */}
        <div>
          {(form.getFieldValue("detalle") || []).map((detalle, index) => (
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
              {/* Campo oculto para guardar el ID del detalle */}
              <Form.Item
                name={["detalle", index, "compraDetalle_id"]}
                initialValue={detalle.compraDetalle_id}
              >
                <Input type="hidden" />
              </Form.Item>
            </Row>
          ))}
        </div>
      </Form>)}
    </Modal>
  );
};

export default UpdateCompraModal;
