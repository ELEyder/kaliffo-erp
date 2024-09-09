import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { CrearTrabajador, fetchTiendas, manejonumeros, manejotexto } from "../../../Shared/Funciones/Funciones_Fetch";


const Modal_añadir = ({
  ModalAñadirAbierto,
  closeModalAñadir,
  tipo_trabajador,
}) => {

    const[tiendas,setTiendas]=useState([])

    const[form] = Form.useForm()

    useEffect(()=>{
        if(tipo_trabajador==="ventas"){
            fetchTiendas(setTiendas)
        }

        form.setFieldsValue({tipo_trabajadorh:tipo_trabajador})
    },[tipo_trabajador])



  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Añadir nuevo trabajador de ${tipo_trabajador}`}
      open={ModalAñadirAbierto}
      onCancel={closeModalAñadir}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
      width={700}
    >

      <Form 
      style={{ maxWidth: 600, margin:"0 auto" }}
      size="large"
      form={form}
      labelAlign="center"
      id="formulariocrear"
      onFinish={async(values)=>{
        await CrearTrabajador(values)
        closeModalAñadir()
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
                    placeholder="DD-MM-YYYY"
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
                            label:tienda.tienda,
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
