import React, { useEffect } from "react"; // Importar React y el hook useEffect
import { updateTienda } from "@AA/Tienda"; // Función para actualizar los detalles de la tienda
import { Form, Modal, Input } from "antd"; // Componentes de Ant Design para formularios y modales
import { useTienda } from "../../hooks";
import DefaultModal from "./DefaultModal";
import DefaultForm from "../Forms/DefaultForm";

const UpdateTiendaModal = ({
  openModal, // Estado para controlar si el modal está abierto
  closeModal,
  id,
  onUpdate,
  values,
}) => {
  const [form] = Form.useForm();
  const { updateTienda } = useTienda(onUpdate);

  useEffect(() => {
    form.setFieldsValue({
      nombre: values.tienda,
      direccion: values.direccion,
      telefono: values.telefono,
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
    await updateTienda(id, values);
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
