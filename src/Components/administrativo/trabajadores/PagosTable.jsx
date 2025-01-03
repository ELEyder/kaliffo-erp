import { Table, Button, Popconfirm, FloatButton } from "antd"; // Importar componentes de Ant Design
import { useParams } from 'react-router-dom'; // Hook para obtener parámetros de la ruta
import { PlusOutlined } from "@ant-design/icons"; // Icono para el botón flotante
import React, { useState, useEffect } from "react"; // Hooks de React para manejar estado y ciclos de vida
import { getPagosByTrabajador, deletePagoById } from "@AA/Pago"; // Funciones para obtener y eliminar pagos
import AddPagoModal from "@CA/trabajadores/AddPagoModal"; // Modal para agregar nuevos pagos

const PagosTable = () => {
  const { id } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL

  const [tabla, setTabla] = useState([]); // Estado para almacenar la lista de pagos
  const [reload, setReload] = useState(false); // Estado para activar recarga después de acciones (agregar/eliminar)
  const [OpenAddPago, setOpenAddPago] = useState(false); // Estado para controlar la visibilidad del modal de agregar pago

  // Obtener los pagos del trabajador cuando el componente se monta o cambia el estado de recarga
  useEffect(() => {
    getPagosByTrabajador(id, setTabla); // Obtener los datos de pagos para el trabajador con el ID proporcionado
  }, [id, reload]);

  // Definir las columnas para la tabla
  const columns = [
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
      align: "center" 
    },
    {
      title: "Estado", 
      dataIndex: "estado", 
      key: "estado", 
      align: "center",
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
    {
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
            onConfirm={(e) => {
              deletePagoById(text); // Eliminar el pago con el ID proporcionado
              setReload(!reload); // Activar la recarga para actualizar los datos de la tabla
            }}
          >
            <Button style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button> {/* Botón de eliminar */}
          </Popconfirm>
        );
      }
    },
  ];

  return (
    <>
      {/* Componente Table para mostrar la lista de pagos */}
      <Table
        columns={columns} // Columnas definidas anteriormente
        dataSource={tabla} // Datos de la tabla (pagos)
        pagination={{ pageSize: 5 }} // Paginación, 5 elementos por página
      />

      {/* Botón flotante para activar el modal de "Añadir Pago" */}
      <FloatButton
        icon={<PlusOutlined />} // Icono del botón flotante
        type="primary" // Tipo del botón
        tooltip={"Añadir Pago"} // Texto del tooltip
        onClick={() => setOpenAddPago(true)} // Abrir el modal al hacer clic
      />

      {/* Modal de agregar pago, se abre al hacer clic en el botón flotante */}
      <AddPagoModal
        openModal={OpenAddPago} // Controlar la visibilidad del modal
        closeModal={() => setOpenAddPago(false)} // Cerrar el modal cuando sea invocado
        reload={() => setReload(!reload)} // Activar recarga después de agregar un pago
        idUsuario={id} // Pasar el ID del trabajador para asociarlo con el nuevo pago
      />
    </>
  );
};

export default PagosTable; // Exportar el componente
