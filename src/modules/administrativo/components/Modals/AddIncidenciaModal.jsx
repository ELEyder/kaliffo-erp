import { Form } from "antd";
import { DefaultForm, DefaultModal } from "../../../../components/UI";
import { useIncidencia } from "../../hooks";

const AddIncidenciaModal = ({ openModal, closeModal, id, onAdded }) => {
  const [form] = Form.useForm();
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
