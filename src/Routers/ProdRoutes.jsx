import React from "react";
import { Routes, Route } from "react-router-dom";

import LotesView from "@V/Produccion/Lotes/LotesView";
import LoteView from "@V/Produccion/Lotes/LoteView";
import TelasView from "@V/Produccion/Telas/TelasView";
import TelaView from "@V/Produccion/Telas/TelaView";

const ProdRoutes = () => (
    <Routes>
        {/* Rutas de Telas */}
        <Route path="/telas" element={<TelasView />} />
        <Route path="/telas/:tipo" element={<TelaView />} />
        
        {/* Rutas de Lotes */}
        <Route path="/lotes" element={<LotesView />} />
        <Route path="/lotes/:id" element={<LoteView />} />
    </Routes>
);

export default ProdRoutes;
