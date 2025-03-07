import { Form } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

import { DefaultForm, DefaultModal } from "../../../../components/UI";
import { useTienda } from "../../hooks";

const AddTiendaModal = ({ openModal, closeModal, onAdded }) => {
  const [form] = Form.useForm();
  const { addTienda } = useTienda(onAdded);

  const rows = [
    {
      type: "text",
      name: "tienda",
      label: "Nombre de la Tienda",
    },
    {
      type: "text",
      name: "direccion",
      label: "Dirección de la Tienda",
    },
    {
      type: "number",
      name: "telefono",
      label: "Teléfono",
      max: 9,
    },
  ];

  const onFinish = async (values) => {
    const success = await addTienda(values);
    console.log(success);
    if (success) closeModal();
  };

  return (
    <DefaultModal
      title={"Añadir Tienda"}
      isOpen={openModal}
      onClose={closeModal}
      onOk={form.submit}
    >
      <DefaultForm form={form} onFinish={onFinish} rows={rows} />
    </DefaultModal>
  );
};

export default AddTiendaModal;
