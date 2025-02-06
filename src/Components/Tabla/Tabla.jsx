import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd"
import apiClient from '../../API/apiClient';

const Tabla = ({ columnas , rowKey, url = null, reload, dataSource = null }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(dataSource ?? [])

  useEffect(() => {
    if (url){
      async function fetchData() {
        try {
          const response = await apiClient.get(url);
          setData(response.data);
        } catch (e) {
          setData([]);
        }
      }
      fetchData();
    }
  }, [reload]);

  const getSorter = (dataIndex) => {
    console.log(dataIndex)
    return dataIndex === "trabajador_id" ||
    dataIndex === "id" || dataIndex === "Opciones" ? 0 :
    (a, b) => {
      if (typeof a[dataIndex] === 'string' && typeof b[dataIndex] === 'string') {
        return a[dataIndex].localeCompare(b[dataIndex]);
      } else if (typeof a[dataIndex] === 'number' && typeof b[dataIndex] === 'number') {
        return a[dataIndex] - b[dataIndex];
      } else {
        return 0; // Si no son comparables, no ordenamos
      }
    };
  };

  columnas = columnas.map((col) => ({
    ...col,
    align: 'center',
    key: col.title,
    sorter: getSorter(col.dataIndex),
  }));
  
  return (
    <Table
      columns={columnas}
      pagination={{ pageSize: 5 }}
      dataSource={data}
      rowKey={rowKey}
      onRow={(record) => {
        if (record.trabajador_id) {
          return {
            onClick: () => navigate(`/trabajadores/${record.trabajador_id}`),
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