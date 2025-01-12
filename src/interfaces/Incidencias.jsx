import { Flex, Button, Popconfirm } from "antd";
import apiClient from "../API/apiClient";

export const getColumnas = (changeModal, setIncidencia, reload) => {
  const columnas = [
    { title: "N°", dataIndex: "id", key: "id", align: "center", render: (_, __, index) => index + 1, }, // Número de incidencia (ID)
    {
      title: "Incidencia", // Columna del tipo de incidencia
      dataIndex: "tipo",
      key: "tipo",
      align: "center",
      render: (value) => {
        const incidenciaMap = {
          1: "Familiar",
          2: "Personal",
          3: "Salud",
        };
        return incidenciaMap[value] || "Desconocido"; // Devuelve el texto correspondiente o "Desconocido" si no está mapeado
      },
      onCell: (record) => ({
        style: {
          background: record.tipo === 1 ? '#FCFB77' :
            record.tipo === 2 ? 'orange' : '#f54242', // Color según el tipo de incidencia
          color: record.tipo === 3 ? "white" : "black", // Cambio de color de texto para el tipo "Salud"
          padding: "10px"
        }
      }),
      sorter: {
        compare: (a, b) => a.incidencia.localeCompare(b.incidencia), // Ordenar incidencias por tipo
        multiple: 1,
      }
    },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion", align: "center" }, // Descripción de la incidencia
    {
      title: "Fecha", dataIndex: "fecha_creacion", key: "fecha_creacion", align: "center",
      render: (fecha) => {
        if (!fecha) return "-"; // Manejar casos donde la fecha sea nula
        const date = new Date(fecha); // Convertir la fecha a objeto Date
        const day = String(date.getDate()).padStart(2, "0"); // Obtener día con dos dígitos
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtener mes con dos dígitos (getMonth es base 0)
        const year = date.getFullYear(); // Obtener año
        return `${day}/${month}/${year}`; // Formatear en DD/MM/YYYY
      },
    }, // Fecha en que se creó la incidencia

  ];

  columnas.push({
    title: "Opciones", // Columna de opciones para editar y eliminar incidencias
    key: "opciones",
    align: "center",
    render: (record) => { // Renderizado personalizado para los botones de editar y eliminar
      return (
        <Flex gap="small" justify="center" align="middle" wrap="wrap">
          <Button type="primary"
            block
            onClick={() => {
              setIncidencia(record); // Establecer la incidencia seleccionada para editar
              changeModal("updI", true); // Abrir el modal de edición
            }}
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Estás seguro de que deseas eliminar esta incidencia?" // Confirmación para eliminar
            okText="Confirmar"
            cancelText="Cancelar"
            onConfirm={async () => {
              await apiClient.delete(`/incidencia/delete/${record.incidencia_id}`);
              reload(); // Activar la recarga después de la eliminación
            }}
          >
            <Button block style={{ background: "#f54242", color: "white" }} danger>
              Eliminar
            </Button>
          </Popconfirm>
        </Flex>
      );
    }
  }
  );

  return columnas
}

export const getUrl = (id) => {
  return `/incidencia?usuario_id=${id}`
}