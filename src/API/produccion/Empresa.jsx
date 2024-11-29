export const getEmpresas = async (setData) => {
    const response = await fetch(`http://localhost:3000/telas/empresas`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json()
    setData(data)
  }