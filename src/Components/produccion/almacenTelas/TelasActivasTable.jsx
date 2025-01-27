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
      title: "Artículo", // Título de la columna
      dataIndex: "articulo", // Campo que se va a mostrar
      key: "articulo", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Numero Rollo", // Título de la columna
      dataIndex: "numero_rollo", // Campo que se va a mostrar
      key: "numero_rollo", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "PRO.Numero Rollo", // Título de la columna
      dataIndex: "pro_numero_rollo", // Campo que se va a mostrar
      key: "pro_numero_rollo", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Grado", // Título de la columna
      dataIndex: "grado", // Campo que se va a mostrar
      key: "grado", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Grupo", // Título de la columna
      dataIndex: "grupo", // Campo que se va a mostrar
      key: "grupo", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Ancho Bruto", // Título de la columna
      dataIndex: "ancho_bruto", // Campo que se va a mostrar
      key: "ancho_bruto", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Ancho Neto", // Título de la columna
      dataIndex: "ancho_neto", // Campo que se va a mostrar
      key: "ancho_neto", // Clave única para la columna
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
      title: "Empalme", // Título de la columna
      dataIndex: "empalme", // Campo que se va a mostrar
      key: "empalme", // Clave única para la columna
      align: "center", // Alinea el texto al centro
    },
    {
      title: "Fecha de Ingreso", // Título de la columna
      dataIndex: "fecha_ingreso", // Campo que se va a mostrar
      key: "fecha_ingreso", // Clave única para la columna
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
        scroll={{ x: 'min-content' }}
        columns={columns} // Define las columnas de la tabla
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))} // Asocia los datos a la tabla y agrega una clave única por fila
      />
    </>
  );
};

export default TelasActivasTable; // Exporta el componente para su uso en otras partes de la aplicación
