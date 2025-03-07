import { Form } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

import { DefaultForm, DefaultModal } from "../../../../components/UI";
import { useIncidencia } from "../../hooks";

const AddIncidenciaModal = ({
  openModal, // Estado para controlar la visibilidad del modal
  closeModal, // Función para cerrar el modal
  id,
  onAdded, // ID del usuario pasado como prop
}) => {
  const [form] = Form.useForm(); // Inicializa el formulario de Ant Design
  const { addIncidencia } = useIncidencia(onAdded);

  const rows = [
    {
      type: "select",
      label: "Tipo",
      name: "tipo",
      options: [
        { value: "1", label: "Familiar" },
        { value: "2", label: "Salud" },
        { value: "3", label: "Personal" },
      ],
    },
    {
      type: "text",
      label: "Descripcion",
      name: "descripcion",
    },
  ];

  const onFinish = async (values) => {
    await addIncidencia(id, values);
    closeModal(false);
  };

  return (
    <DefaultModal
      title={"Añadir Trabajador"}
      isOpen={openModal}
      onClose={closeModal}
      onOk={form.submit}
    >
      <DefaultForm form={form} onFinish={onFinish} rows={rows}></DefaultForm>
    </DefaultModal>
  );
};

export default AddIncidenciaModal;
