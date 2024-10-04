import React,{useEffect,useState} from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { addIncidencia } from "../../../Shared/api/Incidencia";

const { TextArea } = Input;

const AddIncidenciaModal = ({
    openModal,
    closeModal,
    reload,
    setReload,
    id,
}) =>{
    
    const [form] = Form.useForm()

    useEffect(()=>{
        console.log(id)
    },[id,form])

    return(
        <Modal
            getContainer={false}
            title={"Nueva Incidencia"}
            open={openModal}
            onCancel={()=> {
                closeModal(false)
            }}
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
                    addIncidencia(id, values)
                    setReload(!reload)
                    closeModal(false)
                    form.resetFields();
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
                            {value:"1",label:"Familiar"},
                            {value:"2",label:"Salud"},
                            {value:"3",label:"Personal"}
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

                </Form>

        </Modal>
    )

}

export default AddIncidenciaModal