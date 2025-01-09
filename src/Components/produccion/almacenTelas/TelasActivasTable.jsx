import React, { useState, useEffect } from "react"; // Importa React y hooks
import { useParams } from "react-router-dom"; // Importa el hook para obtener los parámetros de la URL
import { Table, Button, Popconfirm, Row, Col } from "antd"; // Componentes de Ant Design
import { deleteTelaById, getTelasActivas } from "@AP/Tela"; // Importa las funciones para obtener y eliminar telas

const TelasActivasTable = () => {
  const { tipo } = useParams(); // Obtiene el parámetro 'tipo' de la URL
  const [tabla, setTabla] = useState([]); // Estado para almacenar los datos de la tabla
  const [reload, setReaload] = useState(true); // Estado para controlar la recarga de los datos

  // useEffect para obtener las telas activas cada vez que cambia 'tipo' o 'reload'
  useEffect(() => {
    getTelasActivas(tipo, setTabla); // Llama a la API para obtener las telas activas de un tipo específico
  }, [tipo, reload]); // Dependencias del efecto

  // Definición de las columnas de la tabla
  const columns = [
    {
      title: "N", // Título de la columna
      dataIndex: "n", // Campo que se va a mostrar
      key: "n", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Metraje", // Título de la columna
      dataIndex: "metraje", // Campo que se va a mostrar
      key: "metraje", // Clave única para la columna
      align: "center", // Alinea el texto al centro
      sorter: (a, b) => a.metraje - b.metraje, // Permite ordenar la columna de metraje
    },
    {
      title: "Artículo", // Título de la columna
      dataIndex: "articulo", // Campo que se va a mostrar
      key: "articulo", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Empresa Compra", // Título de la columna
      dataIndex: "empresa_compra", // Campo que se va a mostrar
      key: "empresa_compra", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Fecha de Compra", // Título de la columna
      dataIndex: "fecha_compra", // Campo que se va a mostrar
      key: "fecha_compra", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Opciones", // Título de la columna
      dataIndex: "tela_id", // Campo único para el identificador de la tela
      key: "opciones", // Clave única para la columna
      align: "center", // Alinea el texto al centro
      render: (text) => { // Función de renderizado para la columna de opciones
        return (
          <Row gutter={[8, 8]} justify="center" align="middle"> {/* Alinea y agrega espaciado entre los elementos */}
            <Col>
              <Popconfirm
                title="ELIMINAR" // Título del mensaje de confirmación
                description="DESEA ELIMINAR A" // Descripción del mensaje de confirmación
                okText="Confirmar" // Texto del botón de confirmación
                cancelText="NO" // Texto del botón de cancelación
                onConfirm={() => {
                  deleteTelaById(text); // Llama a la función para eliminar la tela por su id
                  setReaload(!reload); // Cambia el estado de recarga para volver a cargar los datos
                }}
              >
                <Button block style={{ background: "#f54242", color: "white" }} danger>
                  Eliminar {/* Botón para eliminar la tela */}
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns} // Define las columnas de la tabla
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))} // Asocia los datos a la tabla y agrega una clave única por fila
      />
    </>
  );
};

export default TelasActivasTable; // Exporta el componente para su uso en otras partes de la aplicación
