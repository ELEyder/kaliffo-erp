import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para la navegación
import { loginApi } from "@A/auth/Login"; // Función para realizar el login a través de la API
import { useSession } from "../../context/AuthProvider"; // Hook para manejar la sesión
import Yeti from "@C/Yeti"; // Componente Yeti
import styles from "./LoginView.module.css"; // Estilos específicos para este componente

const LoginView = () => {
    const navigate = useNavigate(); // Inicializa el hook de navegación
    const { login } = useSession(); // Obtiene la función login del contexto
    const [isFocused, setIsFocused] = useState(false); // Estado para el foco en los campos
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para la visibilidad de la contraseña
    const [formData, setFormData] = useState({ username: "", password: "" }); // Estado para los datos del formulario

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
        e.preventDefault();
        const response = await loginApi(formData); // Llama a la API de login
        if (response.ok) {
            login(response.userData); // Si el login es exitoso, guarda la información del usuario
            navigate("/admin/trabajadores/tipo/ventas"); // Redirige al usuario al panel de administración
        } else {
            console.log("Dni o contraseña incorrectos."); // Muestra notificación en caso de error
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.content}>
                {/* Formulario de login */}
                <form onSubmit={handleSubmit} className={styles.form}>
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
                        <label htmlFor="username" className={styles.label}>Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={styles.input}
                            autoComplete="username"
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
                        <label htmlFor="password" className={styles.label}>Contraseña:</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={styles.input}
                                autoComplete="off"
                                required
                            />
                            {/* Botón para alternar la visibilidad de la contraseña */}
                            <button
                                type="button"
                                className={styles.toggleButton}
                                onClick={togglePasswordVisibility}
                                aria-label="Toggle Password Visibility"
                            >
                                {isPasswordVisible ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    {/* Botón para enviar el formulario */}
                    <div className={styles.formGroup}>
                        <button type="submit" className={styles.submitButton}>
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginView;
