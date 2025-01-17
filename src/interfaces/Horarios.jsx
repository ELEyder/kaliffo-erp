import { Button, Popconfirm } from "antd";
import apiClient from "../API/apiClient";

export const getColumnas = (reload) => {
  const columnas = [
    {
      title: "Fecha", // Título de la columna
      dataIndex: "fecha", // Campo de datos que se mostrará en esta columna
      key: "fecha", // Clave única para la columna
      align: "center", // Alinear contenido al centro
      sorter: { compare: (a, b) => a.fecha.localeCompare(b.fecha), multiple: 2 }, // Habilitar ordenación por fecha
      render: (fecha) => {
        if (!fecha) return "-"; // Manejar casos donde la fecha sea nula
        const date = new Date(fecha); // Convertir la fecha a objeto Date
        const day = String(date.getDate()).padStart(2, "0"); // Obtener día con dos dígitos
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtener mes con dos dígitos (getMonth es base 0)
        const year = date.getFullYear(); // Obtener año
        return `${day}/${month}/${year}`; // Formatear en DD/MM/YYYY
      },
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

  ];

  columnas.push({
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
          onConfirm={async () => {
            await apiClient.delete(`/asistencia/delete/${text}`);
            reload(); // Cambiar el estado de recarga para actualizar los datos
          }}
        >
          <Button block type="primary" danger>Eliminar</Button>
        </Popconfirm>
      );
    }
  },
  );

  return columnas
}

export const getUrl = (id) => {
  return `/asistencia?usuario_id=${id}`
}