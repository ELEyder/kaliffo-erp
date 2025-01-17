import { Form, Modal, Input, InputNumber, Button, Select } from "antd"; // Importa componentes de Ant Design
import React, { useState, useEffect } from "react"; // Importa React y hooks
import { addCorte } from "@AP/Corte"; // Función para agregar corte desde la API
import { getProductoByLote } from "@AA/Producto"; // Función para obtener productos de un lote desde la API
import { getTrabajadores } from "@AA/Usuario"; // Función para obtener trabajadores (talleres) desde la API
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL

const AddCorteModal = ({ openModal, closeModal, reload }) => {
  const { id } = useParams(); // Obtiene el ID del lote desde la URL
  const [form] = Form.useForm(); // Crea el formulario utilizando Ant Design
  const [productos, setProductos] = useState([]); // Estado para almacenar productos obtenidos
  const [talleres, setTalleres] = useState([]); // Estado para almacenar talleres (trabajadores)

  // useEffect para obtener productos y trabajadores al cargar el componente
  useEffect(() => {
    getProductoByLote(id, setProductos); // Llama a la API para obtener productos por lote
    getTrabajadores("talleres", setTalleres); // Llama a la API para obtener trabajadores
  }, []);

  return (
    <Modal
      getContainer={false} // Evita que el modal se renderice en el contenedor de Ant Design
      title="NUEVOS CORTES" // Título del modal
      styles={{ header: { textAlign: "center" } }} // Centra el título del modal
      open={openModal} // Controla si el modal está abierto
      onCancel={() => closeModal(false)} // Cierra el modal al hacer clic en el botón de cancelación
      okText="Añadir" // Texto del botón de confirmación
      onOk={form.submit} // Envía el formulario cuando se hace clic en el botón de confirmación
      centered // Centra el modal en la pantalla
      width={600} // Establece el ancho del modal
    >
      <Form
        style={{ margin: "0 auto" }} // Centra el formulario
        size="large" // Tamaño grande para el formulario
        form={form} // Asocia el formulario con el estado de Ant Design
        labelAlign="center" // Centra las etiquetas
        layout="vertical" // Establece el layout de formulario vertical
        onFinish={async (values) => { // Llama a esta función cuando el formulario se envíe
          await addCorte(id, values); // Llama a la API para agregar el corte
          form.resetFields(); // Limpia los campos del formulario
          reload(); // Vuelve a cargar los datos en el componente padre
          closeModal(false); // Cierra el modal después de enviar
        }}
        initialValues={{
          detalles: [{ cantidad_enviada: null, talla: null, taller_id: null }], // Valores iniciales para los detalles del corte
        }}
      >
        {/* Campo Producto */}
        <Form.Item
          name="producto_id"
          label="Producto"
          rules={[{ required: true, message: "Producto es requerido" }]} // Asegura que el campo sea obligatorio
        >
          <Select placeholder="Seleccione productos">
            {productos?.map((producto) => (
              <Select.Option key={`producto_${producto.producto_id}`} value={producto.producto_id}>
                {producto.nombre} {/* Muestra el nombre de cada producto */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Detalles del Corte (lista de detalles) */}
        <Form.List name="detalles">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {/* Campo Cantidad Enviada */}
                  <Form.Item
                    name={[field.name, "cantidad_enviada"]}
                    label="Cantidad Enviada"
                    rules={[{ required: true, message: "Cantidad enviada es requerida" }]} // Asegura que el campo sea obligatorio
                  >
                    <InputNumber style={{ width: "100%" }} min={1} /> 
                  </Form.Item>

                  {/* Campo Talla */}
                  <Form.Item
                    name={[field.name, "talla"]}
                    label="Talla"
                    rules={[{ required: true, message: "Talla es requerida" }]} // Asegura que el campo sea obligatorio
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>

                  {/* Campo Taller */}
                  <Form.Item name={[field.name, "taller_id"]} label="Taller">
                    <Select placeholder="Seleccione el taller">
                      {talleres.map((taller) => (
                        <Select.Option key={`taller_${taller.trabajador_id}`} value={taller.trabajador_id}>
                          {`${taller.nombre} ${taller.ap_paterno} ${taller.ap_materno}`} {/* Muestra el nombre del taller */}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Botón para eliminar el detalle */}
                  <Button type="danger" onClick={() => remove(field.name)}>
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

export default AddCorteModal; // Exporta el componente para su uso en otras partes de la aplicación
