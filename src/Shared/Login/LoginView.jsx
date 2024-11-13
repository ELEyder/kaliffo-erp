import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Form } from "antd";
import Yeti from "@C/Yeti";
import styles from './LoginView.module.css'

const LoginView = () =>{

    const [form] = Form.useForm()
    const [isFocused, setIsFocused] = useState(true);

    return(
    <>
    <div className={styles.body}>
        <div className={styles.content}>
            <Form form={form} layout="vertical">
                <h2 className={styles.title}>Iniciar Sesión</h2>
                <div className={styles.yeti}>
                    <Yeti styles={styles} isFocused={isFocused}/>
                </div>
                <Form.Item name="username" label="Username:">
                    <Input autoComplete="username"/>
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input.Password
                    autoComplete="current-password"
                    onFocus={() => setIsFocused(false)}
                    onBlur={() => setIsFocused(true)}
                    />
                </Form.Item>
            </Form>
            <Link to="/admin/trabajadores/tipo/ventas">
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