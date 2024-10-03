import React, { useEffect, useState } from "react";
import { Col, ConfigProvider, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { fetchTiendas, manejonumeros, manejotexto } from "../../../Shared/api/Funciones_Fetch";
import { addUsuario } from "../../../Shared/api/Usuario";


const Modal_añadir = ({
  ModalAñadirAbierto,
  closeModalAñadir,
  tipo_trabajador,
  AñadidoExitoso
}) => {

    const[tiendas,setTiendas]=useState([])

    const[form] = Form.useForm()

    useEffect(()=>{
        if(tipo_trabajador==="ventas"){
            fetchTiendas(setTiendas)
        }
        form.setFieldsValue({tipo_trabajadorh:tipo_trabajador})
    },[tipo_trabajador, form])



  return (
    <Modal
      getContainer={false}
      title={`Añadir nuevo trabajador de ${tipo_trabajador}`}
      open={ModalAñadirAbierto}
      onCancel={closeModalAñadir}
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
        await addUsuario(values)
        form.resetFields()
        AñadidoExitoso()
      }}>

        <Form.Item
        style={{marginTop:20}}
          name="nombre"
          label="Nombres"
          rules={[
            {
              required: true,
              message:"Nombres requeridos"
            },
          ]}
        >
            <Input onChange={manejotexto(form, "nombre")} />
        </Form.Item>
        
        <Row
          justify="space-around" 
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>

            <Col span={12} className="gutter-row">

                <Form.Item
                name="ap_paterno"
                label="Apellido Paterno"
                rules={[
                    {
                    required: true,
                    message:"Apellido Paterno Requerido"
                    },
                ]}
                >
                    <Input onChange={manejotexto(form, "ap_paterno")}/>
                </Form.Item>

            </Col>

            <Col span={12} className="gutter-row" >

                <Form.Item
                name="ap_materno"
                label="Apellido Materno"
                rules={[
                    {
                    required: true,
                    message:"Apellido Materno Requerido"
                    },
                ]}
                >
                    <Input onChange={manejotexto(form, "ap_materno")}/>
                </Form.Item>

            </Col>

        </Row>

        <Row
        justify="space-around"
        align="middle"
        gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>

            <Col span={12} className="gutter-row">

                <Form.Item
                label="Fecha Nacimiento"
                name="fecha_nacimiento"
                rules={[
                    {
                        required:true,
                        message:"Fecha Nacimiento requerido"
                    }
                ]}>
                      <DatePicker
                      placeholder="YYYY-MM-DD"
                      format={"YYYY-MM-DD"}
                      />
                </Form.Item>

            </Col>

            <Col span={12} className="gutter-row">

                <Form.Item
                name="telefono"
                label="Telefono"
                rules={[
                    {
                    required: true,
                    message:"Telefono Requerido"
                    },
                ]}
                >
                    <Input maxLength={9} showCount onChange={manejonumeros(form, "telefono")}/>
                </Form.Item>

            </Col>
        </Row>

        <Row
        justify="space-around"
        align="middle"
        gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>

            <Col span={10} className="gutter-row">

                <Form.Item
                name="dni"
                label="DNI"
                rules={[
                    {
                    required: true,
                    message:"DNI requerido"
                    },
                ]}
                >
                    <Input maxLength={8} showCount onChange={manejonumeros(form, "dni")}/>
                </Form.Item>

            </Col>


            <Col span={14} className="gutter-row">

                {tipo_trabajador==="ventas"?
                (
                    <Form.Item
                    name="tienda_id"
                    label="Tienda Asignada"
                    rules={[
                        {
                        required: true,
                        message:"Tienda Asignada"
                        },
                    ]}
                    >
                        <Select options={tiendas.map(tienda => ({
                            value:tienda.tienda_id,
                            label: tienda.tienda.tienda,
                            key:tienda.tienda_id,
                        }))}/>
                    </Form.Item>
                ):null}

            </Col>

        </Row>

        <Form.Item
        name="tipo_trabajadorh"
        noStyle>
            <Input type="hidden"/>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default Modal_añadir;
