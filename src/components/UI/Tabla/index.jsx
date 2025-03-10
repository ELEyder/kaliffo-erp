import { useNavigate } from "react-router-dom";
import { Table } from "antd";

const Tabla = ({ columnas, rowKey, dataSource = [], loading = false }) => {
  const navigate = useNavigate();

  const incidenciaMap = {
    1: "Familiar",
    2: "Salud",
    3: "Personal",
  };

  const getSorter = (col) => {
    if (col.dataIndex === "id" || col.title === "Opciones") return 0;

    return (a, b) => {
      if (
        typeof a[col.dataIndex] === "string" &&
        typeof b[col.dataIndex] === "string"
      ) {
        return a[col.dataIndex].localeCompare(b[col.dataIndex]);
      } else if (
        typeof a[col.dataIndex] === "number" &&
        typeof b[col.dataIndex] === "number"
      ) {
        return a[col.dataIndex] - b[col.dataIndex];
      } else {
        return 0;
      }
    };
  };

  const getRender = (dataIndex) => {
    switch (dataIndex) {
      case "fecha":
        return { render: (data) => new Date(data).toLocaleDateString("es-ES") };
      case "montoPagado" || "montoFaltante":
        return { render: (text) => "S/" + text };
      case "tipo":
        return { render: (value) => incidenciaMap[value] || "Desconocido" };
    }
  };

  const getOnCell = (dataIndex, record) => {
    switch (dataIndex) {
      case "estado":
        return {
          onCell: (record) => ({
            style: {
              background:
                record.estado === "En Proceso" ? "#FFD54F" : "#4CAF50",
              color: "black",
            },
          }),
        };
      case "tipo":
        return {
          onCell: (record) => ({
            style: {
              background:
                record.tipo === 1
                  ? "#4A90E2"
                  : record.tipo === 2
                  ? "#50C878"
                  : "#FF857F",
              color: "black",
            },
          }),
        };
      case "horas_trabajadas":
        return {
          onCell: (record) => {
            return {
              style: {
                background:
                  record.min_trabajadas >= 540
                    ? "#4CAF50"
                    : record.min_trabajadas > 300
                    ? "#FFD54F"
                    : "#E74C3C",
                color: "black",
              },
            };
          },
        };
      case "tipoPago":
        return {
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
        };
      case "stock":
        return {
          onCell: (record) => ({
            style: {
              background:
                record.stock >= 50
                  ? "green"
                  : record.stock <= 20
                  ? "#f54242"
                  : "#FCFB77",
              color:
                record.stock <= 20 || record.stock >= 50 ? "white" : "black",
              padding: "10px",
            },
          }),
        };
    }
  };

  columnas = columnas.map((col) => ({
    ...col,
    align: "center",
    key: col.title,
    sorter: getSorter(col),
    ...getRender(col.dataIndex),
    ...getOnCell(col.dataIndex, col),
  }));

  return (
    <Table
      columns={columnas}
      pagination={{ pageSize: 5 }}
      dataSource={dataSource}
      rowKey={rowKey}
      loading={loading}
      onRow={(record) => {
        let path = null;
        if (record.trabajador_id)
          path = `/administrativo/trabajadores/${record.trabajador_id}`;
        else if (record.producto_id)
          path = `/administrativo/productos/${record.producto_id}`;
        else if (record.venta_id)
          path = `/administrativo/venta/${record.venta_id}`;
        else if (record.almacen_id)
          path = `/logistico/almacen/${record.almacen_id}`;
        else if (record.tienda_id)
          path = `/administrativo/tiendas/${record.tienda_id}`;

        return path
          ? { onClick: () => navigate(path), style: { cursor: "pointer" } }
          : { style: { cursor: "default" } };
      }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default Tabla;
