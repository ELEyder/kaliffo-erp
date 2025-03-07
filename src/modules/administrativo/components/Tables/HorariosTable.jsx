import { Button, Popconfirm } from "antd";
import { Tabla } from "../../../../components/UI";
import {useHorario, useHorarios} from "../../hooks";

const HorariosTable = ({ id }) => {
  const { horarios, getHorarios } = useHorarios(id);
  const { deleteHorario } = useHorario(getHorarios)

  const columnas = [
    {
      title: "Fecha", // Título de la columna
      dataIndex: "fecha", // Campo de datos que se mostrará en esta columna
      key: "fecha", // Clave única para la columna
      align: "center", // Alinear contenido al centro
      sorter: {
        compare: (a, b) => a.fecha.localeCompare(b.fecha),
        multiple: 2,
      }, // Habilitar ordenación por fecha
      render: (fecha) => fecha ? new Date(fecha).toLocaleDateString("es-ES") : "-",
    },
    {
      title: "Hora de Ingreso",
      dataIndex: "hora_entrada",
      key: "hora_entrada",
      align: "center",
    }, // Mostrar hora de entrada
    {
      title: "Hora de Salida",
      dataIndex: "hora_salida",
      key: "hora_salida",
      align: "center",
    }, // Mostrar hora de salida
    {
      title: "Horas Trabajadas", // Columna para las horas trabajadas
      dataIndex: "horas_trabajadas",
      key: "horas_trabajadas",
      align: "center",
      onCell: (record) => {
        // Estilo personalizado de las celdas según las horas trabajadas
        return {
          style: {
            background:
              record.min_trabajadas >= 540
                ? "green"
                : record.min_trabajadas <= 300
                ? "#f54242"
                : "#FCFB77", // Colores según los minutos trabajados
            color: record.min_trabajadas <= 300 ? "white" : "black", // Cambiar color de texto para las horas trabajadas bajas
          },
        };
      },
    },
    {
      title: "Opciones", // Columna de opciones (por ejemplo, eliminar acción)
      dataIndex: "horario_id",
      key: "opciones",
      align: "center",
      render: (text) => {
        // Función de renderizado personalizada para el botón "Eliminar"
        return (
          <Popconfirm
            title="ELIMINAR" // Título de la confirmación
            description="¿Desea eliminar el horario?" // Descripción de la confirmación
            okText="Confirmar" // Texto para el botón de confirmación
            cancelText="NO" // Texto para el botón de cancelación
            onConfirm={async () => {
              await deleteHorario(text)
            }}
          >
            <Button block type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Tabla columnas={columnas} rowKey={"horario_id"} dataSource={horarios} />
    </>
  );
};

export default HorariosTable;
