import React, { useEffect, useState } from "react"; // Importa React y hooks
import { Table } from "antd"; // Importa la tabla de Ant Design
import { useOutletContext, useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import { getAcabadoByLote } from "@AP/Acabado"; // Función para obtener los acabados por lote desde la API

const AcabadoTable = () => {
  const { id } = useParams(); // Obtiene el ID del lote desde la URL
  const [data, setData] = useState([]); // Estado para almacenar los datos de los acabados
  const { reload, setReload } = useOutletContext();

  // useEffect para cargar los datos de acabados cuando el id o reload cambien
  useEffect(() => {
    getAcabadoByLote(id, setData); // Llama a la API para obtener los acabados del lote y los almacena en el estado 'data'
  }, [id, reload]); // Dependencia de 'id' y 'reload' para recargar los datos cuando cambien

  // Define las columnas de la tabla
  const columns = [
    { key: 'acabado_id', dataIndex: 'acabado_id', title: 'Acabado' }, // Columna para el ID de acabado
    { key: 'codigo', dataIndex: 'codigo', title: 'Código' }, // Columna para el código
    { key: 'talla', dataIndex: 'talla', title: 'Talla' }, // Columna para la talla
    { key: 'cantidad_enviada', dataIndex: 'cantidad_enviada', title: 'Cantidad Enviada' } // Columna para la cantidad enviada
  ];

  return (
    <>
      {/* Renderiza la tabla con los datos de los acabados */}
      <Table 
        scroll={{ x: 'min-content' }}
        dataSource={data} // Proporciona los datos a la tabla
        columns={columns} // Pasa las columnas definidas anteriormente
        rowKey="acabado_id" // Usa el 'acabado_id' como clave única para cada fila
      />
    </>
  );
};

export default AcabadoTable; // Exporta el componente para su uso en otras partes de la aplicación
