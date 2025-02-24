  import React, { useEffect, useState } from "react";
  import { Form } from "antd";
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import dayjs from 'dayjs';

  dayjs.extend(customParseFormat);

  import DefaultModal from "./DefaultModal";
import DefaultForm from "../Forms/DefaultForm";
import { useIncidencia } from "../../hooks";

  const UpdateIncidenciaModal = ({
    openModal, // Estado para controlar si el modal está abierto
    closeModal, // Función para cerrar el modal
    data, // Data del trabajador a editar
    onUpdated
  }) => {
    const [form] = Form.useForm(); // Inicializa el formulario de Ant Design
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
        <DefaultForm
          form={form}
          onFinish={onFinish}
          rows={rows}
        >

        </DefaultForm>
      </DefaultModal>
    );
  };

  export default UpdateIncidenciaModal;
