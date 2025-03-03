import React, { useEffect, useState } from "react";
import { Form } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { getTiendas } from "@AA/Tienda";

dayjs.extend(customParseFormat);

import DefaultModal from "./DefaultModal";
import DefaultForm from "../Forms/DefaultForm";
import { useTrabajador } from "../../hooks";

const UpdateTrabajadorModal = ({
  openModal, // Estado para controlar si el modal está abierto
  closeModal, // Función para cerrar el modal
  data, // Data del trabajador a editar
  onUpdated,
}) => {
  const [form] = Form.useForm(); // Inicializa el formulario de Ant Design
  const [tiendas, setTiendas] = useState([]); // Lista de tiendas (para trabajadores de ventas)
  const { updateTrabajador } = useTrabajador(null, onUpdated);
  const [rol, setRol] = useState(1);

  useEffect(() => {
    form.setFieldsValue({
      ["trabajador_id"]: data.trabajador_id,
      ["nombre"]: data.nombre,
      ["ap_paterno"]: data.ap_paterno,
      ["ap_materno"]: data.ap_materno,
      ["telefono"]: data.telefono,
      ["dni"]: data.dni,
      ["fecha_nacimiento"]: dayjs(data.fecha_nacimiento),
      ["tienda_id"]: data.tienda_id,
      ["rol"]: data.rol,
    });

    const tiposTrabajador = { 1: "Ventas", 2 : "Talleres", 3: "Miscelaneos", 4: "Costureros" };
    const rol = Object.entries(tiposTrabajador).find(([key, value]) => value === data.rol)?.[0];

    setRol(rol)
  }, [openModal]);

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
      max: 9, // Longitud máxima del teléfono
    },
    {
      type: "number",
      label: "DNI",
      name: "dni",
      max: 8, // Longitud máxima del DNI
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
      : []), // Si no es 'ventas', no se agrega nada
    {
      type: "hidden",
      name: "trabajador_id",
    },
  ];

  const onFinish = async (values) => {
    await updateTrabajador(data.trabajador_id, values);
    closeModal(false); // Cierra el modal tras actualizar
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
