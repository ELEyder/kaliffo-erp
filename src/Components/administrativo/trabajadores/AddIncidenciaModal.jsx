import React from "react"; // Importar React
import { addIncidencia } from "@AA/Incidencia"; // Función para agregar una incidencia
import { Form, Input, Modal, Select } from "antd"; // Componentes de Ant Design


const AddIncidenciaModal = ({
    openModal, // Estado para controlar la visibilidad del modal
    closeModal, // Función para cerrar el modal
    reload, // Estado para activar la recarga del componente padre
    id, // ID del usuario pasado como prop
}) => {
    const [form] = Form.useForm(); // Hook para gestionar el estado del formulario

    return (
        <Modal
            forceRender
            getContainer={false} // Renderizar el modal en el cuerpo en lugar del contenedor por defecto
            title={"AÑADIR NUEVA INCIDENCIA"} // Título del modal
            styles={{ header: { textAlign: "center" } }} // Centrar el título del modal
            open={openModal} // Controlar la visibilidad del modal a través de openModal
            onCancel={() => closeModal(false)} // Cerrar el modal al hacer clic en cancelar
            okText="Añadir" // Texto para el botón de confirmación
            onOk={form.submit} // Activar la sumisión del formulario al hacer clic en el botón "Añadir"
            centered={true} // Centrar el modal en la pantalla
            width={500} // Establecer un ancho fijo para el modal
        >
            {/* Formulario para agregar una nueva incidencia */}
            <Form
                style={{ maxWidth: 500, margin: "0 auto" }} // Centrar el formulario dentro del modal
                size="large" // Establecer el tamaño del formulario como grande
                layout="vertical" // Usar un diseño vertical para los campos del formulario
                form={form} // Vincular la instancia del formulario con este formulario
                labelAlign="center" // Alinear las etiquetas al centro
                id="formularioinicidencias" // Establecer un ID único para el formulario
                initialValues={{ trabajador_id: id }} // Establecer el valor inicial para trabajador_id (ID del usuario)
                onFinish={async (values) => {
                    // Manejar la sumisión del formulario
                    const formData = { ...values, trabajador_id: id }; // Agregar el ID del usuario a los datos del formulario
                    await addIncidencia(formData); // Llamar a la función API para agregar la incidencia
                    reload() // Activar la recarga
                    closeModal(false); // Cerrar el modal
                    form.resetFields(); // Restablecer los campos del formulario después de la sumisión
                }}
            >
                {/* Campo para seleccionar el tipo de incidencia */}
                <Form.Item
                    name="tipo" // Nombre del campo
                    label="Tipo" // Etiqueta para el campo
                    rules={[{ required: true, message: "Tipo requerido" }]} // Regla de validación: campo requerido
                >
                    <Select
                        options={[ // Opciones del desplegable para seleccionar el tipo de incidencia
                            { value: "1", label: "Familiar" }, // Incidencia familiar
                            { value: "2", label: "Salud" }, // Incidencia de salud
                            { value: "3", label: "Personal" }, // Incidencia personal
                        ]}
                    />
                </Form.Item>

                {/* Campo para ingresar la descripción de la incidencia */}
                <Form.Item
                    name="descripcion" // Nombre del campo
                    label="Descripcion" // Etiqueta para el campo
                    rules={[{ required: true, message: "Descripcion Requerida" }]} // Regla de validación: campo requerido
                >
                    <Input/>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default AddIncidenciaModal; // Exportar el componente AddIncidenciaModal para su uso en otras partes de la aplicación
