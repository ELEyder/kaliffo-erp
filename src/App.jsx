import { Routing } from './routing'
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import locale from 'antd/locale/es_ES'; 
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 
import { ConfigProvider } from 'antd';
import Plantilla from "./Shared/Plantilla";
dayjs.locale('es')

function App() {
  return (
    <ConfigProvider locale={locale}>
      <Router>
        <Routing />
      </Router>
    </ConfigProvider>
  )
}

export default App
