import React, { useEffect, useState } from "react"; // Importa React y hooks
import { redirect, useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import {
  Form,
  Modal,
  Button,
  Card,
  InputNumber,
  Input,
  Row,
  Col,
  Divider,
} from "antd"; // Importa componentes de Ant Design

import { useNavigate } from "react-router-dom";
import { getChangeCorte, changeStatusCorte } from "@AP/Corte"; // Funciones de API para obtener y cambiar el estado del corte
import { getChangeLavanderia, changeStatusLavanderia } from "@AP/Lavanderia"; // Funciones de API para lavandería
import { changeStatusAcabado, getChangeAcabado } from "../../../API/produccion/Acabado"; // Funciones de API para acabado

const ChangeStatusModal = ({ openModal, closeModal, reload, fase, status }) => {
  const [form] = Form.useForm(); // Crea el formulario con Ant Design
  const { id } = useParams(); // Obtiene el ID de la URL
  const [data, setData] = useState([]); // Estado para almacenar los datos de la fase (corte, lavandería, acabado)
  const [faseText, setFaseText] = useState(""); // Estado para establecer el texto de la fase
  const navigate = useNavigate()
  // Efecto para cargar los datos según la fase seleccionada
  useEffect(() => {
    switch (fase) {
      case 1:
        setFaseText("Corte"); // Establece el texto para la fase de corte
        getChangeCorte(id, setData, form); // Obtiene los datos de corte
        break;
      case 2:
        setFaseText("Lavanderia"); // Establece el texto para la fase de lavandería
        getChangeLavanderia(id, setData, form); // Obtiene los datos de lavandería
        break;
      case 3:
        setFaseText("Acabado"); // Establece el texto para la fase de acabado
        getChangeAcabado(id, setData, form); // Obtiene los datos de acabado
        break;
      default:
        break;
    }
  }, [id, reload]); // El efecto se ejecuta cuando el ID o la función de recarga cambia

  // Handler para manejar el envío del formulario
  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue().items; // Obtiene los valores de los items del formulario
      console.log("Values:", values) // Muestra los valores en consola para depuración
      switch (fase) {
        case 1:
          await changeStatusCorte(id, values); // Cambia el estado del corte
          if (status == 2) redirect(`/lotes/${id}/lavanderia`)
          reload()
          break;
        case 2:
          await changeStatusLavanderia(id, values); // Cambia el estado de lavandería
          if (status == 2) redirect(`/lotes/${id}/acabados`)
          reload()
          break;
        case 3:
          await changeStatusAcabado(id, values); // Cambia el estado del acabado
          if (status == 2) redirect(`/lotes/${id}/almacen`)
            reload()
          break;
        default:
          reload()
          break;
      }

      form.resetFields(); // Resetea los campos del formulario
      reload(); // Recarga los datos en el componente padre
      closeModal(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar:", error); // Manejo de errores
    }
  };

  // Estilos reutilizables para las tarjetas y columnas
  const cardTitleStyle = { textAlign: "center" };
  const columnCenterStyle = { textAlign: "center" };

  return (
    <Modal
      forceRender
      getContainer={false}
      styles={{ header: { textAlign: "center" } }}
      title="MERCADERÍA RECIBIDA"
      open={openModal} // Determina si el modal está abierto o cerrado
      onCancel={closeModal} // Cierra el modal al cancelar
      footer={null} // No muestra los botones de footer predeterminados
    >
      <Form
        form={form} // Asocia el formulario con el estado de Ant Design
        layout="vertical" // Establece el layout del formulario como vertical
        name="addProductos"
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

export default ChangeStatusModal; // Exporta el componente
