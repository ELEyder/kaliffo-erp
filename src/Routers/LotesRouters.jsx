import { Routes, Route } from 'react-router-dom';
import Lotes from '../Components/Lotes/Lotes';
import Lote from '../Components/Lote/Lote';


const LotesRouters = () => (
    <Routes>
        <Route path="/" element={<Lotes />} />
        <Route path="/:id" element={<Lote />} />
    </Routes>
);

export default LotesRouters;
