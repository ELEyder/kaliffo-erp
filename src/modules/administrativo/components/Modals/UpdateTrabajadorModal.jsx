import { useEffect, useState } from "react";
import { Form } from "antd";
import { DefaultForm, DefaultModal } from "../../../../components/UI";
import { useTiendas, useTrabajador } from "../../hooks";
import dayjs from "dayjs";

const UpdateTrabajadorModal = ({ openModal, closeModal, data, onUpdated }) => {
  const [form] = Form.useForm();
  const { updateTrabajador } = useTrabajador(onUpdated);
  const { tiendas } = useTiendas();
  const [rol, setRol] = useState(1);

  useEffect(() => {
    form.setFieldsValue({
      trabajador_id: data.trabajador_id,
      nombre: data.nombre,
      ap_paterno: data.ap_paterno,
      ap_materno: data.ap_materno,
      telefono: data.telefono,
      dni: data.dni,
      fecha_nacimiento: data.fecha_nacimiento
        ? dayjs(data.fecha_nacimiento)
        : null,
      tienda_id: data.tienda_id,
      rol: data.rol,
    });

    const tiposTrabajador = {
      1: "Ventas",
      2: "Talleres",
      3: "Miscelaneos",
      4: "Costureros",
    };
    const rol = Object.entries(tiposTrabajador).find(
      ([key, value]) => value === data.rol
    )?.[0];

    setRol(rol);
  }, [openModal]);

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
    await updateTrabajador(data.trabajador_id, values);
    closeModal(false);
  };

  return (
    <DefaultModal
      title={"Actualizar Trabajador"}
      isOpen={openModal}
      onClose={closeModal}
      onOk={form.submit}
    >
      <DefaultForm form={form} onFinish={onFinish} rows={rows}></DefaultForm>
    </DefaultModal>
  );
};

export default UpdateTrabajadorModal;
