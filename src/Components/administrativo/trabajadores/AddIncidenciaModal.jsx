import React from "react";
import { addIncidencia } from "../../API/Incidencia";
import { Form, Input, Modal, Select } from "antd";

const { TextArea } = Input;

const AddIncidenciaModal = ({
    openModal,
    closeModal,
    reload,
    id,
}) =>{
    
    const [form] = Form.useForm()

    return(
        <Modal
            forceRender
            getContainer={false}
            title={"Añadir nueva incidencia"}
            open={openModal}
            onCancel={closeModal}
            okText="Añadir"
            onOk={form.submit}
            centered={true}
            width={500}>
                <Form
                style={{maxWidth:500,margin:"0 auto"}}
                size="large"
                layout="vertical"
                form={form}
                labelAlign="center"
                id="formularioinicidencias"
                onFinish={async(values)=>{
                    addIncidencia(id, values)
                    reload()
                    closeModal(false)
                    form.resetFields();
                }}>
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
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Form.Item>
                </Form>
        </Modal>
    )
}

export default AddIncidenciaModal