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
  const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
  const bg2 = getComputedStyle(root).getPropertyValue('--bg-2').trim();
  const color1 = getComputedStyle(root).getPropertyValue('--color-1').trim();
  const color2 = getComputedStyle(root).getPropertyValue('--color-2').trim();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

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
            siderBg: bg,
            triggerBg: bg,
            bodyBg :bg2
          },
          List: {
            colorText: "white",
          },
          Table: {
            colorBgContainer: bg,
            colorText: "white",
            borderColor: "black",
            headerBorderRadius: "black",
            headerSortActiveBg: bg2,
            headerSortHoverBg: bg2,
            headerBg: bg2,
            headerColor: "white",
            headerSplitColor: bg2,
          },
          Menu: {
            itemBg: bg,
            groupTitleColor: color1,
            itemHoverBg: bg2,
            itemHoverColor: color1,
            itemColor: "white",
            itemSelectedBg: bg2,
            itemSelectedColor: color1,
            itemActiveBg: bg2,
            subMenuItemBg: bg,
            subMenuItemBorderRadius: 0,
          },
          Card: {
            borderColor: "black",
            headerBg: bg,
            colorBgContainer: bg,
            colorBorderSecondary: bg2,
            lineWidth: 2,
            colorText: "white",
            extraColor: "white",
            colorTextDescription: "white",
            borderRadiusLG: 15,
            colorTextHeading: "white",
          },
          Divider: {
            colorSplit: "gray",
            colorTextHeading: "white",
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
