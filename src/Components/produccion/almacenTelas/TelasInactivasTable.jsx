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
      title: "Fecha de Salida", // Título de la columna
      dataIndex: "fecha_salida", // Campo que se va a mostrar
      key: "fecha_salida", // Clave única para la columna
      align: "center", // Alinea el texto al centro
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
