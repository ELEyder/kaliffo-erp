import { Routes, Route } from 'react-router-dom';
import TelasView from '@V/Telas/TelasView';
import TelaView from '@V/Telas/TelaView';

const TelasRouters = () => (
    <Routes>
        <Route path="/" element={<TelasView />} />
        <Route path="/:tipo" element={<TelaView />} />
    </Routes>
);

export default TelasRouters;
