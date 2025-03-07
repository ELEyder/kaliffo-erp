import React, { useEffect } from "react"; // Importar React y el hook useEffect
import { Form } from "antd"; // Componentes de Ant Design para formularios y modales
import { useTienda } from "../../hooks";
import { DefaultForm, DefaultModal } from "../../../../components/UI"; 

const UpdateTiendaModal = ({
  openModal, // Estado para controlar si el modal está abierto
  closeModal,
  data,
  onUpdated,
}) => {
  const [form] = Form.useForm();
  const { updateTienda } = useTienda(onUpdated);

  useEffect(() => {
    form.setFieldsValue({
      nombre: data.tienda,
      direccion: data.direccion,
      telefono: data.telefono,
    });
  }, [openModal]);

  const rows = [
    {
      type: "text",
      name: "nombre",
      label: "Tienda",
    },
    {
      type: "text",
      name: "direccion",
      label: "Dirección",
    },
    {
      type: "number",
      name: "telefono",
      label: "Teléfono",
      max: 9,
    },
  ];

  const onFinish = async (values) => {
    await updateTienda(data.tienda_id, values);
    closeModal(false);
  };

  return (
    <DefaultModal
      title={"Actualizar Tienda"}
      isOpen={openModal}
      onClose={closeModal}
      onOk={form.submit}
    >
      <DefaultForm form={form} onFinish={onFinish} rows={rows}></DefaultForm>
    </DefaultModal>
  );
};

export default UpdateTiendaModal;
