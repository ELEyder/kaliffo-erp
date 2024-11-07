import { Button, Input, Form } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Yeti from "../../Components/svg/Yeti";
const LoginView = () =>{

    const [form] = Form.useForm()

    const [isFocused, setIsFocused] = useState(false);

    return(
    <>
        <link rel="stylesheet" href="css/login/login.css" />
        <div className="content">
            <Form form={form} layout="vertical">
                <h2>Iniciar Sesión</h2>
                <div className="yeti">
                    <Yeti isFocused={isFocused}/>
                </div>
                <Form.Item name="username" label="Username">
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    />
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