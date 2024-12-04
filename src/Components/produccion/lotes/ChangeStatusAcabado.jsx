import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "antd";

import { getChangeCorte, changeStatusCorte } from "@AP/Corte";
import { getChangeLavanderia, changeStatusLavanderia } from "@AP/Lavanderia";
import { changeStatusAcabado, getChangeAcabado } from "../../../API/produccion/Acabado";
import { getTiendas } from '../../../API/administrativo/Tienda'
import { getAlmacenes } from '../../../API/administrativo/Almacen'
const ChangeStatusAcabado = ({ openModal, closeModal, reload, fase }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [tiendas, setTiendas] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [faseText, setFaseText] = useState("");

  useEffect(() => {
    switch (fase){
      case 1:
        setFaseText("Corte")
        getChangeCorte(id, setData, form);
        break
      case 2:
        setFaseText("Lavanderia")
        getChangeLavanderia(id,setData,form)
        break
      case 3:
        setFaseText("Acabado")
        getChangeAcabado(id,setData,form)
        break
    }
    getAlmacenes(setAlmacenes)
    getTiendas(setTiendas)
    setOpciones(almacenes.concat(tiendas))
    console.log("Tiendas y Almacenes: ", opciones)
    
  }, [id, reload]);

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue().items;
      switch (fase){
        case 1:
          changeStatusCorte(id, values);
          break
        case 2:
          changeStatusLavanderia(id, values);
          break
        case 3:
          const params = form.getFieldValue().id
          changeStatusAcabado(id, values, params );
          break
      }

      form.resetFields();
      reload();
      closeModal();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Constantes de estilos
  const cardTitleStyle = { textAlign: "center"};
  const columnCenterStyle = { textAlign: "center" };

  return (
    <Modal
      forceRender
      getContainer={false}
      styles={{header:{textAlign:"center"}}}
      title="ACABADOS RECIBIDOS"
      open={openModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="changeStatusAcabado"
        style={{
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off"
      >
        <Form.Item name="id">
        <Select>
          {opciones.map((opcion, index) => (
            opcion.tienda ? 
            <Select.Option key={index} value={`tienda_id=${opcion.tienda_id}`}>
              {opcion.tienda}
            </Select.Option> : 
            <Select.Option key={index} value={`almacen_id=${opcion.almacen_id}`}>
              {opcion.almacen}
            </Select.Option>
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
              {data.map((field, index) => (
                <Card
                  key={index}
                  size="small"
                  title={`${faseText} ${index + 1}`}
                  style={cardTitleStyle}
                >
                  <Row justify="center">
                    <Col span={24} style={columnCenterStyle}>
                      {field.detallesCorte}
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Cantidad Recibida"
                        name={[index, "cantidad_recibida"]}
                        rules={[
                          {
                            required: true,
                            message: "Ingrese una cantidad válida",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          max={field.cantidad_recibida}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Input type="hidden" name={[index, "id"]} />
                </Card>
              ))}
            </div>
          )}
        </Form.List>

        <Divider />

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeStatusAcabado;
