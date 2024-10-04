import React,{useEffect,useState} from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { AñadirIncidencia } from "../../../Shared/api/Funciones_Fetch";

const { TextArea } = Input;

const AddIncidenciaModal = ({ModalIncidenciasAbierto,closeModalIncidencias,id,IncidenciaExitosa}) =>{
    
    const [form] = Form.useForm()

    useEffect(()=>{
        if(id){
            console.log(id)
            form.setFieldsValue({usuario_id:id})
        }
    },[id,form])

    return(
        <Modal
            getContainer={false}
            title={"Nueva Incidencia"}
            open={ModalIncidenciasAbierto}
            onCancel={closeModalIncidencias}
            okText="Añadir"
            style={{textAlign:"center",textTransform:"uppercase"}}
            onOk={form.submit}
            centered={true}
            width={500}
            >

                <Form
                style={{maxWidth:500,margin:"0 auto"}}
                size="large"
                layout="vertical"
                form={form}
                labelAlign="center"
                id="formularioinicidencias"
                onFinish={async(values)=>{
                    await AñadirIncidencia(values)
                    form.resetFields(["tipo", "descripcion"]);
                    IncidenciaExitosa()
                }}
                >
                    <Form.Item
                    name="tipo"
                    label="Tipo"
                    rules={[
                        {
                            required:true,
                            message:"Tipo requerido"
                        }
                    ]}>
                        <Select options={[
                            {value:"1",label:"Incidencia Familiar"},
                            {value:"2",label:"Incidencia Laboral"},
                            {value:"3",label:"Otros"}
                        ]}/>
                    </Form.Item>

                    <Form.Item
                    name="descripcion"
                    label="Descripcion"
                    rules={[
                        {
                            required:true,
                            message:"Descripcion Requerida"
                        }
                    ]}>
                        <TextArea
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />

                    </Form.Item>

                    <Form.Item
                    name="usuario_id"
                    noStyle>
                        <Input type="hidden"/>
                    </Form.Item>


                </Form>

        </Modal>
    )

}

export default AddIncidenciaModal