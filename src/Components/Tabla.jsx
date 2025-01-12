import { Table } from "antd"
import { useNavigate } from "react-router-dom";

const Tabla = ({ columnas, dataSource , rowKey }) => {
  const navigate = useNavigate();

  return (
    <Table
      columns={columnas}
      pagination={{ pageSize: 5 }}
      dataSource={dataSource}
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