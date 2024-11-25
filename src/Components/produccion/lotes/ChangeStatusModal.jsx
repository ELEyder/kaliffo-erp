import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Modal, Button, Card, InputNumber, Typography } from "antd";

import { getChangeCorte, changeStatusCorte } from "@AP/Corte";
import { getChangeLavanderia, changeStatusLavanderia } from "@AP/Lavanderia";

const ChangeStatusModal = ({ openModal, closeModal, reload, fase }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [faseText, setFaseText] = useState("None");
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
    }
  }, [id, reload]);

  const handleSubmit = async () => {
      const values = form.getFieldsValue().items;
      console.log("Values:", values)
      switch (fase){
        case 1:
          changeStatusCorte(id, values);
          break
        case 2:
          changeStatusLavanderia(id, values);
          break
      }
      form.resetFields();
      reload();
      closeModal();
  };

  return (
    <Modal
      forceRender
      getContainer={false}
      title="Formulario Dinámico"
      open={openModal}
      onCancel={closeModal}
      footer={null}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="addProductos"
        style={{ maxWidth: 600, display: "flex", flexDirection: 'column' }}
        autoComplete="off"
      >
        <Form.List name="items">
          {(fields) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {data.map((field, index) => (
                <Card size="small" title={`Corte ${index}`} key={index}>
                  <Form.Item label={`${faseText} ID`} name={[index, `id`]} required>
                    <InputNumber readOnly/>
                  </Form.Item>
                  <Form.Item label="Cantidad Recibida" name={[index, 'cantidad_recibida']} required>
                    <InputNumber max={field.cantidad_recibida} />
                  </Form.Item>
                </Card>
              ))}
            </div>
          )}
        </Form.List>

        {/* Mostrar valores del formulario en desarrollo */}
        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue().items, null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}

        <Form.Item>
          <Button onClick={handleSubmit} type="primary">
            Crear
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeStatusModal;
