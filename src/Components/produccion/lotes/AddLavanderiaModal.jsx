import React, { useState, useEffect } from "react"; // Importa React y hooks
import { Form, Modal, Input, InputNumber, Button, Select, Row, Col } from "antd"; // Importa los componentes necesarios de Ant Design
import { getCorte } from "@AP/Corte"; // Función para obtener cortes desde la API
import { getColores } from "@AA/Color"; // Función para obtener colores desde la API
import { addLavanderia } from "@AP/Lavanderia"; // Función para agregar lavandería desde la API
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL

const AddLavanderiaModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams(); // Obtiene el ID del lote desde la URL
  const [form] = Form.useForm(); // Crea el formulario utilizando Ant Design
  const [cortes, setCortes] = useState([]); // Estado para almacenar los cortes obtenidos
  const [colores, setColores] = useState([]); // Estado para almacenar los colores obtenidos
  const [maxValues, setMaxValues] = useState({}); // Estado para almacenar valores máximos dinámicos (por corte)

  useEffect(() => {
    getCorte(id, setCortes); // Llama a la API para obtener los cortes del lote
    getColores(setColores); // Llama a la API para obtener los colores disponibles
  }, [id]);

  // Función que maneja el cambio en el corte seleccionado y actualiza el valor máximo en la cantidad
  const handleCorteChange = (fieldKey, corteId) => {
    const corte = cortes.find((c) => c.corte_id === corteId);
    if (corte) {
      setMaxValues((prev) => ({
        ...prev,
        [fieldKey]: corte.cantidad_restante || 0, // Establece el valor máximo en la cantidad
      }));
      // Establece el valor de la talla correspondiente al corte seleccionado
      form.setFieldsValue({
        detalles: form
          .getFieldValue("detalles")
          .map((detalle, index) =>
            index === fieldKey ? { ...detalle, talla: corte.talla } : detalle
          ),
      });
    }
  };

  return (
    <Modal
      title="Nueva Lavandería" // Título del modal
      open={openModal} // Controla si el modal está abierto
      styles={{ header: { textAlign: "center" } }} // Centra el título del modal
      onCancel={() => closeModal(false)} // Cierra el modal al hacer clic en el botón de cancelación
      onOk={form.submit} // Envía el formulario cuando se hace clic en el botón de confirmación
      okText="Añadir" // Texto del botón de confirmación
      centered // Centra el modal en la pantalla
      width={550} // Establece el ancho del modal
    >
      <Form
        form={form} // Asocia el formulario con el estado de Ant Design
        layout="vertical" // Establece el layout del formulario como vertical
        size="large" // Establece el tamaño grande para los elementos del formulario
        labelAlign="left" // Alinea las etiquetas a la izquierda
        onFinish={async (values) => { // Llama a esta función cuando el formulario se envíe
          await addLavanderia(id, values); // Llama a la API para agregar la lavandería
          form.resetFields(); // Limpia los campos del formulario
          reload(); // Recarga los datos en el componente padre
          closeModal(false); // Cierra el modal después de enviar
        }}
      >
        {/* Lista de detalles de lavandería */}
        <Form.List name="detalles">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field}>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {/* Campo Corte */}
                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "corte_id"]}
                        label="Corte"
                        rules={[{ required: true, message: "Seleccione un corte" }]} // Asegura que se seleccione un corte
                      >
                        <Select
                          placeholder="Selecciona la prenda - talla"
                          onChange={(value) => handleCorteChange(field.name, value)} // Llama a la función cuando se selecciona un corte
                        >
                          {cortes.map((corte) => (
                            <Select.Option
                              key={corte.corte_id}
                              value={corte.corte_id}
                            >
                              {corte.producto} - {corte.talla}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Campo Color */}
                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "color_id"]}
                        label="Color"
                        rules={[{ required: true, message: "Seleccione un color" }]} // Asegura que se seleccione un color
                      >
                        <Select placeholder="Selecciona el color">
                          {colores.map((color) => (
                            <Select.Option
                              key={color.nombre}
                              value={color.color_id}
                            >
                              {color.nombre}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Campo Cantidad Enviada */}
                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "cantidad_enviada"]}
                        label="Cantidad"
                        rules={[
                          { required: true, message: "Ingrese la cantidad enviada" },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (value > 0) {
                                return Promise.resolve(); // Acepta valores mayores a 0
                              }
                              return Promise.reject(
                                new Error("La cantidad enviada debe ser mayor a 0")
                              ); // Rechaza valores menores o iguales a 0
                            },
                          }),
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          min={0}
                          max={maxValues[field.name] || 0} // Establece el valor máximo dinámico
                          placeholder={`Máx: ${maxValues[field.name] || "-"}`}
                        />
                      </Form.Item>
                    </Col>

                    {/* Campo Precio por Unidad */}
                    <Col span={12}>
                      <Form.Item
                        name={[field.name, "precio_unidad"]}
                        label="Precio"
                        rules={[{ required: true, message: "Ingrese el precio por unidad" }]} // Asegura que se ingrese el precio
                      >
                        <InputNumber style={{ width: "100%" }} min={0} placeholder="Precio" />
                      </Form.Item>
                    </Col>

                    {/* Campo Lavandería Asignada */}
                    <Col span={24}>
                      <Form.Item
                        name={[field.name, "lavanderia_asignada"]}
                        label="Lavandería"
                        rules={[{ required: true, message: "Ingrese la lavandería asignada" }]} // Asegura que se ingrese la lavandería asignada
                      >
                        <Input placeholder="Lavandería Asignada" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Botón para eliminar el detalle */}
                  <Button
                    type="danger"
                    style={{ background: "red", marginBottom: "10px" }}
                    onClick={() => remove(field.name)}
                    block
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              {/* Botón para agregar más detalles */}
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

export default AddLavanderiaModal; // Exporta el componente para su uso en otras partes de la aplicación
