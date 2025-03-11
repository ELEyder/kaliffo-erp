import { useSession } from "../../../../../context/AuthProvider";
import {
  MovimientoAlmacenTiendaCard,
  MovimientoTiendaTiendaCard,
} from "../../../components/Cards";

const MovimientoMercaderiaGenerar = () => {
  const { user } = useSession();

  return (
    <>
      {user.rol === "administrador" ? (
        <MovimientoAlmacenTiendaCard />
      ) : (
        <MovimientoTiendaTiendaCard />
      )}
    </>
  );
};

export default MovimientoMercaderiaGenerar;
