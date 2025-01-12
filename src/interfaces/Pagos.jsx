import { Flex, Button, Popconfirm } from "antd";
import apiClient from "../API/apiClient";

export const getColumnas = (reload) => {
  const columnas = [
    {
      title: "Monto Pagado",
      dataIndex: "montoPagado",
      key: "montoPagado",
      align: "center",
      render: (text) => ("S/" + text) // Formatear el monto con el símbolo de moneda "S/"
    },
    {
      title: "Monto Faltante",
      dataIndex: "montoFaltante",
      key: "montoFaltante",
      align: "center",
      render: (text) => ("S/" + text) // Formatear el monto faltante con el símbolo de moneda "S/"
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      align: "center",
      render: (fecha) => {
        if (!fecha) return "-"; // Manejar casos donde la fecha sea nula
        const date = new Date(fecha); // Convertir la fecha a objeto Date
        const day = String(date.getDate()).padStart(2, "0"); // Obtener día con dos dígitos
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Obtener mes con dos dígitos (getMonth es base 0)
        const year = date.getFullYear(); // Obtener año
        return `${day}/${month}/${year}`; // Formatear en DD/MM/YYYY
      },
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center",
      render: (value) => {
        const pagoMap = {
          0: "Pagado",
          1: "Pendiente",
        };
        return pagoMap[value] || "Desconocido"; // Devuelve el texto correspondiente o "Desconocido" si no está mapeado
      },
      // Estilo de la celda personalizado según el estado del pago
      onCell: (record) => ({
        style: {
          background: record.estado === "En Proceso" ? '#FCFB77' : 'green', // Amarillo para "En Proceso", Verde para "Completado"
          color: record.estado === "En Proceso" ? "black" : "white", // Color del texto según el estado
        }
      }),
      // Ordenar los pagos según su estado
      sorter: {
        compare: (a, b) => a.estado.localeCompare(b.estado),
        multiple: 1,
      }
    },

  ];

  columnas.push({
    title: "Opciones",
    dataIndex: "pago_id",
    key: "opciones",
    align: "center",
    render: (text) => {
      return (
        <Popconfirm
          title="¿ELIMINAR?" // Mensaje de confirmación para eliminar un pago
          description="¿Está seguro de eliminar el pago?" // Descripción
          okText="Confirmar" // Texto del botón de confirmación
          cancelText="Cancelar" // Texto del botón de cancelar
          onConfirm={async () => {
            await apiClient.delete(`/pago/delete/${text}`);
            reload(); // Activar la recarga para actualizar los datos de la tabla
          }}
        >
          <Button style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button> {/* Botón de eliminar */}
        </Popconfirm>
      );
    }
  },
  );

  return columnas
}

export const getUrl = (id) => {
  return `/pago/${id}`
}