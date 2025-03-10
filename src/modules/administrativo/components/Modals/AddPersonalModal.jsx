import { Form } from "antd";
import { Link } from "react-router-dom";
import { useTrabajador, useTrabajadores } from "../../hooks";
import { DefaultForm, DefaultModal } from "../../../../components/UI";

const AddPersonalModal = ({ openModal, closeModal, tienda_id, onAdded }) => {
  const [form] = Form.useForm();

  const { trabajadores } = useTrabajadores({
    rol: 1,
    antiTienda_id: tienda_id,
  });
  const { updateTrabajador } = useTrabajador(onAdded);
  const rows = [
    {
      type: "select",
      name: "personal",
      label: "Personal",
      options: trabajadores.map((trabajador) => ({
        value: trabajador.trabajador_id,
        label: trabajador.nombres,
      })),
    },
  ];

  const onFinish = async (values) => {
    await updateTrabajador(values.personal, { tienda_id: tienda_id });
    closeModal();
  };
  return (
    <>
      <DefaultModal
        title={"Añadir Personal"}
        isOpen={openModal}
        onClose={closeModal}
        onOk={form.submit}
      >
        <DefaultForm rows={rows} onFinish={onFinish} form={form} />
        <Link to="/administrativo/trabajadores">¿Trabajador Nuevo?</Link>
      </DefaultModal>
    </>
  );
};

export default AddPersonalModal;
