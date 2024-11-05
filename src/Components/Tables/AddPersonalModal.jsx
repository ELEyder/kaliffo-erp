import React, { useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { updateUsuarioTienda, getTrabajadoresDiferentes } from "../../Shared/api/Usuario";

const AddPersonalModal = ({
  openModal,
  closeModal,
  id,
  reload
}) => {
  const [form] = Form.useForm();

  const [Trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    getTrabajadoresDiferentes(id, setTrabajadores);
  },[]);

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Añadir nuevo trabajador`}
      open={openModal}
      onCancel={closeModal}
      style={{ textTransform: "uppercase" }}
      onOk={form.submit}
      okText="Guardar"
      centered={true}
      width={500}
    >

      <Form
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formulariaddpersonal"
        onFinish={async (values) => {
          await updateUsuarioTienda(id,values)
          reload()
          closeModal()
        }}
      >

        <Form.Item
          style={{ marginTop: 20 }}
          name="personal"
          label="Personal"
          rules={[
            {
              required: true,
              message: "Personal Requerido",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Seleccionar Un personal"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Trabajadores.map((trabajador) => ({
              value: trabajador.usuario_id,
              label:
                trabajador.nombre +
                " " +
                trabajador.ap_paterno +
                " " +
                trabajador.ap_materno,
              key: trabajador.usuario_id,
            }))}
          />
        </Form.Item>

      </Form>

      <Link to="/trabajadores/tipo/ventas" style={{ textDecoration: "none" }}>
        ¿Trabajador Nuevo?
      </Link>
    </Modal>
  );
};

export default AddPersonalModal;
