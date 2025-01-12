import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd"
import apiClient from '../API/apiClient';

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

  return (
    <Table
      columns={columnas}
      pagination={{ pageSize: 5 }}
      dataSource={data}
      rowKey={rowKey}
      onRow={(record) => {
        if (record.trabajador_id) {
          return {
            onClick: () => navigate(`/admin/trabajadores/${record.trabajador_id}`),
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