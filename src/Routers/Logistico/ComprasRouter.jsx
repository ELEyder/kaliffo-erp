import { Routes, Route } from 'react-router-dom';
import ComprasView from "../../Views/Compras/ComprasView";


const ComprasRouter = () => (
    <Routes>
        <Route path="/" element={<ComprasView />} />
    </Routes>
);

export default ComprasRouter;
