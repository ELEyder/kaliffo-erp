import { Routes, Route } from 'react-router-dom';
import Telas from '../Components/Telas/Telas';
import Tela from '../Components/Tela/Tela';

const TelasRouters = () => (
    <Routes>
        <Route path="/" element={<Telas />} />
        <Route path="/:tipo" element={<Tela />} />
    </Routes>
);

export default TelasRouters;
