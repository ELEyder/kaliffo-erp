import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd"
import { apiClient } from '../../../API/apiClient';

const Tabla = ({ columnas , rowKey, url = null, dataSource = [], loading = false }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  
  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  async function fetchData() {
    try {
      const response = await apiClient.get(url);
      setData(response.data);
    } catch (e) {
      setData([]);
    }
  }

  useEffect(() => {
    if (url){
      fetchData();
    }
  }, [url]);

  const getSorter = (col) => {
    return col.dataIndex === "id" || col.title === "Opciones" ? 0 :
    (a, b) => {
      if (typeof a[col.dataIndex] === 'string' && typeof b[col.dataIndex] === 'string') {
        return a[col.dataIndex].localeCompare(b[col.dataIndex]);
      } else if (typeof a[col.dataIndex] === 'number' && typeof b[col.dataIndex] === 'number') {
        return a[col.dataIndex] - b[col.dataIndex];
      } else {
        return 0; // Si no son comparables, no ordenamos
      }
    };
  };

  columnas = columnas.map((col) => ({
    ...col,
    align: 'center',
    key: col.title,
    sorter: getSorter(col),
  }));
  return (
    <Table
      columns={columnas}
      pagination={{ pageSize: 5 }}
      dataSource={data}
      rowKey={rowKey}
      loading={loading}
      onRow={(record) => {
        if (record.trabajador_id) {
          return {
            onClick: () => navigate(`/trabajadores/${record.trabajador_id}`),
            style: { cursor: "pointer" },
          };
        } else if (record.producto_id) {
          return {
            onClick: () => navigate(`/productos/${record.producto_id}`),
            style: { cursor: "pointer" },
          };
        }
        return {};
      }}
      scroll={{ x: 'min-content' }}
    />
  )
}

export default Tabla;