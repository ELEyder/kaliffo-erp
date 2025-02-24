import React, { useEffect, useState } from "react";
import { Form } from "antd";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { getTiendas } from "@AA/Tienda";

dayjs.extend(customParseFormat);

import DefaultModal from "./DefaultModal";
import DefaultForm from "../Forms/DefaultForm";
import { useTrabajador } from "../../hooks";

const AddIncidenciaModal = ({
  openModal, // Estado para controlar si el modal está abierto
  closeModal, // Función para cerrar el modal
  tipoTrabajador,
}) => {

  const [form] = Form.useForm(); // Inicializa el formulario de Ant Design
  const [tiendas, setTiendas] = useState([]); // Lista de tiendas (para trabajadores de ventas)
  const { addTrabajador } = useTrabajador();

  useEffect(()=>{
    getTiendas(setTiendas)
  }, [])

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
    ...(tipoTrabajador === "ventas"
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
    await addTrabajador(tipoTrabajador, values);
    console.log("values", values);
    closeModal(false); // Cierra el modal tras actualizar
  };
  
  return (
    <DefaultModal
      title={"Añadir Trabajador"}
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

export default AddIncidenciaModal;
