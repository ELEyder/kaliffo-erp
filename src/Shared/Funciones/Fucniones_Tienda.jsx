export const getTienda = async (id, seteador) => {
  const response = await fetch(`http://localhost:3000/tienda/${id}`);
  const TiendaData = await response.json();
  seteador(TiendaData);
};

export const getProductosTienda = async (id, seteador) => {
  try {
    const response = await fetch(
      `http://localhost:3000/producto?tienda_id=${id}`
    );
    const data = await response.json();
    seteador(data);
  } catch (error) {
    console.log(error);
  }
};

export const FetchTrabajadoresDiferentes = async (id, Seteador) => {
  try {
    const response = await fetch(
      `http://localhost:3000/usuario?rol=1&antiTienda_id=${id}`
    );
    const data = await response.json();
    Seteador(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const AddUsuarioTienda = async (idTienda, values) => {
  try {
    const response = await fetch(
        `http://localhost:3000/usuario/update/${values.personal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tienda_id: idTienda,
          }),
        }
      );
  } catch (error) {
    console.log(error);
  }
};

export const getusuariosTienda = async (id, seteador) => {
  try {
    const response = await fetch(
      `http://localhost:3000/usuario?tienda_id=${id}`
    );
    const data = await response.json();
    seteador(data);
  } catch (error) {
    console.log(error);
  }
};
