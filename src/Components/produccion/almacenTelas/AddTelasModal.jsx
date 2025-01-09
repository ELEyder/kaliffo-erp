import React, { useEffect, useState } from "react"; // Importa React y hooks
import { CloseOutlined } from '@ant-design/icons'; // Importa el ícono de cerrar
import FormItem from "antd/es/form/FormItem"; // Importa FormItem de Ant Design
import { getEmpresas } from '@AP/Empresa'; // Importa la función para obtener empresas
import { getTiposTela, addTelas } from "@AP/Tela"; // Importa funciones para obtener tipos de tela y agregar telas
import { Modal, AutoComplete, Button, Card, Form, Input, Select, Typography, DatePicker } from 'antd'; // Componentes de Ant Design

const { Option } = Select; // Desestructura Option de Select

const AddTelasModal = ({
  openModal, // Prop para controlar la visibilidad del modal
  closeModal, // Prop para cerrar el modal
  reload, // Prop para recargar los datos después de agregar una tela
}) => {
  
  const [form] = Form.useForm(); // Crea una instancia del formulario
  const [empresas, setEmpresas] = useState([]); // Estado para almacenar las empresas
  const [tiposTela, setTiposTela] = useState([]); // Estado para almacenar los tipos de tela

  // useEffect para obtener los tipos de tela y las empresas cuando se abre el modal o se recarga
  useEffect(() => {
    getTiposTela(setTiposTela); // Obtiene los tipos de tela
    getEmpresas(setEmpresas); // Obtiene las empresas
  }, [reload]);

  return (
    <Modal
      forceRender // Fuerza el renderizado del modal
      getContainer={false} // El modal no se monta en el body
      styles={{ header: { textAlign: "center" } }} // Estilo para centrar el texto del encabezado
      title="AÑADIR TELAS" // Título del modal
      open={openModal} // Determina si el modal está visible o no
      onCancel={closeModal} // Cierra el modal cuando se hace clic en el botón de cancelar
      footer={null} // No muestra pie de página en el modal
    >
      <Form
        labelCol={{ span: 6 }} // Coloca las etiquetas de los campos a la izquierda
        wrapperCol={{ span: 18 }} // Coloca los campos de entrada a la derecha
        form={form} // Asocia el formulario con la instancia
        name="addProductos" // Nombre del formulario
        style={{ maxWidth: 600 }} // Ancho máximo del formulario
        autoComplete="off" // Desactiva el autocompletado
        initialValues={{ items: [{}] }} // Inicializa con un item vacío
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {/* Mapea los campos de la lista de items */}
              {fields.map((field) => (
                <Card
                  size="small"
                  styles={{ header: { textAlign: "center", fontSize: "20px" } }}
                  title={`Tela ${field.name + 1}`} // Título de cada tarjeta
                  key={field.key}
                  extra={ // Agrega un botón para eliminar el campo
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name); // Elimina el campo actual de la lista
                      }}
                    />
                  }
                >
                  {/* Tipo de Tela */}
                  <Form.Item label="Tipo de Tela" name={[field.name, 'tipo']} rules={[
                    {
                      required: true,
                      message: "Tipo requerido", // Mensaje si no se ingresa un tipo
                    },
                  ]}>
                    <AutoComplete>
                      {tiposTela.map((tipo, index) => (
                        <Option key={index} value={tipo.tipo}>{tipo.tipo}</Option> // Mapea los tipos de tela disponibles
                      ))}
                    </AutoComplete>
                  </Form.Item>

                  {/* Metraje */}
                  <Form.Item
                    name={[field.name, 'metraje']}
                    label="Metraje"
                    rules={[
                      {
                        required: true,
                        message: "Metraje requerido", // Mensaje si no se ingresa el metraje
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* Artículo */}
                  <Form.Item
                    name={[field.name, 'articulo']}
                    label="Artículo"
                    rules={[
                      {
                        required: true,
                        message: "Artículo requerido", // Mensaje si no se ingresa el artículo
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* Empresa de Compra */}
                  <Form.Item
                    name={[field.name, 'empresa_compra']}
                    label="Empresa"
                    rules={[
                      {
                        required: true,
                        message: "Empresa requerida", // Mensaje si no se selecciona una empresa
                      },
                    ]}
                  >
                    <AutoComplete>
                      {empresas.map((tipo, index) => (
                        <Option key={index} value={tipo.empresa_compra}>{tipo.empresa_compra}</Option> // Mapea las empresas disponibles
                      ))}
                    </AutoComplete>
                  </Form.Item>

                  {/* Fecha de Compra */}
                  <Form.Item
                    name={[field.name, 'fecha_compra']}
                    label="Fecha"
                    rules={[
                      {
                        required: true,
                        message: "Fecha requerida", // Mensaje si no se ingresa una fecha
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Card>
              ))}

              {/* Botón para añadir una nueva tela */}
              <Button type="dashed" onClick={() => add()} block>
                + Nueva Tela
              </Button>
            </div>
          )}
        </Form.List>

        <FormItem>
          {/* Botón para enviar el formulario */}
          <Button
            style={{ marginTop: "10px" }}
            onClick={async () => {
              const values = form.getFieldsValue().items; // Obtiene los valores del formulario
              await addTelas(values); // Llama a la función para agregar las telas
              form.resetFields(); // Resetea el formulario
              reload(); // Recarga los datos
              closeModal(); // Cierra el modal
            }}
            type="primary"
          >
            Crear
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddTelasModal; // Exporta el componente para su uso en otras partes de la aplicación
