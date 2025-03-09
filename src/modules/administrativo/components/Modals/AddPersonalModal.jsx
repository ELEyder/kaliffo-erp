import { Form, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import useTrabajadores from "../../hooks/useTrabajadores";
import { useTrabajador } from "../../hooks";
import { DefaultForm, DefaultModal } from "../../../../components/UI";

const AddPersonalModal = ({ openModal, closeModal, tienda_id, onAdded }) => {
  const [form] = Form.useForm();

  const { trabajadores } = useTrabajadores({rol : 1, antiTienda_id : tienda_id});
  const { updateTrabajador } = useTrabajador(onAdded)
  const rows = [
    {
      type : "select",
      name : "personal",
      label : "Personal",
      options: trabajadores.map((trabajador) => ({
        value: trabajador.trabajador_id,
        label: trabajador.nombres,
      })),
    }
  ]
  return (
    <>
    <DefaultModal>
      <DefaultForm 
        rows={rows}
      />
    </DefaultModal>
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
          await updateTrabajador(values.personal, {tienda_id : tienda_id}); // Update the store with the selected worker
          closeModal(); // Close the modal
        }}
      >
        {/* Personal Selection */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="personal"
          label="Personal" // Label for the field
          rules={[
            {
              required: true, // Field is required
              message: "Personal Requerido", // Error message if validation fails
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Seleccionar Un personal" // Placeholder text
            filterOption={
              (input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase()) // Filter workers based on search input
            }
            options={trabajadores.map((trabajador) => ({
              value: trabajador.trabajador_id, // Set value as worker id
              label:
                trabajador.nombre +
                " " +
                trabajador.ap_paterno +
                " " +
                trabajador.ap_materno, // Display full name
              key: trabajador.trabajador_id, // Set key to worker id
            }))}
          />
        </Form.Item>
      </Form>

      {/* Link to create a new worker */}
      <Link
        to="/administrativo/trabajadores"
        style={{ textDecoration: "none" }}
      >
        ¿Trabajador Nuevo? {/* Text linking to the worker creation page */}
      </Link>
    </Modal>
    </>
  );
};

export default AddPersonalModal;
