import { Form, Modal, Select, Input, Button, Card, Typography, Space, InputNumber } from "antd";
import { getChangeCorte } from "../../API/Corte";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { changeStatus } from "../../API/Lote";

const ChangeStatusModal = ({ openModal, closeModal }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getChangeCorte(id, setData, form);
  }, [id]);

  return (
    <>
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
          style={{ maxWidth: 600, display: "flex",flexDirection: 'column'}}
          autoComplete="off"
    >
      <Form.List name="items">
        {(fields) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {data.map((field, index) => (
              <Card
                size="small"
                title={`Corte ${field.corte_id}`}
                key={index}
              >
                <Form.Item label="corte_id " name={[index, 'corte_id']}>
                  <InputNumber max={field.corte_id}/>
                </Form.Item>
                <Form.Item label="cantidad_recibida" name={[index, 'cantidad_recibida']}>
                  <InputNumber max={field.cantidad_recibida}/>
                </Form.Item>
              </Card>
            ))}
          </div>
        )}
      </Form.List>

      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue().items, null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}

      <Form.Item>
        <Button onClick={ async ()=> {
          const values = form.getFieldsValue().items
          await changeStatus(id, values)
          console.log(values)
          form.resetFields()
          closeModal()
        }} type="primary">Crear</Button>
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};

export default ChangeStatusModal;