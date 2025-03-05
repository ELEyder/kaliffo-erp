import { Card, Popconfirm, Tooltip } from "antd"; // Componentes de Ant Design para diseño y acciones
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons"; // Iconos para acciones
import { Link } from "react-router-dom"; // Componente de React Router para enlaces
import { useTienda } from "../../hooks";

const TiendaCard = ({ tienda, setId, setValues, changeModal, onChange }) => {
  const { Meta } = Card; // Desestructuración del componente Meta de Ant Design
  const { deleteTienda } = useTienda(onChange);
  return (
    <>
      <Card
        title={tienda.tienda}
        style={{ overflow: "hidden" }}
        actions={[
          <Tooltip
            title={`Editar ${tienda.tienda}`}
            className={"card-update"}
            onClick={(e) => {
              e.stopPropagation();
              setId(tienda.tienda_id);
              setValues(tienda);
              changeModal("updT", true);
            }}
          >
            <div>
              <EditOutlined style={{ color: "white" }} />
            </div>
          </Tooltip>,
          // Botón para ver detalles de la tienda con tooltip
          <Tooltip title="Ver Detalles" className={"card-view"}>
            <Link to={`/administrativo/tiendas/${tienda.tienda_id}`}>
              <EyeOutlined style={{ color: "white" }} key="view" />
            </Link>
          </Tooltip>,
          // Botón para eliminar tienda con confirmación emergente
          <Popconfirm
            title="¿ELIMINAR?"
            description="¿Está seguro de eliminar esta tienda?"
            okText="Confirmar"
            placement="bottom"
            onConfirm={async (e) => {
              e.stopPropagation(); // Evitar la propagación del clic
              await deleteTienda(tienda.tienda_id);
            }}
            cancelText="Cancelar"
          >
            <Tooltip title="Eliminar Tienda" className={"card-delete"}>
              <div>
                <DeleteOutlined key="delete" style={{ color: "white" }} />
              </div>
            </Tooltip>
          </Popconfirm>,
        ]}
      >
        {/* Meta de la tarjeta para mostrar los detalles de la tienda */}
        <Meta
          title={<p>TELEFONO: {tienda.telefono}</p>} // Mostrar teléfono de la tienda
          description={
            <>
              <p>STOCK: {tienda.total_stock ?? "0"}</p>
              <p>DIRECCION: {tienda.direccion}</p>
            </>
          }
        />
      </Card>

    </>
  );
};

export default TiendaCard;