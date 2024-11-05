import { Routing } from './routing'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import locale from 'antd/locale/es_ES'; 
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 
import { ConfigProvider } from 'antd';
import LoadingScreen from './Components/Loading/LoadingScreen';
dayjs.locale('es')

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Escucha el evento `load` del navegador, que se dispara cuando toda la página ha terminado de cargar
    window.onload = () => {
      setLoading(false); // Oculta la pantalla de carga cuando la página se ha cargado completamente
    };
    return () => {
      window.onload = null;
    };
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
    <link rel="stylesheet" href="/css/root.css" />
    <ConfigProvider locale={locale}>
      <Router>
        <Routing />
      </Router>
    </ConfigProvider>
    </>
  )
}

export default App
