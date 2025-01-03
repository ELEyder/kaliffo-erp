import React, { useEffect, useState } from "react"; // Importar React y los hooks
import { useParams } from 'react-router-dom'; // Hook para acceder a los parámetros de la URL
import { getVentasByTienda } from "@AA/Ventas"; // Función para obtener los datos de ventas por tienda
import { Button, Row, Col, Popconfirm, Table } from "antd"; // Componentes de Ant Design

const PagosTable = () => {
  const { id } = useParams(); // Extraer el ID de la tienda de la URL

  const [productostienda, setproductostienda] = useState([]); // Estado para almacenar los datos de ventas
  const [reload, setReload] = useState(false); // Estado para activar la recarga de datos

  // Obtener los datos de ventas cuando cambia el ID de la tienda o el estado de recarga
  useEffect(() => {
    getVentasByTienda(id, setproductostienda); // Llamar a la función para obtener los datos de ventas
  }, [id, reload]); // Dependencia del ID y el estado de recarga para realizar la solicitud nuevamente

  // Definir las columnas para la tabla de Ant Design
  const columnas = [
    { title: "Nº", dataIndex: "id", key: "id", align: "center" }, // Columna para el número de venta
    { title: "Código", dataIndex: "codigo", key: "codigo", align: "center" }, // Columna para el código de venta
    { title: "Tipo de Venta", dataIndex: "tipo", key: "tipo", align: "center" }, // Columna para el tipo de venta
    { title: "Fecha de Venta", dataIndex: "fechaVenta", key: "fechaVenta", align: "center" }, // Columna para la fecha de venta
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad", align: "center" }, // Columna para la cantidad vendida
    { title: "Total Bruto", dataIndex: "totalBruto", key: "totalBruto", align: "center" }, // Columna para el total bruto
    { title: "Total Neto", dataIndex: "totalNeto", key: "totalNeto", align: "center" }, // Columna para el total neto
    { title: "IGV", dataIndex: "IGV", key: "IGV", align: "center" }, // Columna para el IGV (impuesto)
    { title: "Tipo de Pago", dataIndex: "tipoPago", key: "tipoPago", align: "center" }, // Columna para el tipo de pago
    { title: "RUC", dataIndex: "RUC", key: "RUC", align: "center" }, // Columna para el RUC (registro único de contribuyente)
    { title: "Tienda", dataIndex: "tiendaId", key: "tiendaId", align: "center" }, // Columna para la tienda

    // Columna para las opciones (Eliminar)
    {
      title: "Opciones",
      dataIndex: "codigo",
      key: "opciones",
      align: "center",
      render: (text) => (
        <Row gutter={[8, 8]} justify="center" align="middle" className="opciones-botones">
          <Col>
            <Popconfirm
              title="ELIMINAR" // Título de la confirmación para eliminar
              description="DESEA ELIMINAR A" // Descripción de la confirmación
              okText="Confirmar" // Texto para confirmar la eliminación
              onConfirm={(e) => {
                e.stopPropagation(); // Evitar la propagación del evento
                deleteVenta(text); // Llamar a la función para eliminar la venta con el código proporcionado
              }}
              cancelText="NO" // Texto para cancelar la eliminación
            >
              <Button
                block
                style={{ background: "#f54242", color: "white" }} // Estilo para el botón de eliminar
                danger
                onClick={(e) => e.stopPropagation()} // Evitar la propagación del evento al hacer clic
              >
                Eliminar
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      {/* Tabla que muestra los datos de ventas */}
      <Table
        columns={columnas} // Configuración de las columnas
        pagination={{ pageSize: 5 }} // Establecer la paginación con 5 elementos por página
        bordered // Agregar borde a la tabla
        dataSource={productostienda.map((item, index) => ({ ...item, key: index }))} // Mapear los datos de ventas a las filas de la tabla
        rowKey={(record) => record.id} // Establecer la clave única para cada fila
      />
    </>
  );
};

export default PagosTable; // Exportar el componente PagosTable
