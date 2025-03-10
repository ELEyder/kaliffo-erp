import { Button, Popconfirm } from "antd";
import { Tabla } from "../../../../components/UI";
import { useHorario, useHorarios } from "../../hooks";

const HorariosTable = ({ id }) => {
  const { horarios, getHorarios } = useHorarios(id);
  const { deleteHorario } = useHorario(getHorarios);

  const columnas = [
    { title: "Fecha", dataIndex: "fecha" },
    { title: "Hora de Ingreso", dataIndex: "hora_entrada" },
    { title: "Hora de Salida", dataIndex: "hora_salida" },
    { title: "Horas Trabajadas", dataIndex: "horas_trabajadas" },
    {
      title: "Opciones",
      dataIndex: "horario_id",
      render: (text) => {
        return (
          <Popconfirm
            title="ELIMINAR"
            description="¿Desea eliminar el horario?"
            okText="Confirmar"
            onConfirm={async () => {
              await deleteHorario(text);
            }}
          >
            <Button block type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Tabla columnas={columnas} rowKey={"horario_id"} dataSource={horarios} />
    </>
  );
};

export default HorariosTable;
