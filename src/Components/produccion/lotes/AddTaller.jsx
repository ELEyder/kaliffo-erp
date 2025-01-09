import React, { useEffect, useState } from "react"; // Importa React y hooks
import { useParams } from "react-router-dom"; // Importa hook para obtener parámetros de la URL
import {
  Form,
  Modal,
  Button,
  Card,
  Select,
  Divider,
  Input,
  Row,
  Col,
} from "antd"; // Importa componentes de Ant Design

import { getAddTaller, changeStatusCorte } from "@AP/Corte"; // Funciones de API para obtener y cambiar datos de cortes
import { getTrabajadores } from "@AA/Usuario"; // Función de API para obtener los trabajadores

const AddTaller = ({ openModal, closeModal, reload }) => {
  const [form] = Form.useForm(); // Crea el formulario con Ant Design
  const { id } = useParams(); // Obtiene el ID de la URL

  const [data, setData] = useState([]); // Estado para almacenar los datos de cortes
  const [talleres, setTalleres] = useState([]); // Estado para almacenar los trabajadores/talleres

  // Efecto para cargar datos iniciales
  useEffect(() => {
    getTrabajadores("talleres", setTalleres); // Obtiene los trabajadores (talleres)
    getAddTaller(id, setData, form); // Obtiene la información de corte y la establece en el estado
  }, [id, reload]); // El efecto se ejecuta cuando el ID o la función de recarga cambia

  // Estilos reutilizables
  const cardHeaderStyle = { textAlign: "center" }; // Estilo para el encabezado de cada tarjeta
  const columnStyle = { textAlign: "center" }; // Estilo para las columnas dentro de la tarjeta

  // Handler para guardar los datos del formulario
  const handleSave = async () => {
    try {
      const values = form.getFieldsValue().items; // Obtiene los valores de los items del formulario
      console.log("Taller Añadido:", values); // Muestra los valores en la consola (para pruebas)

      await changeStatusCorte(id, values); // Llama a la función de API para cambiar el estado del corte
      form.resetFields(); // Resetea los campos del formulario
      reload(); // Recarga los datos en el componente padre
      closeModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar:", error); // Manejo de errores si algo falla
    }
  };

  return (
    <Modal
      forceRender
      getContainer={false}
      title="ASIGNAR TALLER AL CORTE" // Título del modal
      open={openModal} // Controla si el modal está abierto
      onCancel={closeModal} // Cierra el modal cuando se hace clic en el botón de cancelar
      footer={null} // No muestra botones de footer predeterminados
    >
      <Form
        form={form} // Asocia el formulario con el estado de Ant Design
        layout="vertical" // Establece el layout del formulario como vertical
        name="addTaller"
        style={{
          maxWidth: 600, // Establece el ancho máximo del formulario
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off" // Desactiva el autocompletado del navegador
      >
        <Form.List name="items">
          {() => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {/* Itera sobre los cortes y muestra un Card por cada uno */}
              {data?.map((field, index) => (
                <Card
                  key={index}
                  size="small"
                  title={`Corte ${field.corte_id}`} // Muestra el ID del corte como título de la tarjeta
                  style={cardHeaderStyle}
                >
                  <Row justify="center">
                    <Col span={24} style={columnStyle}>
                      {field.datos_corte} {/* Muestra los detalles del corte */}
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Taller" // Etiqueta para el campo de taller
                        name={[index, "taller_id"]} // Asocia este campo al índice de la lista
                        rules={[{ required: true, message: "Seleccione un taller" }]} // Validación de campo
                      >
                        <Select placeholder="Seleccione el taller">
                          {/* Itera sobre los talleres y crea una opción para cada uno */}
                          {talleres.map((taller) => (
                            <Select.Option
                              key={`taller_${taller.trabajador_id}`}
                              value={taller.trabajador_id}
                            >
                              {`${taller.nombre} ${taller.ap_paterno} ${taller.ap_materno}`} {/* Muestra el nombre completo del trabajador */}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* Campo oculto para almacenar el ID del corte */}
                  <Input
                    type="hidden"
                    name={[index, "corte_id"]}
                    value={field.corte_id}
                  />
                </Card>
              ))}
            </div>
          )}
        </Form.List>

        <Divider /> {/* Agrega una línea divisoria */}

        {/* Botón para guardar los cambios */}
        <Form.Item>
          <Button type="primary" onClick={handleSave}>
            Crear
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaller; // Exporta el componente
