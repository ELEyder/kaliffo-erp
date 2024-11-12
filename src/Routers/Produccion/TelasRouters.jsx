import { Routes, Route } from 'react-router-dom';
import TelasView from '@V/Produccion/Telas/TelasView';
import TelaView from '@V/Produccion/Telas/TelaView';

const TelasRouters = () => (
    <Routes>
        <Route path="/" element={<TelasView />} />
        <Route path="/:tipo" element={<TelaView />} />
    </Routes>
);

export default TelasRouters;
