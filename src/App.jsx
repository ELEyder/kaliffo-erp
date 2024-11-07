import { Routing } from './routing'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import locale from 'antd/locale/es_ES'; 
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 
import { ConfigProvider } from 'antd';
import LoadingScreen from './Components/Loading/LoadingScreen';
import "@/assets/css/root.css"
dayjs.locale('es')

function App() {
  const [loading, setLoading] = useState(true);

  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();

  useEffect(() => {
    // Establecer un temporizador para ocultar la pantalla de carga después de 3 segundos (3000 ms)
    const timer = setTimeout(() => {
      setLoading(false); // Oculta la pantalla de carga
    }, 500);

    // Limpiar el temporizador cuando el componente se desmonte
    return () => {
      clearTimeout(timer);
    };
  }, []); 
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: primaryColor,
            triggerBg: primaryColor,
          },
          Menu: {
            itemBg: primaryColor,
            itemHoverBg: "skyblue",
            itemColor: "black",
            itemColor: "red",
            itemSelectedBg: "blue",
            itemSelectedColor: "green",
            itemActiveBg: "pink",
            itemHoverColor: "gray",
            subMenuItemBg: "yellow",
            subMenuItemBorderRadius: 0,
          },
        },
        token: {
          // colorPrimary: primaryColor,
        },
      }}
      locale={locale}>
      <Router>
        <Routing />
      </Router>
    </ConfigProvider>
    </>
  )
}

export default App
