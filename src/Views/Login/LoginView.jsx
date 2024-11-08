import { Button, Input, Form } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Yeti from "../../Components/svg/Yeti";
import "@/assets/css/login/login.css"
const LoginView = () =>{

    const [form] = Form.useForm()

    const [isFocused, setIsFocused] = useState(true);


    return(
    <>
    <div className="body-login">
        <div className="content-login">
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
                    onFocus={() => setIsFocused(false)}
                    onBlur={() => setIsFocused(true)}
                    />
                </Form.Item>
            </Form>
            <Link to="/trabajadores/tipo/ventas">
                <Button type="primary">
                    Ingresar
                </Button>
            </Link>
        </div>
    </div>
    </>
    )
}

export default LoginView