import { useState } from "react";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";
import AddCompraModal from "@CL/compras/AddCompraModal"; // Modal para añadir compras
import DetallesComprasModal from "@CL/compras/DetallesComprasModal"; // Modal para ver detalles de compras
import EditCompraModal from "@CL/compras/EditCompraModal"; // Modal para editar compras
import useCompras from "../../hooks/useCompras";
import { Tabla } from "../../../../components/UI";
import useCompra from "../../hooks/useCompra";

const ComprasTable = () => {
  const { compras, loading, getCompras } = useCompras();
  const { deleteCompra } = useCompra(getCompras);
  const [idCompra, setIdCompra] = useState(null); // Estado para almacenar el ID de la compra seleccionada
  const [openDetalleCompras, setopenDetalleCompras] = useState(false); // Estado para controlar la visibilidad del modal de detalles
  const [reload, setReload] = useState(false); // Estado para forzar la recarga de datos

  const [modals, setModals] = useState({
    dllC: false,
    updC: false,
    addC: false,
  });

  const changeModal = (modalKey, value) => {
    setModals((prev) => ({ ...prev, [modalKey]: value }));
  };

  const columnas = [
    {
      title: "Tienda",
      dataIndex: "tienda",
    },
    {
      title: "Empresa Provedora",
      dataIndex: "empresa_proveedor",
    },
    {
      title: "Fecha Compra",
      dataIndex: "fecha_compra",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
    },
    {
      title: "Total Neto",
      dataIndex: "total",
    },
    {
      title: "Opciones",
      dataIndex: "Opciones",
      render: (record) => {
        return (
          <Row
            gutter={[8, 8]}
            justify="center"
            align="middle"
            className="opciones-botones"
          >
            <Col>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setIdCompra(record.compra_id);
                  changeModal("updC", true);
                }}
                block
              >
                Editar
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que se dispare el evento en otras filas
                  setIdCompra(record.compra_id); // Establece el ID de la compra seleccionada
                  changeModal("dll",true); // Abre el modal de detalles
                }}
              >
                +
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="¿DESEA ELIMINAR ESTA COMPRA?"
                okText="Confirmar"
                onConfirm={(e) => {
                  e.stopPropagation(); // Evita que se dispare el evento en otras filas
                  deleteCompra(record.compra_id); // Elimina la compra seleccionada
                  setReload(!reload); // Fuerza la recarga de los datos
                }}
                cancelText="NO"
              >
                <Button
                  block
                  style={{ background: "#f54242", color: "white" }}
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    setReload(!reload); // Fuerza la recarga de los datos
                  }}
                >
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
      <FloatButton
        tooltip="Añadir Nuevo"
        onClick={() => changeModal("addC", true)} // Abre el modal para añadir una nueva compra
      />

      <Tabla
        columnas={columnas} // Las columnas definidas previamente
        rowKey={"compra_id"} // Utiliza el ID de la compra como clave
        dataSource={compras}
        loading={loading}
      />

      <AddCompraModal
        openModal={modals.addC} // Controla la visibilidad del modal
        closeModal={() => changeModal("addC", false)} // Función para cerrar el modal
        reload={reload} // Pasa el estado de recarga de los datos
        setReload={setReload} // Función para actualizar el estado de recarga
      />

      <DetallesComprasModal
        openModal={modals.dllC}
        closeModal={() => changeModal("dllC", false)}
        reload={() => setReload(!reload)} // Recarga los datos al cerrar el modal
        idC={idCompra} // Pasa el ID de la compra para obtener los detalles
      />

      <EditCompraModal
        openModal={modals.updC}
        closeModal={() => changeModal("updC", false)}
        reload={() => setReload(!reload)} // Recarga los datos al cerrar el modal
        idC={idCompra} // Pasa el ID de la compra para editarla
      />
    </>
  );
};

export default ComprasTable;
