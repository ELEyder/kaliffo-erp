import { Button, Input, Form } from "antd";
import React from "react";
import { Link, Navigate } from "react-router-dom";
const LoginView = () =>{

    const [form] = Form.useForm()
    return(
    <>
        <link rel="stylesheet" href="css/login/login.css" />
        <div className="content">
            <Form form={form} layout="vertical">
                <div className="monkey">
                    
                </div>
                <h1>Iniciar Sesión</h1>
                <Form.Item name="username" label="Username">
                    <Input/>
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input/>
                </Form.Item>
            </Form>
            <Link to="/trabajadores/tipo/ventas">
                <Button type="primary">
                    Ingresar
                </Button>
            </Link>
        </div>
    </>
    )
}

export default LoginView