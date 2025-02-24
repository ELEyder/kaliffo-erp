import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Hook para la navegación
import { loginApi } from "@A/auth/Login"; // Función para realizar el login a través de la API
import { useSession } from "../../context/AuthProvider"; // Hook para manejar la sesión
import { Yeti } from "../../Components/icons"; // Componente Yeti
import styles from "./LoginView.module.css"; // Estilos específicos para este componente
import { Button, Input } from 'antd';
import { useNotification } from "../../provider/NotificationProvider";

const LoginView = () => {
    const navigate = useNavigate(); // Inicializa el hook de navegación
    const openNotification = useNotification(); // Usa el hook para obtener la función `open`
    const { user, login } = useSession(); // Obtiene la función login del contexto
    const [isFocused, setIsFocused] = useState(false); // Estado para el foco en los campos
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para la visibilidad de la contraseña
    const [formData, setFormData] = useState({ username: "", password: "" }); // Estado para los datos del formulario
    const usernames = ["administrador", "venta", "produccion"];

    // Manejar los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Controlar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        const response = await loginApi(formData); // Llama a la API de login
        if (response.ok) {
            login(response.userData); // Si el login es exitoso, guarda la información del usuario
            navigate("/trabajadores/tipo/ventas"); // Redirige al usuario al panel de administración
        } else {
            openNotification("Dni o contraseña incorrectos."); // Muestra notificación en caso de error
        }
    };
    return (user && usernames.includes(user.rol ?? '')) ? (
        <Navigate to={'/trabajadores/tipo/ventas'}/>
    ) :
        (
        <div className={styles.body}>
            <div className={styles.content}>
                {/* Formulario de login */}
                <form id="login" onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.title}><span className={styles.upper}>I</span>niciar <span className={styles.upper}>S</span>esión</h2>
                    <div className={styles.yeti}>
                        {/* Componente Yeti para mostrar una animación o efecto */}
                        <Yeti
                            styles={styles}
                            isFocused={isFocused} // Pasa el estado de foco
                            isPasswordVisible={isPasswordVisible} // Pasa el estado de visibilidad de la contraseña
                        />
                    </div>
                    {/* Campo para el nombre de usuario */}
                    <div className={styles.formGroup}>
                        <Input
                            placeholder="Usuario"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            name="username"
                            required
                        />

                    </div>
                    {/* Campo para la contraseña */}
                    <div
                        className={styles.formGroup}
                        tabIndex={0} // Hace que el contenedor sea focuseable
                        onFocus={() => setIsFocused(true)} // Activa el estado cuando se enfoca
                        onBlur={(e) => {
                            // Desactiva el estado solo si el foco sale del contenedor y sus hijos
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                setIsFocused(false);
                            }
                        }}
                    >
                        <div className={styles.passwordWrapper}>
                            <Input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="off"
                                name="password"
                                required
                            />
                            {/* Botón para alternar la visibilidad de la contraseña */}
                            <Button
                                onClick={togglePasswordVisibility}
                                aria-label="Toggle Password Visibility"
                            >
                                {isPasswordVisible ? "🙈" : "👁️"}
                            </Button>
                        </div>
                    </div>
                    {/* Botón para enviar el formulario */}
                    <Button onClick={handleSubmit}>
                        Ingresar
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
