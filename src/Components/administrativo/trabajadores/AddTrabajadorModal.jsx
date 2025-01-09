import React, { useEffect, useState } from "react"; // React y hooks
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd"; // Componentes de Ant Design
import { onlyDecimalKey, onlyNumberKey, onlyLettersKey, onlyDecimalInput, onlyNumberInput, onlyLettersInput, preventPaste } from "../../../Shared/Tools"; // Funciones de utilidad para validación
import { addTrabajador } from "@AA/Usuario"; // Función para agregar un trabajador
import { getTiendas } from "@AA/Tienda"; // Función para obtener las tiendas

const AddTrabajadorModal = ({
  openModal, // Estado de visibilidad del modal
  closeModal, // Función para cerrar el modal
  tipoTrabajador, // Tipo de trabajador (e.g., "ventas")
  reload, // Función para activar la recarga de los datos
  setReload, // Función para alternar el estado de recarga
}) => {
  const [form] = Form.useForm(); // Hook para gestionar el formulario
  const [tiendas, setTiendas] = useState([]); // Estado para almacenar los datos de las tiendas

  // Obtener los datos de las tiendas si el tipo de trabajador es "ventas"
  useEffect(() => {
    if (tipoTrabajador === "ventas") {
      getTiendas(setTiendas); // Obtener las tiendas si el trabajador está en ventas
    }
  }, [tipoTrabajador]);

  return (
    <Modal
      forceRender // Fuerza la renderización del modal incluso si no está visible
      getContainer={false} // Renderiza el modal en el cuerpo en lugar del contenedor por defecto
      styles={{
        header: { textTransform: "uppercase", textAlign: "center" }, // Título centrado y en mayúsculas
        body: { height: "430px" }, // Establecer altura fija para el cuerpo del modal
      }}
      title={`Añadir Nuevo Trabajador a ${tipoTrabajador}`} // Título del modal
      open={openModal} // Vincula la visibilidad del modal a openModal
      onCancel={closeModal} // Cierra el modal cuando se hace clic en cancelar
      okText="Añadir" // Texto del botón de confirmación
      onOk={form.submit} // Sube el formulario cuando se hace clic en "Añadir"
      centered={true} // Centra el modal en la pantalla
    >
      <Form
        autoComplete={"false"} // Deshabilitar el autocompletado
        style={{ maxWidth: 500, margin: "0 auto" }} // Centra el formulario en el modal
        size="large" // Usa entradas grandes en el formulario
        form={form} // Vincula el formulario a la instancia del formulario
        layout="vertical" // Usa un diseño vertical para el formulario
        labelAlign="center" // Centra las etiquetas del formulario
        id="formulariocrear" // ID del formulario
        onFinish={async (values) => {
          // Controlador de sumisión del formulario
          await addTrabajador(tipoTrabajador, values); // Llama a la función API para agregar el trabajador
          setReload(!reload); // Alterna el estado de recarga para actualizar los datos
          closeModal(false); // Cierra el modal después de la sumisión
          form.resetFields(); // Restablece los campos del formulario después de la sumisión
        }}
      >
        {/* Campo de entrada para el nombre del trabajador */}
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombres"
          rules={[{ required: true, message: "Nombres requeridos" }]} // Regla de validación
        >
          <Input
            onPaste={preventPaste} // Prevenir el pegado de texto
            onKeyDown={onlyLettersKey} // Permitir solo letras
            onInput={onlyLettersInput} // Permitir solo letras en la entrada
          />
        </Form.Item>

        {/* Fila para los apellidos */}
        <Row
          justify="space-around"
          align="middle"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_paterno"
              label="Apellido Paterno"
              rules={[{ required: true, message: "Apellido Paterno Requerido" }]}
            >
              <Input
                onPaste={preventPaste}
                onKeyDown={onlyLettersKey}
                onInput={onlyLettersInput}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_materno"
              label="Apellido Materno"
              rules={[{ required: true, message: "Apellido Materno Requerido" }]}
            >
              <Input
                onPaste={preventPaste}
                onKeyDown={onlyLettersKey}
                onInput={onlyLettersInput}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Fila para la fecha de nacimiento y número de teléfono */}
        <Row
          justify="space-around"
          align="middle"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col span={12} className="gutter-row">
            <Form.Item
              label="Fecha Nacimiento"
              name="fecha_nacimiento"
              rules={[{ required: true, message: "Fecha Nacimiento requerido" }]}
            >
              <DatePicker
                placement="bottomRight"
                popupStyle={{ height: '257px' }}
                placeholder="DD-MM-YYYY"
                format={"DD-MM-YYYY"} // Formato de la fecha
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="telefono"
              label="Telefono"
              rules={[{ required: true, message: "Telefono Requerido" }]}
            >
              <Input
                showCount
                maxLength={9} // Longitud máxima del teléfono
                onPaste={preventPaste}
                onKeyDown={onlyNumberKey} // Permitir solo números
                onInput={onlyNumberInput} // Permitir solo números en la entrada
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Fila para el DNI y sueldo */}
        <Row
          justify="space-around"
          align="middle"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col span={12} className="gutter-row">
            <Form.Item
              name="dni"
              label="DNI"
              rules={[{ required: true, message: "DNI requerido" }]}
            >
              <Input
                showCount
                maxLength={8} // Longitud máxima del DNI
                onPaste={preventPaste}
                onKeyDown={onlyNumberKey} // Permitir solo números
                onInput={onlyNumberInput} // Permitir solo números en la entrada
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="sueldo"
              label="Sueldo"
              rules={[{ required: true, message: "Sueldo requerido" }]}
            >
              <Input
                prefix="S/." // Prefijo para el símbolo de moneda
                onPaste={preventPaste}
                onKeyDown={onlyDecimalKey} // Permitir solo números decimales
                onInput={onlyDecimalInput} // Permitir solo decimales en la entrada
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Fila para seleccionar la tienda, visible solo para trabajadores de ventas */}
        <Row>
          <Col>
            {tipoTrabajador === "ventas" && (
              <Form.Item
                name="tienda_id"
                label="Tienda Asignada"
                rules={[{ required: true, message: "Tienda Asignada" }]}
              >
                <Select
                  options={tiendas.map((tienda) => ({
                    value: tienda.tienda_id,
                    label: tienda.tienda,
                    key: tienda.tienda_id,
                  }))} // Mapea las tiendas para mostrarlas en el select
                />
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddTrabajadorModal; // Exportar el componente para usarlo en otras partes de la aplicación
