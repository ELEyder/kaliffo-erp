import React, { useEffect, useState } from "react"; // Importa React y hooks
import { useNavigate } from 'react-router-dom'; // Hook para navegar entre rutas
import AddTelasModal from "./AddTelasModal"; // Importa el componente para agregar nuevas telas
import { getTelas } from "@AP/Tela"; // Función para obtener las telas desde la API
import { Card, Flex, FloatButton } from "antd"; // Componentes de Ant Design
import styles from './TelasCards.module.css'; // Estilos CSS para el componente

const TelasCards = () => {
  const navigate = useNavigate(); // Hook de navegación
  const [telas, setTelas] = useState([]); // Estado para almacenar las telas
  const [OpenAddTela, setOpenAddTela] = useState(false); // Estado para controlar la visibilidad del modal para añadir telas
  const [reload, setReload] = useState(false); // Estado para controlar la recarga de los datos

  // useEffect para obtener las telas cuando se cargue el componente o cuando 'reload' cambie
  useEffect(() => {
    getTelas(setTelas); // Llama a la API para obtener las telas y las almacena en el estado 'telas'
  }, [reload]); // Dependencia de 'reload' para volver a cargar las telas cuando cambie

  return (
    <>
      {/* Flexbox para mostrar las tarjetas de tela */}
      <Flex wrap gap="middle" align="start" justify="space-evenly">
        {/* Itera sobre las telas y crea una tarjeta por cada una */}
        {telas.map((tela, index) => {
          return (
            <Card
              hoverable
              key={index} // La clave única para cada tarjeta
              title={tela.tipo} // El título de la tarjeta es el tipo de tela
              className={styles.cardTela} // Clase de estilo personalizada
              onClick={() => navigate(`/telas/${tela.tipo}`)} // Redirige a la página de detalles de la tela cuando se hace clic
            >
              <p>Stock por tela</p> {/* Descripción dentro de la tarjeta */}
              <div className={styles.body}>
                <img src="/svg/tela/box.svg" alt="" className={styles.box} /> {/* Imagen representativa */}
                <p className={styles.number}>{tela.STOCK}</p> {/* Muestra el stock disponible de la tela */}
              </div>
            </Card>
          )
        })}
      </Flex>

      {/* Botón flotante para agregar una nueva tela */}
      <FloatButton
        tooltip="Añadir Tela" // Tooltip que aparece cuando el usuario pasa el mouse sobre el botón
        onClick={() => setOpenAddTela(true)} // Abre el modal de agregar tela cuando se hace clic
      />

      {/* Modal para agregar nuevas telas */}
      <AddTelasModal
        openModal={OpenAddTela} // Prop para abrir o cerrar el modal
        closeModal={() => setOpenAddTela(false)} // Prop para cerrar el modal
        reload={() => setReload(!reload)} // Prop para recargar las telas después de agregar una nueva
      />
    </>
  );
};

export default TelasCards; // Exporta el componente para su uso en otras partes de la aplicación
