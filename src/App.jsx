import { Routing } from './Routers'
import { HashRouter as Router } from "react-router-dom";
import locale from 'antd/locale/es_ES';
import { ConfigProvider } from 'antd';

function App() {
  const root = document.documentElement;
  const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
  const bg2 = getComputedStyle(root).getPropertyValue('--bg-2').trim();
  const color1 = getComputedStyle(root).getPropertyValue('--color-1').trim();
  const color2 = getComputedStyle(root).getPropertyValue('--color-2').trim();
  const danger = getComputedStyle(root).getPropertyValue('--color-danger').trim();

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              siderBg: bg,
              triggerBg: bg,
              bodyBg: bg2
            },
            Button: {
              colorPrimary: color1,
              colorError: danger,
              colorBgContainer: color2,
              textHoverBg: bg,
              colorText: 'white',
              borderColor: color2,
              defaultHoverBorderColor: color2,
              defaultBorderColor: color2,
              defaultHoverColor: 'white',
              colorSplit: color2,
              borderColorDisabled: "transparent",
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
            Pagination: {
              itemBg: bg,
              itemActiveBg: bg,
              colorText: 'white',
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
              colorTextPlaceholder: 'white',
              colorBgContainerDisabled: 'red'
            },
            InputNumber: {
              colorBgContainer: bg2,
              colorBorder: 'black',
              colorText: 'white',
              colorTextPlaceholder: 'white',
              colorBgContainerDisabled: 'red'
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
              actionsLiMargin: 0
            },
            Divider: {
              colorSplit: "gray",
              colorTextHeading: "white",
            },
            Popconfirm: {
              colorText: 'white',
              colorTextHeading: 'white'
            },
            Dropdown: {
              colorBgElevated: color2,
            },
            FloatButton: {
              colorBgElevated: color1,
              colorText: 'black',
            },
            Typography: {
              colorText: 'white',
              colorTextDescription: 'white',
            },
            Steps: {
              colorText: 'white',
              colorTextDescription: 'white',
            },
            Upload: {
              colorText: 'white',
              colorTextDescription: 'white',
            },
          },
          token: {
            colorPrimary: color1,
            colorError: danger
          },
        }}
        locale={locale}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routing />
        </Router>
      </ConfigProvider>
    </>
  )
}

export default App
