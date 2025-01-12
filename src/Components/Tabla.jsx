import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd"
import apiClient from '../API/apiClient';

const Tabla = ({ columnas , rowKey, url, reload }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(url);
        setData(response.data);
      } catch (e) {
        setData([]);
      }
    }
    fetchData();
  }, [reload]);

  return (
    <Table
      columns={columnas}
      pagination={{ pageSize: 5 }}
      dataSource={data}
      rowKey={rowKey}
      onRow={(record) => ({
        onClick: () => navigate(`/admin/trabajadores/${record.trabajador_id}`),
        style: { cursor: "pointer" },
      })}
      scroll={{ x: 'min-content' }}
    />
  )
}

export default Tabla;