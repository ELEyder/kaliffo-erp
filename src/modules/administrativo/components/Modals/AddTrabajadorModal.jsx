import React, { useEffect, useState } from "react";
import { Form } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { getTiendas } from "@AA/Tienda";

dayjs.extend(customParseFormat);

import { DefaultForm, DefaultModal } from "../../../../components/UI";
import { useTrabajador } from "../../hooks";

const AddTrabajadorModal = ({ openModal, closeModal, onAdded }) => {
  const [form] = Form.useForm();
  const [tiendas, setTiendas] = useState([]);
  const { addTrabajador } = useTrabajador(onAdded);
  const [rol, setRol] = useState(0);

  useEffect(() => {
    getTiendas(setTiendas);
  }, []);

  const rows = [
    {
      type: "text",
      label: "Nombres",
      name: "nombre",
    },
    {
      type: "text",
      label: "Apellido Paterno",
      name: "ap_paterno",
    },
    {
      type: "text",
      label: "Apellido Materno",
      name: "ap_materno",
    },
    {
      type: "date",
      label: "Fecha Nacimiento",
      name: "fecha_nacimiento",
    },
    {
      type: "number",
      label: "Teléfono",
      name: "telefono",
      max: 9,
    },
    {
      type: "number",
      label: "DNI",
      name: "dni",
      max: 8,
    },
    {
      type: "number",
      label: "Sueldo",
      name: "sueldo",
    },
    {
      type: "select",
      label: "Rol",
      name: "rol",
      value: rol,
      onChange: (value) => setRol(value),
      options: [
        { value: 1, label: "Ventas" },
        { value: 2, label: "Talleres" },
        { value: 3, label: "Miscelaneos" },
        { value: 4, label: "Costureros" },
      ],
    },
    ...(rol == 1
      ? [
          {
            type: "select",
            label: "Tienda Asignada",
            name: "tienda_id",
            options: tiendas.map((tienda) => ({
              value: tienda.tienda_id,
              label: tienda.tienda,
            })),
          },
        ]
      : []),
    {
      type: "hidden",
      name: "trabajador_id",
    },
  ];

  const onFinish = async (values) => {
    await addTrabajador(values);
    closeModal(false);
  };

  return (
    <DefaultModal
      title={"Añadir Trabajador"}
      isOpen={openModal}
      onClose={closeModal}
      onOk={form.submit}
    >
      <DefaultForm form={form} onFinish={onFinish} rows={rows} />
    </DefaultModal>
  );
};

export default AddTrabajadorModal;
