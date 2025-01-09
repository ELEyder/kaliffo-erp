import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@A/auth/Login";
import { showNotification } from "../Notifications";
import { useSession } from "../../context/AuthProvider";
import Yeti from "@C/Yeti";
import styles from "./LoginView.module.css";

const LoginView = () => {
    const navigate = useNavigate();
    const { login } = useSession();
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Controlar visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginApi(formData);
        if (response.ok) {
            login(response.userData);
            navigate("/admin/trabajadores/tipo/ventas");
        } else {
            showNotification("error", "Dni o contraseña incorrectos.");
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2 className={styles.title}>Iniciar Sesión</h2>
                    <div className={styles.yeti}>
                        <Yeti
                            styles={styles}
                            isFocused={isFocused}
                            isPasswordVisible={isPasswordVisible}
                        />
                    </div>
                    {/* Campo de usuario */}
                    <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.label}>
                            Usuario:
                        </label>
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
                    {/* Campo de contraseña */}
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
                        <label htmlFor="password" className={styles.label}>
                            Contraseña:
                        </label>
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
                    {/* Botón de enviar */}
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
