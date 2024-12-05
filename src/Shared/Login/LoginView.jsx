import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form } from "antd";
import Yeti from "@C/Yeti";
import styles from './LoginView.module.css';
import { loginApi } from '@A/auth/Login';
import { showNotification } from '../Notifications';
import { useSession } from "../../context/AuthProvider";

const LoginView = () => {
    const navigate = useNavigate();
    const { user, login, logout } = useSession();
    const [form] = Form.useForm();
    const [isFocused, setIsFocused] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const iconRender = (visible) => {
        if (visible) {
            setIsPasswordVisible(true)
            console.log("Contraseña visible");
            return <span>👁️</span>;
        } else {
            setIsPasswordVisible(false)
            console.log("Contraseña oculta");
            return <span>👁️‍🗨️</span>;
        }
    };
    return (
        <>
            <div className={styles.body}>
                <div className={styles.content}>
                    <Form 
                        form={form} 
                        layout="vertical" 
                        onFinish={async (values) => {
                            const response = await loginApi(values);
                            if (response.ok) {
                                login(response.userData);
                                navigate("/admin/trabajadores/tipo/ventas");
                            } else {
                                showNotification("error", "Dni o contraseña incorrectos.");
                            }
                        }}
                    >
                        <h2 className={styles.title}>Iniciar Sesión</h2>
                        <div className={styles.yeti}>
                            <Yeti styles={styles} isFocused={!isFocused} isPasswordVisible={isPasswordVisible} />
                        </div>
                        <Form.Item 
                            name="username" 
                            label="Usuario:"
                            rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
                        >
                            <Input autoComplete="username" />
                        </Form.Item>
                        <Form.Item 
                            name="password" 
                            label="Contraseña:"
                            rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                        >
                            <Input.Password
                                autoComplete="current-password"
                                visibilityToggle
                                onFocus={() => setIsFocused(false)}
                                onBlur={() => setIsFocused(true)}
                                iconRender={iconRender}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={form.submit}>
                                Ingresar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default LoginView;
