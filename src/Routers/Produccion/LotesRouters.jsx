import { Routes, Route } from 'react-router-dom';
import LotesView from '@V/Produccion/Lotes/LotesView';
import LoteView from '@V/Produccion/Lotes/LoteView';


const LotesRouters = () => (
    <Routes>
        <Route path="/" element={<LotesView />} />
        <Route path="/:id" element={<LoteView />} />
    </Routes>
);

export default LotesRouters;
