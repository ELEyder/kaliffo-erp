import { Routes, Route } from 'react-router-dom';
import TelasView from '../Views/Telas/TelasView';
import TelaView from '../Views/Telas/TelaView';

const TelasRouters = () => (
    <Routes>
        <Route path="/" element={<TelasView />} />
        <Route path="/:tipo" element={<TelaView />} />
    </Routes>
);

export default TelasRouters;
