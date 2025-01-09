// ESTA VISTA ES SOLO PARA TESTEO, PRUEBA LA RUTA "test" PARA VISUALIZAR ESTE CONTENIDO
import React, { useState } from "react";

const FocusableDiv = () => {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true); // Activa el estado al enfocar el input o el div
  };

  const handleBlur = (e) => {
    // Desactiva el estado solo si el foco no está en el div o en su input
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsActive(false);
    }
  };

  return (
    <div
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        padding: "20px",
        backgroundColor: isActive ? "lightblue" : "lightgray",
        border: "2px solid",
        borderColor: isActive ? "blue" : "gray",
        cursor: "pointer",
      }}
    >
      <input
        type="text"
        id="password"
        name="password"
        autoComplete="off"
        required
        onFocus={handleFocus} // También activa el estado al enfocar el input
        style={{
          marginBottom: "10px",
        }}
      />
      <button onClick={() => alert("¡Botón clicado!")}>Botón</button>
      <p>{isActive ? "¡Activo! (Foco en el div o input)" : "Inactivo (Haz clic o enfoca)"}</p>
    </div>
  );
};

export default FocusableDiv;
