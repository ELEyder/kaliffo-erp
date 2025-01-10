import React, { useState, useEffect } from "react"; // Importa React y hooks
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import { Table, Button, Popconfirm, Row, Col } from "antd"; // Componentes de Ant Design
import { deleteTelaById, getTelasInactivas } from "@AP/Tela"; // Funciones para interactuar con la API

const TelasInactivasTable = () => {
  const { tipo } = useParams(); // Obtiene el tipo de tela de la URL
  const [tabla, setTabla] = useState([]); // Estado para almacenar las telas inactivas

  // useEffect para obtener las telas inactivas cuando el tipo cambie
  useEffect(() => {
    getTelasInactivas(tipo, setTabla); // Llama a la API para obtener las telas inactivas y las almacena en el estado 'tabla'
  }, [tipo]); // Dependencia de 'tipo' para volver a cargar las telas cuando cambie el tipo

  const columns = [
    {
      title: "N", // Título de la primera columna
      dataIndex: "n", // Propiedad de los datos que se mostrará en esta columna
      key: "n", // Clave para esta columna
      align: "center", // Alineación centrada
    },
    {
      title: "Metraje", // Título de la columna
      dataIndex: "metraje", // Propiedad de los datos a mostrar
      key: "metraje", // Clave de la columna
      align: "center", // Alineación centrada
      sorter: (a, b) => a.metraje - b.metraje, // Función para ordenar las filas por metraje
    },
    {
      title: "Artículo", // Título de la columna
      dataIndex: "articulo", // Propiedad de los datos
      key: "articulo", // Clave de la columna
      align: "center", // Alineación centrada
    },
    {
      title: "Empresa Compra", // Título de la columna
      dataIndex: "empresa_compra", // Propiedad de los datos
      key: "empresa_compra", // Clave de la columna
      align: "center", // Alineación centrada
    },
    {
      title: "Fecha de Compra", // Título de la columna
      dataIndex: "fecha_compra", // Propiedad de los datos
      key: "fecha_compra", // Clave de la columna
      align: "center", // Alineación centrada
    },
    {
      title: "Opciones", // Título de la columna
      dataIndex: "tela_id", // Propiedad de los datos
      key: "opciones", // Clave de la columna
      align: "center", // Alineación centrada
      render: (text) => { // Función para renderizar la columna "Opciones"
        return (
          <Row gutter={[8, 8]} justify="center" align="middle">
            <Col>
              <Popconfirm
                title="ELIMINAR" // Mensaje de confirmación
                description="DESEA ELIMINAR A" // Descripción de la acción
                okText="Confirmar" // Texto del botón de confirmación
                cancelText="NO" // Texto del botón de cancelación
                onConfirm={() => { // Acción a realizar cuando se confirma la eliminación
                  deleteTelaById(text); // Llama a la función para eliminar la tela por ID
                  setReaload(!reload); // Cambia el estado 'reload' para recargar los datos (esto parece estar mal, no se usa 'reload' en el componente)
                }}
              >
                <Button block style={{ background: "#f54242", color: "white" }} danger>
                  Eliminar
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
      {/* Renderiza la tabla con los datos de las telas inactivas */}
      <Table
        scroll={{ x: 'min-content' }}
        ali // Esto parece un error, debería ser 'align'
        columns={columns} // Pasa las columnas definidas anteriormente
        dataSource={tabla.map((item, index) => ({ ...item, key: index }))} // Mapea las filas de datos y les asigna una clave única
      />
    </>
  );
};

export default TelasInactivasTable; // Exporta el componente para su uso en otras partes de la aplicación
