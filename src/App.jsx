import { Routing } from './routing'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import locale from 'antd/locale/es_ES'; 
import { ConfigProvider } from 'antd';
import LoadingScreen from './Components/Loading/LoadingScreen';
import "@/assets/css/root.css"

function App() {
  const [loading, setLoading] = useState(true);

  const root = document.documentElement;
  const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
  const bg2 = getComputedStyle(root).getPropertyValue('--bg-2').trim();
  const color1 = getComputedStyle(root).getPropertyValue('--color-1').trim();
  const color2 = getComputedStyle(root).getPropertyValue('--color-2').trim();
  const danger = getComputedStyle(root).getPropertyValue('--color-danger').trim();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []); 
  // if (loading) {
  //   return <LoadingScreen />;
  // }

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
          Button: {
            colorPrimary: color1,
            colorError: danger,
            colorBgContainer: color2,
            textHoverBg: 'white',
            colorText: 'white',
            borderColor: color2,
            defaultHoverBorderColor: color2,
            defaultBorderColor: color2,
            defaultHoverColor: 'white',
            colorSplit: color2
          },
          List: {
            colorText: "white",
          },
          Tabs: {
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
          Modal: {
            contentBg: bg,
            titleColor: 'white',
            headerBg: bg,
          },
          Form: {
            labelColor: 'white',
          },
          Input: {
            colorBgContainer: bg2,
            colorBorder: 'black',
            colorText: 'white',
            colorTextPlaceholder: 'white'

          },
          DatePicker: {
            colorBgContainer: bg2,
            colorBorder: 'black',
            colorText: 'white',
            colorTextPlaceholder: 'white'

          },
          Select: {
            colorBgContainer: bg2,
            colorBorder: 'black',
            optionSelectedBg: bg2,
            colorBgElevated: bg,
            colorText: 'white'
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
          colorPrimary: color1,
          colorError: danger
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
