import React, { useEffect, useState } from "react"; // React imports
import { Form, Modal, Select } from "antd"; // Ant Design components
import { Link } from "react-router-dom"; // For navigation
import { updateTrabajadorTienda, getTrabajadoresDiferentes } from "@AA/Usuario"; // Functions for managing workers

const AddPersonalModal = ({
  openModal,
  closeModal,
  id,
  onAdded
}) => {
  const [form] = Form.useForm(); // Form instance to handle form state

  const [Trabajadores, setTrabajadores] = useState([]); // State to store the list of available workers

  // Fetch the list of workers that are not already assigned to the store
  useEffect(() => {
    getTrabajadoresDiferentes(id, setTrabajadores); // Calls the API to get available workers
  }, [id]); // Fetch workers whenever the store id changes

  return (
    <Modal
      forceRender
      getContainer={false}
      title={`Añadir nuevo personal`} // Modal title
      open={openModal} // Controls modal visibility
      onCancel={closeModal} // Close the modal when the user clicks on cancel
      style={{ textTransform: "uppercase" }} // Style for the modal header
      onOk={form.submit} // Submit form when the OK button is clicked
      okText="Guardar" // Text for the OK button
      centered={true} // Center the modal
      width={500} // Set the modal width
    >

      <Form
        style={{ maxWidth: 500, margin: "0 auto" }} // Center the form
        size="large"
        form={form} // Bind form state to this instance
        layout="vertical" // Form layout
        labelAlign="center" // Align labels to the center
        id="formulariaddpersonal"
        onFinish={async (values) => {
          // When the form is submitted
          await updateTrabajadorTienda(id, values); // Update the store with the selected worker
          reload(); // Reload the store data
          closeModal(); // Close the modal
        }}
      >

        {/* Personal Selection */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="personal"
          label="Personal" // Label for the field
          rules={[{
            required: true, // Field is required
            message: "Personal Requerido", // Error message if validation fails
          }]}
        >
          <Select
            showSearch
            placeholder="Seleccionar Un personal" // Placeholder text
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) // Filter workers based on search input
            }
            options={Trabajadores.map((trabajador) => ({
              value: trabajador.trabajador_id, // Set value as worker id
              label: trabajador.nombre + " " + trabajador.ap_paterno + " " + trabajador.ap_materno, // Display full name
              key: trabajador.trabajador_id, // Set key to worker id
            }))}
          />
        </Form.Item>

      </Form>

      {/* Link to create a new worker */}
      <Link to="/administrativo/trabajadores" style={{ textDecoration: "none" }}>
        ¿Trabajador Nuevo? {/* Text linking to the worker creation page */}
      </Link>
    </Modal>
  );
};

export default AddPersonalModal;
