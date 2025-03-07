import { Modal } from "antd";

const DefaultModal = ({ title, children, isOpen, onClose, onOk }) => {
  return (
    <Modal
      forceRender // Asegura que el modal se renderice incluso si está cerrado inicialmente
      getContainer={false} // Renderiza el modal en el DOM actual
      title={title} // Título del modal
      open={isOpen} // Estado de apertura del modal
      onCancel={onClose} // Cierra el modal al cancelar
      okText="Aceptar" // Texto del botón "OK"
      onOk={onOk} // Envía el formulario al hacer clic en "OK"
      styles={{
        header: { textTransform: "uppercase", textAlign: "center" }, // Título centrado y en mayúsculas
      }}
      centered={true} // Centra el modal en la pantalla
    >
      {children}
    </Modal>
  );
};

export default DefaultModal;
