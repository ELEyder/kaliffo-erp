import React, { useEffect, useState } from "react";
import { Select, ConfigProvider, DatePicker, Form, Input, Modal, Row, notification } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import { addPago } from "../../../Shared/api/Pago"

const { Option } = Select;

const Modal_add_pago = ({
  ModalAddOpen,
  setModalAddOpen,
  reload,
  setReload,
  idUsuario
}) => {
    const [api, contextHolder] = notification.useNotification(); 
  
    const[form] = Form.useForm()

  return (
    <Modal
      getContainer={false}
      title={`Añadir nueva incidencia`}
      open={ModalAddOpen}
      onCancel={() => {
        setModalAddOpen(false)
      }}
      style={{textTransform:"uppercase"}}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={500}
    >

      <Form 
      style={{ maxWidth: 500, margin:"0 auto" }}
      size="large"
      form={form}
      layout="vertical"
      labelAlign="center"
      id="formulariocrear"
      onFinish={async(values)=>{
        await addPago(idUsuario, values, reload, setReload)
        form.resetFields()
        setModalAddOpen(false)
      }}>

        <Form.Item
        style={{marginTop:20}}
          name="tipo"
          label="Tipo de Incidencia"
          rules={[
            {
              required: true,
              message:"Requerido"
            },
          ]}
        >
            <Select name="tipo">
              <Option value={1}>Familiar</Option>
              <Option value={2}>Salud</Option>
              <Option value={3}>Personal</Option>
            </Select>
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[
            {
              required: true,
              message:"Descripción requerida"
            },
          ]}
        >
            <Input/>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default Modal_add_pago;
