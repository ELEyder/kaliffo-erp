import React, { useEffect, useState } from "react"; // Importa React y hooks
import { useParams } from "react-router-dom"; // Importa hook para obtener parámetros de la URL
import {
  Form,
  Modal,
  Button,
  Card,
  InputNumber,
  Input,
  Typography,
  Select,
  Row,
  Col,
  Divider,
} from "antd"; // Importa componentes de Ant Design

import { getChangeCorte, changeStatusCorte } from "@AP/Corte"; // Funciones de API para obtener y cambiar datos de corte
import { getChangeLavanderia, changeStatusLavanderia } from "@AP/Lavanderia"; // Funciones de API para lavandería
import { changeStatusAcabado, getChangeAcabado } from "../../../API/produccion/Acabado"; // Funciones de API para acabado
import { getTiendas } from '../../../API/administrativo/Tienda'; // Función de API para obtener tiendas
import { getAlmacenes } from '../../../API/administrativo/Almacen'; // Función de API para obtener almacenes

const ChangeStatusAcabado = ({ openModal, closeModal, reload, fase, status }) => {
  const [form] = Form.useForm(); // Crea el formulario con Ant Design
  const { id } = useParams(); // Obtiene el ID de la URL
  const [data, setData] = useState([]); // Estado para almacenar los datos de la fase (corte, lavandería, acabado)
  const [almacenes, setAlmacenes] = useState([]); // Estado para almacenar los almacenes
  const [tiendas, setTiendas] = useState([]); // Estado para almacenar las tiendas
  const [opciones, setOpciones] = useState([]); // Estado para almacenar la combinación de almacenes y tiendas
  const [faseText, setFaseText] = useState(""); // Estado para establecer el texto de la fase

  // Efecto para cargar datos según la fase seleccionada
  useEffect(() => {
    switch (fase) {
      case 1:
        setFaseText("Corte");
        getChangeCorte(id, setData, form); // Obtiene los datos de corte
        break;
      case 2:
        setFaseText("Lavanderia");
        getChangeLavanderia(id, setData, form); // Obtiene los datos de lavandería
        break;
      case 3:
        setFaseText("Acabado");
        getChangeAcabado(id, setData, form); // Obtiene los datos de acabado
        break;
      default:
        break;
    }

    getAlmacenes(setAlmacenes); // Obtiene los almacenes
    getTiendas(setTiendas); // Obtiene las tiendas

    // Combina almacenes y tiendas para las opciones
    setOpciones(almacenes.concat(tiendas));
    console.log("Tiendas y Almacenes: ", opciones);
  }, [id, reload]); // El efecto se ejecuta cuando el ID o la función de recarga cambia

  // Handler para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue().items; // Obtiene los valores de los items del formulario
      switch (fase) {
        case 1:
          await changeStatusCorte(id, values); // Cambia el estado del corte
          reload()
          break;
        case 2:
          await changeStatusLavanderia(id, values); // Cambia el estado de lavandería
          reload()
          break;
        case 3:
          const params = form.getFieldValue().id; // Obtiene el parámetro de ID (almacén o tienda)
          await changeStatusAcabado(id, values, params); // Cambia el estado del acabado
          reload()
          break;
        default:
          break;
      }

      form.resetFields(); // Resetea los campos del formulario
      reload(); // Recarga los datos en el componente padre
      closeModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar:", error); // Manejo de errores
    }
  };

  // Estilos reutilizables para tarjetas y columnas
  const cardTitleStyle = { textAlign: "center" };
  const columnCenterStyle = { textAlign: "center" };

  return (
    <Modal
      forceRender
      getContainer={false}
      styles={{ header: { textAlign: "center" } }}
      title="ACABADOS RECIBIDOS"
      open={openModal}
      onCancel={closeModal} // Cierra el modal al cancelar
      footer={null} // No muestra los botones de footer predeterminados
    >
      <Form
        form={form} // Asocia el formulario con el estado de Ant Design
        layout="vertical" // Establece el layout del formulario como vertical
        name="changeStatusAcabado"
        style={{
          maxWidth: 600, // Establece el ancho máximo del formulario
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off" // Desactiva el autocompletado del navegador
      >
        <Form.Item name="id">
          {/* Select para elegir entre almacén o tienda */}
          <Select>
            {opciones.map((opcion, index) => (
              opcion.tienda ? (
                <Select.Option key={index} value={`tienda_id=${opcion.tienda_id}`}>
                  {opcion.tienda} {/* Muestra el nombre de la tienda */}
                </Select.Option>
              ) : (
                <Select.Option key={index} value={`almacen_id=${opcion.almacen_id}`}>
                  {opcion.almacen} {/* Muestra el nombre del almacén */}
                </Select.Option>
              )
            ))}
          </Select>
        </Form.Item>

        <Form.List name="items">
          {() => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 20,
              }}
            >
              {/* Itera sobre los datos de la fase y muestra una tarjeta por cada uno */}
              {data.map((field, index) => (
                <Card
                  key={index}
                  size="small"
                  title={`${faseText} ${index + 1}`} // Muestra el nombre de la fase y el índice
                  style={cardTitleStyle}
                >
                  <Row justify="center">
                    <Col span={24} style={columnCenterStyle}>
                      {field.detallesCorte} {/* Muestra los detalles del corte o fase */}
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Cantidad Recibida"
                        name={[index, "cantidad_recibida"]} // Asocia este campo al índice de la lista
                        rules={[{ required: true, message: "Ingrese una cantidad válida" }]} // Validación
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          max={field.cantidad_recibida} // Establece el máximo de cantidad según el dato recibido
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Input type="hidden" name={[index, "id"]} /> {/* Campo oculto para almacenar el ID */}
                </Card>
              ))}
            </div>
          )}
        </Form.List>

        <Divider /> {/* Agrega una línea divisoria */}

        {/* Botón para guardar los cambios */}
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeStatusAcabado; // Exporta el componente
