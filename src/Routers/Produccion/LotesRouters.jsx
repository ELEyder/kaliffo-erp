import { Routes, Route } from 'react-router-dom';
import LotesView from '@V/Lotes/LotesView';
import LoteView from '@V/Lotes/LoteView';


const LotesRouters = () => (
    <Routes>
        <Route path="/" element={<LotesView />} />
        <Route path="/:id" element={<LoteView />} />
    </Routes>
);

export default LotesRouters;
