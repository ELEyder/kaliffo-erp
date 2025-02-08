import {
  Form,
  Modal,
  Select,
  Divider,
  Row,
  Button,
  Typography,
  Col,
} from "antd"; // Importa componentes de Ant Design
import React, { Children, useEffect, useState } from "react"; // Importa React y hooks
import { addLote } from "@AP/Lote"; // Función para agregar un lote desde la API
import { getTelaID } from "@AP/Tela";
import { getProductos } from "@AA/Producto";

const AddLoteModal = ({ openModal, closeModal, reload }) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [productos, setProductos] = useState([]);
  const [telasCodigo, setTelasCodigo] = useState({});
  const [codigoBarras, setCodigoBarras] = useState("");


  useEffect(()=>{
    getProductos(setProductos)
  },[])

  // Manejo de escaneo de código de barras
  useEffect(() => {
    const escaner = (event) => {
      if (event.key === "Enter") {
        if (codigoBarras.trim() !== "") {
          getTelaID(codigoBarras).then((tela) => {
            if(tela){
              if (!Object.values(telasCodigo).flat().some(({ tela_id }) => tela.tela_id === tela_id )){
                setTelasCodigo((prev) => ({
                  ...prev,
                  [tela.tipo]: [...(prev[tela.tipo] || []), tela], // Agregar la tela al array
                }));
              }
            }
          });
          setCodigoBarras(""); // Limpiar el código después de procesarlo
        }
      } else {
        setCodigoBarras((prev) => prev + event.key); // Agregar la tecla al código actual
      }
    };

    document.addEventListener("keypress", escaner);

    return () => {
      document.removeEventListener("keypress", escaner);
    };
  }, [codigoBarras]); // Agregar dependencia para que actualice correctamente el estado

  const ids = Object.values(telasCodigo).flat().map(({tela_id})=>tela_id).join(",")

  const total = Object.values(telasCodigo).flat().reduce((acc, { metraje }) => acc + Number(metraje), 0).toFixed(2);

  const eliminarTela=(tela_id,codigo)=>{
    setTelasCodigo((prev)=>{
      return {
        ...prev,
        [codigo]:prev[codigo].filter((tela)=>tela.tela_id!==tela_id)
      }
    })
  }


  return (
    <Modal
      title="Nuevo Lote"
      open={openModal}
      onCancel={() => closeModal(false)}
      okText="CREAR"
      onOk={form.submit}
      centered
      width={400}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={async (values) => {
          await addLote(values,ids,total);
          setCodigoBarras("");
          setTelasCodigo({});
          form.resetFields();
          reload();
          closeModal(false);
        }}
      >
        <Form.Item
          name="productos"
          label="Productos"
          rules={[
            { required: true, message: "Seleccione al menos un producto" },
          ]}
        >
          <Select mode="multiple" placeholder="Seleccione productos">
            {productos.map((producto, index) => (
              <Select.Option key={index} value={producto.producto_id}>
                {producto.nombre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Divider />
        <Row gutter={16} justify="center" align="middle">
          <Col span={24} style={{ textAlign: "center" }}>
            <Title style={{color: "white"}} level={3}>Telas</Title>
            <span style={{color: "white"}}>METRAJE USADO: {total}</span>
          </Col>
          <Col span={24}>
            {Object.entries(telasCodigo).map(([codigo, detalles]) => (
              <Row
                key={codigo} // Clave única para el tipo de tela
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1e1e2f",
                  borderRadius: "8px",
                }}
              >
                {/* Nombre del tipo de tela */}
                <Col
                  span={6}
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    {codigo}:
                  </span>
                </Col>

                <Col span={18}>
                  <Row gutter={[0, 8]} justify="end">
                    {/* Lista de telas dentro del tipo */}
                    {detalles.map((tela, index) => (
                      <>
                        <Col
                          key={index}
                          span={24}
                          style={{
                            textAlign: "right",
                            color: "#fff",
                            paddingLeft: "15px",
                          }}
                        >
                          <span>
                            <strong>CODIGO TELA: {tela.codigo_tela}</strong>{" "}
                            METRAJE: {tela.metraje} M
                          </span>
                        </Col>
                        <Col>
                          <Button onClick={()=>eliminarTela(tela.tela_id,codigo)}>X</Button>
                        </Col>
                      </>
                    ))}
                  </Row>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddLoteModal;
