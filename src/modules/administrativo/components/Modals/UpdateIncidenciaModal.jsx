import { useEffect } from "react";
import { Form } from "antd";
import { DefaultForm, DefaultModal } from "../../../../components/UI";
import { useIncidencia } from "../../hooks";

const UpdateIncidenciaModal = ({ openModal, closeModal, data, onUpdated }) => {
  const [form] = Form.useForm();
  const { updateIncidencia } = useIncidencia(onUpdated);

  useEffect(() => {
    form.setFieldsValue({
      ["tipo"]: data.tipo,
      ["descripcion"]: data.descripcion,
    });
  }, [openModal]);

  const rows = [
    {
      type: "select",
      label: "Tipo de Incidencia",
      name: "tipo",
      options: [
        { label: "Familiar", value: 1 },
        { label: "Salud", value: 2 },
        { label: "Personal", value: 3 },
      ],
    },
    {
      type: "text",
      label: "Descripcion",
      name: "descripcion",
    },
  ];

  const onFinish = async (values) => {
    await updateIncidencia(data.incidencia_id, values);
    closeModal(false);
  };

  return (
    <DefaultModal
      title={"Actualizar Incidencia"}
      isOpen={openModal}
      onClose={closeModal}
      onOk={form.submit}
    >
      <DefaultForm form={form} onFinish={onFinish} rows={rows}></DefaultForm>
    </DefaultModal>
  );
};

export default UpdateIncidenciaModal;
