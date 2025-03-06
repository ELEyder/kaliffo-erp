import React from "react";
import { Form } from "antd";

import DefaultModal from "./DefaultModal";
import DefaultForm from "../Forms/DefaultForm";
import useProducto from "../../hooks/useProducto";

const AddProductoModal = ({ openModal, closeModal, onAdded }) => {
  const [form] = Form.useForm();

  const { addProducto } = useProducto(null, onAdded)

  const onFinish = async (values) => {
    await addProducto(values);
    closeModal();
  };

  return (
    <DefaultModal
      isOpen={openModal}
      onClose={closeModal}
      title={"Añadir Producto"}
      onOk={form.submit}
    >
      <DefaultForm
        form={form}
        onFinish={onFinish}
        rows={[
          {
            type: "text",
            name: "nombre",
            label: "Nombre del Producto",
          },
          {
            type: "number",
            name: "precioBase",
            label: "Precio Base",
          },
          {
            type: "percent",
            name: "descuento",
            label: "Descuento",
          },
        ]}
      />
    </DefaultModal>
  );
};

export default AddProductoModal; // Exporta el componente
