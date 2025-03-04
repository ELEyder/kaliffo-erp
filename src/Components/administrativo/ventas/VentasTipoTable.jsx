import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetalleVentaModal from "@CA/ventas/DetalleVentaModal"; // Componente para mostrar los detalles de una venta
import AddVentaModal from "@CA/ventas/AddVentaModal"; // Componente para agregar una nueva venta
import { getVentas } from "@AA/Ventas"; // Función para obtener las ventas según el tipo
import { Table } from "antd";

const VentasTipoTable = () => {
  const { tipo } = useParams(); // Obtiene el tipo de venta desde la URL
  const [id, setId] = useState(1); // ID seleccionado para mostrar en el modal de detalles
  const [tablaDatos, setTablaDatos] = useState([]); // Datos para llenar la tabla
  const [OpenAddVentaModal, setOpenAddVentaModal] = useState(false); // Controla la visibilidad del modal para agregar ventas
  const [OpenDetalleVentaModal, setOpenDetalleVentaModal] = useState(false); // Controla la visibilidad del modal de detalles
  const [reload, setReload] = useState(false); // Estado para forzar la recarga de datos

  // Efecto para cargar los datos de la tabla al montar el componente o cuando cambie `tipo` o `reload`
  useEffect(() => {
    getVentas(tipo, setTablaDatos); // Llama a la función para obtener ventas
  }, [tipo, reload]);

  // Definición de las columnas para la tabla
  const columnas = [
    {
      title: "Nº",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      align: "center",
    },
    {
      title: "Tipo de Venta",
      dataIndex: "tipoVenta",
      key: "tipoVenta",
      align: "center",
      sorter: (a, b) => a.tipoVenta.localeCompare(b.tipoVenta),
    },
    {
      title: "Fecha de Venta",
      dataIndex: "fecha",
      key: "fecha",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad_total",
      key: "cantidad_total",
      align: "center",
      sorter: (a, b) => a.cantidad_total - b.cantidad_total, // Ahora ordena correctamente los números
    },
    {
      title: "Total Bruto",
      dataIndex: "totalBruto",
      key: "totalBruto",
      align: "center",
    },
    {
      title: "Total Neto",
      dataIndex: "totalNeto",
      key: "totalNeto",
      align: "center",
      sorter: (a, b) => a.totalNeto - b.totalNeto, // Corrección de sorter para valores numéricos
    },
    {
      title: "IGV",
      dataIndex: "totalIgv",
      key: "totalIgv",
      align: "center",
    },
    {
      title: "Tipo de Pago",
      dataIndex: "tipoPago",
      key: "tipoPago",
      align: "center",
      onCell: (record) => ({
        style: {
          background:
            record.tipoPago === "Efectivo"
              ? "#248304"
              : record.tipoPago === "Yape"
              ? "#8522a3"
              : "#6fceea",
          color: record.tipoPago === "Transferencia" ? "black" : "white",
        },
      }),
      sorter: (a, b) => a.tipoPago.localeCompare(b.tipoPago),
    },
    {
      title: tipo === "boleta" ? "DNI" : "RUC", // Se selecciona el título dinámicamente
      dataIndex: tipo === "boleta" ? "dni" : "ruc",
      key: tipo === "boleta" ? "dni" : "ruc",
      align: "center",
    },
    {
      title: "Tienda",
      dataIndex: "tienda",
      key: "tienda",
      align: "center",
    },
  ];
  
  return (
    <>
      <Table
        scroll={{ x: 'min-content' }}
        columns={columnas} // Columnas de la tabla
        pagination={{ pageSize: 7 }} // Paginación con 7 elementos por página
        dataSource={tablaDatos.map((item, index) => ({ ...item, key: index }))} // Datos de la tabla con clave única
        rowKey={(record) => record.id} // Identificador único para cada fila
        bordered // Bordes visibles en la tabla
        className="tabla_trabajadores"
        onRow={(record) => ({
          onClick: () => {
            setId(record.venta_id); // Al hacer clic en una fila, establece el ID
            setOpenDetalleVentaModal(true); // Abre el modal de detalles
          },
        })}
      />

      {/* Modal para agregar una nueva venta */}
      <AddVentaModal
        openModal={OpenAddVentaModal}
        closeModal={() => setOpenAddVentaModal(false)} // Cierra el modal
        tipoTrabajador={tipo} // Pasa el tipo actual como propiedad
        reload={reload} // Propiedad para recargar datos
        setReload={setReload} // Función para actualizar el estado de recarga
      />

      {/* Modal para mostrar detalles de una venta */}
      <DetalleVentaModal
        openModal={OpenDetalleVentaModal}
        closeModal={() => setOpenDetalleVentaModal(false)} // Cierra el modal
        id={id} // Pasa el ID seleccionado como propiedad
      />
    </>
  );
};

export default VentasTipoTable;
