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
  

  return (
    <>
      {/* Tabla que muestra los datos de ventas */}
      <Table
        scroll={{ x: 'min-content' }}
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
