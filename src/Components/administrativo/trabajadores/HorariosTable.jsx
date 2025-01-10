import React, { useState, useEffect, useRef } from 'react'; // Importación de hooks de React para manejar estado y ciclos de vida
import { useParams } from 'react-router-dom'; // Hook para acceder a los parámetros de la ruta
import { Table, Button, Popconfirm } from "antd"; // Componentes de Ant Design

import { getHorariosByTrabajador, deleteHorarioById } from "@AA/Horario"; // Funciones para obtener y eliminar horarios

const HorariosTable = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL
  const reloadRef = useRef(false); // Referencia para seguir el estado de recarga sin provocar un re-render
  const [data, setData] = useState([]); // Estado para almacenar los datos de los horarios

  // Definir las columnas para la tabla de Ant Design
  const columns = [
    {
      title: "Fecha", // Título de la columna
      dataIndex: "fecha", // Campo de datos que se mostrará en esta columna
      key: "fecha", // Clave única para la columna
      align: "center", // Alinear contenido al centro
      sorter: { compare: (a, b) => a.fecha.localeCompare(b.fecha), multiple: 2 } // Habilitar ordenación por fecha
    },
    { title: "Hora de Ingreso", dataIndex: "hora_entrada", key: "hora_entrada", align: "center" }, // Mostrar hora de entrada
    { title: "Hora de Salida", dataIndex: "hora_salida", key: "hora_salida", align: "center" }, // Mostrar hora de salida
    {
      title: "Horas Trabajadas", // Columna para las horas trabajadas
      dataIndex: "horas_trabajadas", 
      key: "horas_trabajadas", 
      align: "center", 
      onCell: (record) => { // Estilo personalizado de las celdas según las horas trabajadas
        return {
          style: {
            background: record.min_trabajadas >= 540 ? 'green' : record.min_trabajadas <= 300 ? '#f54242' : '#FCFB77', // Colores según los minutos trabajados
            color: record.min_trabajadas <= 300 ? 'white' : 'black' // Cambiar color de texto para las horas trabajadas bajas
          }
        }
      }
    },
    {
      title: "Opciones", // Columna de opciones (por ejemplo, eliminar acción)
      dataIndex: "horario_id", 
      key: "opciones", 
      align: "center",
      render: (text) => { // Función de renderizado personalizada para el botón "Eliminar"
        return (
          <Popconfirm
            title="ELIMINAR" // Título de la confirmación
            description="DESEA ELIMINAR A" // Descripción de la confirmación
            okText="Confirmar" // Texto para el botón de confirmación
            cancelText="NO" // Texto para el botón de cancelación
            onConfirm={() => { 
              deleteHorarioById(text); // Eliminar el horario por su ID
              reloadRef.current = !reloadRef.current; // Cambiar el estado de recarga para actualizar los datos
            }}
          >
            <Button block type="primary" danger>Eliminar</Button> // Botón de eliminar
          </Popconfirm>
        );
      }
    },
  ];

  // Efecto para obtener los horarios cuando el componente se monta o cambia el ID/estado de recarga
  useEffect(() => {
    getHorariosByTrabajador(id, setData); // Obtener los datos de los horarios del trabajador usando el ID
  }, [id, reloadRef.current]); // Volver a ejecutar el efecto si cambia el ID o el estado de recarga

  return (
    <>
      <Table
        scroll={{ x: 'min-content' }}
        columns={columns} // Configuración de las columnas de la tabla
        dataSource={data} // Datos que se mostrarán en la tabla
        pagination={{ pageSize: 5 }} // Configuración de la paginación (5 elementos por página)
      />
    </>
  );
}

export default HorariosTable; // Exportar el componente para su uso en otras partes de la aplicación
