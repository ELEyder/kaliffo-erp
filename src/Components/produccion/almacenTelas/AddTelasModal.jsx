import { useState } from "react"; // Importa React y hooks
import { UploadOutlined } from "@ant-design/icons"; // Importa el ícono de cerrar
import { getCodigosBarras, addTelas } from "@AP/Tela"; // Importa funciones para obtener tipos de tela y agregar telas
import {
  Modal,
  Button,
  Form,
  Select,
  Upload,
  Steps,
  Col,
  message,
  Row,
  Divider,
} from "antd"; // Componentes de Ant Design

const { Option } = Select; // Desestructura Option de Select

const AddTelasModal = ({
  openModal, // Prop para controlar la visibilidad del modal
  closeModal, // Prop para cerrar el modal
  reload, // Prop para recargar los datos después de agregar una tela
}) => {
  const [form] = Form.useForm(); // Crea una instancia del formulario
  const [Carga, setCarga] = useState(false);
  const [Archivos, setArchivos] = useState([]);
  const [Actual, setActual] = useState(0);
  const [Lote_id, setLote_id] = useState(0);

  const props = {
    onRemove: (archivo) => {
      const index = Archivos.indexOf(archivo);
      const nuevosArchivos = Archivos.slice();
      nuevosArchivos.splice(index - 1);
      setArchivos(nuevosArchivos);
    },
    beforeUpload: (archivo) => {
      setArchivos([...Archivos, archivo]);
      return false;
    },
    Archivos,
  };

  const pasos = [
    {
      title: "Subir Excel",
      content: (
        <Row gutter={[16,16]} justify="center" align="middle">
          <Col span={24} style={{textAlign:"center"}}>
            <Upload {...props} accept=".xlsx" maxCount={1}>
              <Button icon={<UploadOutlined></UploadOutlined>} >
                Subir Excel
              </Button>
            </Upload>
          </Col>
          <Col span={24} style={{textAlign:"center"}}>
            <Button
              type="primary"
              onClick={() => {
                addTelas(Archivos)
                  .then((res) => {
                    message.success("Envio Exitoso");
                    setLote_id(res.data);
                    setArchivos([]);
                    setActual(1);
                  })
                  .catch(() => {
                    message.error("Error al enviar el archivo");
                  });
              }}
              disabled={Archivos.length === 0}
            >
              SUBIR EXCEL
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      title: "Imprimir Codigos de Barras",
      content: (
        <>
          <Row justify="center" align="middle">
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  getCodigosBarras(Lote_id).then((res) => {
                    setCarga(true);
                  });
                }}
              >
                IMPRIMIR CODIGOS DE BARRAS
              </Button>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  const items = pasos.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Modal
      forceRender // Fuerza el renderizado del modal
      getContainer={false} // El modal no se monta en el body
      styles={{ header: { textAlign: "center" } }} // Estilo para centrar el texto del encabezado
      title="AÑADIR TELAS" // Título del modal
      open={openModal} // Determina si el modal está visible o no
      onCancel={closeModal} // Cierra el modal cuando se hace clic en el botón de cancelar
      footer={
        Carga ? (
          <Button
            type="primary"
            onClick={() => {
              closeModal(false);
              reload();
              setArchivos([]);
              setActual(0);
              setLote_id(0);
            }}
          >
            Finalizar
          </Button>
        ) : null
      }
    >
      <Steps
        current={Actual} // Paso actual
        size="small" // Tamaño de los pasos
        items={items} // Pasos a mostrar
      />
      <Divider></Divider>
      <>{pasos[Actual].content}</>
    </Modal>
  );
};

export default AddTelasModal; // Exporta el componente para su uso en otras partes de la aplicación
